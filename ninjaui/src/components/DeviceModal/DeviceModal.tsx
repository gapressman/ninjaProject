import React, { FC, useState } from 'react';
import { IconButton } from '../IconButton/IconButton';
import closeIcon from '../../icons/closeIcon.png';
import { Device, DeviceType } from '../../core/queries/useGetDevices';
import { useAddDevice } from '../../core/mutations/useAddDevice';
import './DeviceModal.css';
import { useEditDevice } from '../../core/mutations/useEditDevice';

const DEVICE_TYPES = [{ label: 'Windows', value: 'WINDOWS' }, { label: 'Mac', value: 'MAC' }, { label: 'Linux', value: 'LINUX' }];

interface Props {
    actionType: 'add' | 'edit';
    onClose(): void;
    device?: Device;
}

const defaultDevice: Partial<Device> = { system_name: '', hdd_capacity: '' };

export const DeviceModal: FC<Props> = ({ actionType, onClose, device = defaultDevice }) => {
    const { mutate: mutateAdd } = useAddDevice();
    const { mutate: mutateEdit } = useEditDevice();
    const { system_name, hdd_capacity, type } = device;

    const [systemName, setSystemName] = useState(system_name);
    const [deviceType, setDeviceType] = useState<DeviceType | undefined>(type);
    const [hddCapacity, setHddCapacity] = useState(hdd_capacity);

    const handleSetHddCapacity = (value: string) => {
        if (isNaN(Number(value))) {
            return;
        }

        setHddCapacity(value);
    };

    const handleSubmit = () => {
        // Already disabling button, but this will prevent user from undisabling and triggering
        if (systemName && deviceType && hddCapacity) {
            const callback = () => actionType === 'add' ?
                mutateAdd({ type: deviceType, hdd_capacity: hddCapacity, system_name: systemName }) :
                mutateEdit({ type: deviceType, hdd_capacity: hddCapacity, system_name: systemName, id: device.id! });

            callback();
            onClose();
        }
    };

    const isButtonDisabled = !systemName || !deviceType || !hddCapacity;
    const title = actionType === 'add' ? 'Add' : 'Edit';

    return (
        <div className='modal-cover'>
            <div className='modal'>
                <div className='title-row'>
                    <span className='title'>{title} device</span>
                    <IconButton icon={closeIcon} alt='close-icon' onClick={onClose} />
                </div>

                <div className='modal-content'>
                    <div className='form'>
                        <label className='form-row'>
                            System name *
                            <input type='text' className='form-item' value={systemName} onChange={e => setSystemName(e.target.value)} />
                        </label>

                        <label className='form-row'>
                            Device type *
                            <select value={deviceType} className='form-item' onChange={e => setDeviceType(e.target.value as DeviceType)}>
                                <option selected disabled value={undefined}>Select Type</option>
                                {DEVICE_TYPES.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                            </select>
                        </label>

                        <label className='form-row'>
                            HDD capacity (GB) *
                            <input type='text' className='form-item' value={hddCapacity} onChange={e => handleSetHddCapacity(e.target.value)} />
                        </label>
                    </div>


                    <div className='actions'>
                        <button onClick={onClose} className="button cancel-button">Cancel</button>
                        <button onClick={handleSubmit} disabled={isButtonDisabled} className="button submit-button">Submit</button>
                    </div>
                </div>
            </div>
        </div >
    );
};