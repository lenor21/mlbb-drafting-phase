import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import BattleList from '../pages/BattleList';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <BattleList />,
      },
      {
        path: '/home/:id',
        element: <Home />,
      },
    ],
  },
]);

export default router;
