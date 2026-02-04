import { subscribeUser } from './subscribeUser';

export async function askForPermission(userId: number): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('Notifications not supported');
    return false;
  }

  if (!userId || userId <= 0) {
    console.error('Invalid user ID for notification permission');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    console.log('Notification permission:', permission);

    if (permission === 'granted') {
      await subscribeUser(userId);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}
