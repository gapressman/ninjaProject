import React, { Suspense, useState } from 'react';
import { useGetDevices } from '../../core/queries/useGetDevices';
import './DevicesTable.css';
import { ErrorBoundary } from "react-error-boundary";
import { DeviceIcon } from '../DeviceIcon';
import { filterDeviceByText } from '../../core/utils/filterDeviceByText';
import { DeviceTypeOptions, filterDeviceByType } from '../../core/utils/filterDeviceByType';
import { sortDevices, Sort } from '../../core/utils/sortDevices';
import { Filters } from '../Filters/Filters';


export const DevicesTable = () => {
    const [searchValue, setSearchValue] = useState('');
    const [deviceType, setDeviceType] = useState<DeviceTypeOptions>('ALL');
    const [sort, setSort] = useState<Sort>('system_name descending');

    const { data: devices } = useGetDevices();

    const filteredDevices = devices
        .filter((device) => {
            return filterDeviceByText(device, searchValue) && filterDeviceByType(device, deviceType);
        });

    const sortedDevices = sortDevices(filteredDevices, sort);

    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Suspense fallback={<div>loading...</div>}>
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

                    {sortedDevices.map(({ id, hdd_capacity, system_name, type }) => (
                        <div className='table-item device-row' key={id}>
                            <div className='device'>
                                <DeviceIcon deviceType={type} />
                                <span>{system_name}-{id}</span>
                            </div>

                            <div className='device-details'>
                                <span>{type} - {hdd_capacity} GB</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Suspense>
        </ErrorBoundary>
    );
};



