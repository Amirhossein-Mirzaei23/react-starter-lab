import { toaster } from '../components/ui/toaster';

// src/api/http.ts
const DEFAULT_TIMEOUT = 10000;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface HttpRequestConfig extends RequestInit {
  timeout?: number;
  skipErrorToast?: boolean;
}

export interface ApiError extends Error {
  status?: number;
  body?: any;
  code?: string;
}

function showSnackbar(payload: {
  title?: string;
  description: string;
  type: string;
  closable?: boolean;
}) {
  toaster.create(payload);
}

export function createApiError(message: string, status?: number, body?: any): ApiError {
  const error = new Error(message) as ApiError;
  error.status = status;
  error.body = body;
  error.code = status ? `HTTP_${status}` : 'NETWORK_ERROR';
  return error;
}

async function httpFetch<T = any>(
  url: string,
  method: HttpMethod = 'GET',
  body?: any,
  config?: HttpRequestConfig,
): Promise<T> {
  const controller = new AbortController();
  const timeout = config?.timeout ?? DEFAULT_TIMEOUT;
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const headers = {
      'Content-Type': 'application/json',
      ...(config?.headers || {}),
    };

    const res = await fetch(url, {
      method,
      headers,
      signal: controller.signal,
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    });

    clearTimeout(id);

    let data;
    const contentType = res.headers.get('content-type');

    try {
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = await res.text();
      }
    } catch (parseError) {
      console.warn('Failed to parse response:', parseError);
      data = null;
    }

    if (!res.ok) {
      const message = data?.message || res.statusText || `HTTP ${res.status} Error`;
      const error = createApiError(message, res.status, data);

      // Only show toast if not explicitly skipped
      if (!config?.skipErrorToast) {
        const toastPayload = {
          description: message,
          type: 'error',
          closable: true,
        };
        showSnackbar(toastPayload);
      }

      throw error;
    }

    return data as T;
  } catch (fetchError) {
    clearTimeout(id);

    if (fetchError instanceof Error) {
      if (fetchError.name === 'AbortError') {
        throw createApiError('Request timeout', undefined, { timeout: true });
      }
      if ('status' in fetchError) {
        throw fetchError; // Re-throw API errors
      }
    }

    // Network or other errors
    const networkError = createApiError(
      fetchError instanceof Error ? fetchError.message : 'Network error',
      undefined,
      { originalError: fetchError },
    );

    if (!config?.skipErrorToast) {
      showSnackbar({
        description: 'Network connection error',
        type: 'error',
        closable: true,
      });
    }

    throw networkError;
  }
}

// usage helper
export const apiClient = {
  get: <T>(url: string, config?: HttpRequestConfig) => httpFetch<T>(url, 'GET', undefined, config),
  post: <T>(url: string, body: any, config?: HttpRequestConfig) =>
    httpFetch<T>(url, 'POST', body, config),
  put: <T>(url: string, body: any, config?: HttpRequestConfig) =>
    httpFetch<T>(url, 'PUT', body, config),
  del: <T>(url: string, config?: HttpRequestConfig) =>
    httpFetch<T>(url, 'DELETE', undefined, config),
  patch: <T>(url: string, body: any, config?: HttpRequestConfig) =>
    httpFetch<T>(url, 'PATCH', body, config),
};

// Authenticated API client
export function createAuthenticatedApiClient(getToken: () => string) {
  return {
    get: <T>(url: string, config?: HttpRequestConfig) =>
      httpFetch<T>(url, 'GET', undefined, addAuthHeader(config, getToken())),
    post: <T>(url: string, body: any, config?: HttpRequestConfig) =>
      httpFetch<T>(url, 'POST', body, addAuthHeader(config, getToken())),
    put: <T>(url: string, body: any, config?: HttpRequestConfig) =>
      httpFetch<T>(url, 'PUT', body, addAuthHeader(config, getToken())),
    del: <T>(url: string, config?: HttpRequestConfig) =>
      httpFetch<T>(url, 'DELETE', undefined, addAuthHeader(config, getToken())),
    patch: <T>(url: string, body: any, config?: HttpRequestConfig) =>
      httpFetch<T>(url, 'PATCH', body, addAuthHeader(config, getToken())),
  };
}

function addAuthHeader(config?: HttpRequestConfig, token?: string): HttpRequestConfig {
  if (!token) return config || {};

  return {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${token}`,
    },
  };
}
