import { API_URL } from '@/App';
import { apiClient } from '@/services/http';
import { saveSubscriptionPayload, sendNotificationPayload } from './notification.types';

export async function saveSubscription(payload: saveSubscriptionPayload): Promise<any> {
  return apiClient.post<any>(`${API_URL}/push/subscribe`, payload);
}

export async function sendNotification(payload: sendNotificationPayload): Promise<any> {
  return apiClient.post<any>(`${API_URL}/push/send`, payload);
}
