export interface saveSubscriptionPayload {
  userId: number;
  subscription: PushSubscription;
}

export interface sendNotificationPayload {
  userId: number;
  title: string;
  message: string;
}
