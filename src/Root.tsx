import React from 'react';
import ReactDOM from 'react-dom/client';
/* import App from './App';
import AppContext from './AppContext'; */
// wip
import { AppStoreProvider } from '@context/storeProvider';
import { AppQueryClientProvider } from '@context/queryProvider';
import { AppRouterProvider } from '@context/routeProvider';
import { MUIProvider } from '@context/muiProvider';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppStoreProvider>
      <AppQueryClientProvider>
        <MUIProvider>
          <AppRouterProvider />
        </MUIProvider>
      </AppQueryClientProvider>
    </AppStoreProvider>
    {/* <AppContext>
      <App />
    </AppContext> */}
  </React.StrictMode>
);
