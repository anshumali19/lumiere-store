import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { DBProvider } from './kit/db';
import { ToastProvider } from './kit/ui';
import { seed } from './data';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <DBProvider storageKey="lumiere" seed={seed}>
          <App />
        </DBProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
