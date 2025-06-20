import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className='max-h-screen min-h-svh'>
      <Outlet />
    </div>
  );
};

export default App;
