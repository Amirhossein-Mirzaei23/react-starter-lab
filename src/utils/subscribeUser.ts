import { saveSubscription } from '../api/notification/notification.service';
import { apiUrl } from '../App';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeUser(userId: number) {
  console.log('call sub');

  const sw = await navigator.serviceWorker.ready;
  console.log('sub user env', import.meta.env.VITE_PUBLIC_VAPID_KEY);

  const existing = await sw.pushManager.getSubscription();
  if (existing) {
    await existing.unsubscribe();
    console.log('Old subscription removed');
  }
  const subscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_PUBLIC_VAPID_KEY),
  });
  console.log('subscription', subscription);

  await fetch(`${apiUrl}/push/subscribe`, {
    method: 'POST',
    body: JSON.stringify({ userId, subscription }),
    headers: { 'Content-Type': 'application/json' },
  });
  saveSubscription({ userId, subscription })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}
