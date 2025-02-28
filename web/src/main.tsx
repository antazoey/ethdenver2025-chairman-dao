import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import React from 'react';
import { canisterId, idlFactory } from './declarations/chairman_dao';

import Tasks from './routes/tasks';
import Proposals from './routes/proposals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Tasks />,
      },
      {
        path: 'proposals',
        element: <Proposals />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AgentProvider withProcessEnv>
      <ActorProvider idlFactory={idlFactory} canisterId={canisterId}>
        <RouterProvider router={router} />,
      </ActorProvider>
    </AgentProvider>
  </React.StrictMode>,
);
