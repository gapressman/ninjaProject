import React, { Suspense, useState } from 'react';
import refresh from '../icons/refresh.png';
import { useGetDevices } from '../core/queries/useGetDevices';
import './DevicesTable.css';
import { ErrorBoundary } from "react-error-boundary";
import { DeviceIcon } from './DeviceIcon';
import { filterDeviceByText } from '../core/utils/filterDeviceByText';
import { DeviceTypeOptions, filterDeviceByType } from '../core/utils/filterDeviceByType';
import { sortDevices, Sort } from '../core/utils/sortDevices';

// filter by name and sort
const DEVICE_TYPE_OPTIONS = ['All', 'Windows', 'Mac', 'Linux'];
const SORT_OPTIONS: { label: string, value: Sort; }[] = [
    { label: 'name (Descending)', value: 'system_name descending' },
    { label: 'name (Ascending)', value: 'system_name ascending' },
    { label: 'HDD capacity (Descending)', value: 'hdd_capacity descending' },
    { label: 'HDD capacity (ascending)', value: 'hdd_capacity ascending' }
];

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
                    <div className='filter-row'>
                        <div className='filter-inputs'>
                            <input
                                type='text'
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className='search-input form-item'
                                placeholder='Search'
                            />

                            <select className='form-item' value={deviceType} onChange={e => setDeviceType(e.target.value as DeviceTypeOptions)}>
                                {
                                    DEVICE_TYPE_OPTIONS.map(device =>
                                        <option
                                            value={device.toUpperCase()}
                                            key={device}
                                            className='device-option'
                                        >
                                            Device Type: {device}
                                        </option>
                                    )
                                }
                            </select>

                            <select className='form-item' value={sort}
                                onChange={e => setSort(e.target.value as Sort)}
                            >
                                {
                                    SORT_OPTIONS.map(sort =>
                                        <option key={sort.label} value={sort.value}>Sort by: {sort.label}</option>
                                    )
                                }
                            </select>
                        </div>

                        <button className='refresh-button'><img src={refresh} alt='refresh' /></button>
                    </div>

                    <span className='table-item table-header'>Device</span>

                    {sortedDevices.map(({ id, hdd_capacity, system_name, type }) => (
                        <div className='table-item device-row' key={id}>
                            <div className='device'>
                                <DeviceIcon deviceType={type} />
                                <span className='device-name'>{system_name}-{id}</span>
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