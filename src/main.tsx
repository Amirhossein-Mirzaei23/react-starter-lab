import React from 'react';
import { Provider } from './components/ui/provider';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './queryClient';
import { LocaleProvider } from '@chakra-ui/react';
import { Toaster, toaster } from './components/ui/toaster';
import { useUserStore } from './stores/userStore/userStore';
import { askForPermission } from './utils/askForPermision';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered with scope:', registration.scope);


requestNotificationPermission();
    } catch (err) {
      console.error('Service Worker registration failed:', err);
    }
  });
}

async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.warn('Notifications not supported');
    return;
  }


  const userId = useUserStore()?.userInfo?.id
  if (userId) {
    askForPermission(userId)
  }else {
    const permission = await Notification.requestPermission();
  }
}




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div dir="rtl">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider>
            <LocaleProvider locale="ar-Ar">
              <App />
              <Toaster />
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </LocaleProvider>
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
);
