import React from 'react';
import { Provider } from './components/ui/provider';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './queryClient';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div dir="rtl">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
);
