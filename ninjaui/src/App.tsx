import React, { Suspense, useState } from 'react';
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
import { ErrorBoundary } from 'react-error-boundary';

export interface ModalMeta {
  modalType: 'edit' | 'add';
  deviceToEdit?: Device;
}

const queryClient = new QueryClient();

const App = () => {
  const [modalMeta, setModalType] = useState<ModalMeta>();

  return (
    <ErrorBoundary fallback={<div>Beautiful error message</div>}>
      <Suspense fallback={<div>loading...</div>}>

        <QueryClientProvider client={queryClient}>
          {!!modalMeta && <DeviceModal actionType={modalMeta?.modalType} device={modalMeta?.deviceToEdit} onClose={() => setModalType(undefined)} />}

          <header className="app-header">
            <img src={logo} className="app-logo" alt="logo" />
          </header>

          <div className='add-device-row'>
            <p className='add-device-text'>Devices</p>
            <button onClick={() => setModalType({ modalType: 'add' })} className='add-device-button'><img src={plus} alt='plus' />Add device</button>
          </div>

          <DevicesTable setDeviceMeta={setModalType} />
        </QueryClientProvider >
      </Suspense>
    </ErrorBoundary>


  );
};

export default App;
