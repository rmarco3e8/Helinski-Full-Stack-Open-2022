import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { NotificationContextProvider } from './contexts/notificationContext';
import { LoginContextProvider } from './contexts/loginContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
