import { toaster } from '../components/ui/toaster';

// src/api/http.ts
const DEFAULT_TIMEOUT = 10000;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface HttpRequestConfig extends RequestInit {
  timeout?: number;
}

function showSnackbar(payload: {
  title?: string;
  description: string;
  type: string;
  closable?: boolean;
}) {
  toaster.create(payload);
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

  const headers = {
    'Content-Type': 'application/json',
    ...(config?.headers || {}),
  };

  const res = await fetch(url, {
    method,
    headers,
    signal: controller.signal,
    body: body ? JSON.stringify(body) : undefined,
  });

  clearTimeout(id);

  let data;
  try {
    data = await res.json();
  } catch {
    data = null; // or text(), depending on API
  }

  if (!res.ok) {
    const error = new Error(data?.message || res.statusText || 'Network error');
    // optionally attach status & body
    (error as any).status = res.status;
    (error as any).body = data;
    console.log(data.message);
    console.log(res.status);
    const toadPayload = {
      description: data.message,
      type: 'error',
      closable: true,
    };
    showSnackbar(toadPayload);

    throw error;
  }

  return data as T;
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
