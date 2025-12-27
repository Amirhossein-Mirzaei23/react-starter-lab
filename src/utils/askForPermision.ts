import { useUserStore } from "../stores/userStore/userStore";
import { subscribeUser } from "./subscribeUser";

export async function askForPermission(userId:number) {
  const permission = await Notification.requestPermission();
  console.log('permission',permission);
  
  if (permission === 'granted'){
    await navigator.serviceWorker.register('/sw.js');

     subscribeUser(userId)
  }
}
