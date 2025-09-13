import React from 'react';
import { Provider } from './components/ui/provider';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div dir="rtl">
      <BrowserRouter>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
);
