import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './styles/index.css'

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
  <RouterProvider router={router} />
);