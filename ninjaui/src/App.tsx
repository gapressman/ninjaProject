import React from 'react';
import logo from './NinjaOneLogo.png';
import plus from './plus.png';
import './App.css';
import { DevicesTable } from './components/DevicesTable/DevicesTable';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className='Add-Device-Row'>
        <p className='Add-Device-Text'>Devices</p>
        <button className='Add-Device-Button'><img src={plus} alt='plus' />Add device</button>
      </div>

      <DevicesTable />
    </QueryClientProvider >
  );
}

export default App;
