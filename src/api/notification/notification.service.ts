import { apiUrl } from "../../App";
import { apiClient } from "../http";
import { saveSubscriptionPayload, sendNotificationPayload } from "./notification.types";

export async function saveSubscription(payload: saveSubscriptionPayload): Promise<any> {
  return apiClient.post<any>(`${apiUrl}/push/subscribe`, payload);
}

export async function sendNotification(payload: sendNotificationPayload): Promise<any> {
  return apiClient.post<any>(`${apiUrl}/push/send`, payload);
}