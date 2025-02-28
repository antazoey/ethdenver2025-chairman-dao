import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <div className='App'>
      <Outlet />
    </div>
  )
}

export default App
