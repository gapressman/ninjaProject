import React, { useState } from 'react';
import logo from './icons/NinjaOneLogo.png';
import plus from './icons/plus.png';
import './App.css';
import { DevicesTable } from './components/DevicesTable/DevicesTable';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { DeviceModal } from './components/DeviceModal/DeviceModal';
import { Device } from './core/queries/useGetDevices';

export interface ModalMeta {
  modalType: 'edit' | 'add';
  deviceToEdit?: Device;
}

const queryClient = new QueryClient();

const App = () => {
  const [modalMeta, setModalType] = useState<ModalMeta>();

  return (
    <QueryClientProvider client={queryClient}>
      {!!modalMeta && <DeviceModal actionType={modalMeta?.modalType} device={modalMeta?.deviceToEdit} onClose={() => setModalType(undefined)} />}

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className='Add-Device-Row'>
        <p className='Add-Device-Text'>Devices</p>
        <button onClick={() => setModalType({ modalType: 'add' })} className='Add-Device-Button'><img src={plus} alt='plus' />Add device</button>
      </div>

      <DevicesTable setDeviceMeta={setModalType} />
    </QueryClientProvider >
  );
};

export default App;
