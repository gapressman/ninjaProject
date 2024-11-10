import React, { FC, Suspense, useState } from 'react';
import { Device, useGetDevices } from '../../core/queries/useGetDevices';
import './DevicesTable.css';
import { ErrorBoundary } from "react-error-boundary";
import { DeviceIcon } from '../DeviceIcon';
import { filterDeviceByText } from '../../core/utils/filterDeviceByText';
import { DeviceTypeOptions, filterDeviceByType } from '../../core/utils/filterDeviceByType';
import { sortDevices, Sort } from '../../core/utils/sortDevices';
import { Filters } from '../Filters/Filters';
import { IconButton } from '../IconButton/IconButton';
import elipsesIcon from '../../icons/elipsesIcon.png';
import { ModalMeta } from '../../App';
import { DeleteModal } from '../DeleteModal/DeleteModal';


interface Props {
    setDeviceMeta(meta: ModalMeta): void;
}

export const DevicesTable: FC<Props> = ({ setDeviceMeta }) => {
    const [searchValue, setSearchValue] = useState('');
    const [deviceType, setDeviceType] = useState<DeviceTypeOptions>('ALL');
    const [sort, setSort] = useState<Sort>('system_name descending');
    const [activeMenuItem, setActiveMenuItem] = useState(-1);
    const [deviceToDelete, setDeviceToDelete] = useState<Device | undefined>();

    const { data: devices } = useGetDevices();

    const handleEditClick = (device: Device) => {
        setDeviceMeta({ modalType: 'edit', deviceToEdit: device });
        setActiveMenuItem(-1);
    };

    const handleDeleteClick = (device: Device) => {
        setDeviceToDelete(device);
        setActiveMenuItem(-1);
    };

    const filteredDevices = devices
        .filter((device) => {
            return filterDeviceByText(device, searchValue) && filterDeviceByType(device, deviceType);
        });

    const sortedDevices = sortDevices(filteredDevices, sort);

    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Suspense fallback={<div>loading...</div>}>
                {!!deviceToDelete && <DeleteModal onClose={() => setDeviceToDelete(undefined)} device={deviceToDelete} />}
                
                <div className='container'>
                    <Filters
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        deviceType={deviceType}
                        setDeviceType={setDeviceType}
                        sort={sort}
                        setSort={setSort}
                    />

                    <span className='table-item table-header'>Device</span>

                    {sortedDevices.map((device, i) => {
                        const { id, hdd_capacity, system_name, type } = device;
                        const isActive = activeMenuItem === i;

                        return (
                            <div className='table-item table-row' key={id}>
                                <div className='device-data'>
                                    <div className='device'>
                                        <DeviceIcon deviceType={type} />
                                        <span>{system_name}-{id}</span>
                                    </div>

                                    <div className='device-details'>
                                        <span>{type} - {hdd_capacity} GB</span>
                                    </div>
                                </div>
                                <IconButton className={`show-more-button ${isActive && 'active'}`} icon={elipsesIcon} onClick={() => setActiveMenuItem(i)} alt='Show more icon' />

                                {isActive && (
                                    <div className='context-menu'>
                                        <button className='button' onClick={() => handleEditClick(device)}>Edit</button>
                                        <button className='button delete' onClick={() => handleDeleteClick(device)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Suspense>
        </ErrorBoundary>
    );
};



