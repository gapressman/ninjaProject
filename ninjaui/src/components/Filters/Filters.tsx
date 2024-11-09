import React, { FC } from 'react';
import refresh from '../../icons/refresh.png';
import { DeviceTypeOptions } from '../../core/utils/filterDeviceByType';
import { Sort } from '../../core/utils/sortDevices';
import './Filters.css';

export const DEVICE_TYPE_OPTIONS = ['All', 'Windows', 'Mac', 'Linux'];
export const SORT_OPTIONS: { label: string, value: Sort; }[] = [
    { label: 'name (Descending)', value: 'system_name descending' },
    { label: 'name (Ascending)', value: 'system_name ascending' },
    { label: 'HDD capacity (Descending)', value: 'hdd_capacity descending' },
    { label: 'HDD capacity (ascending)', value: 'hdd_capacity ascending' }
];

interface Props {
    searchValue: string;
    setSearchValue(value: string): void;
    deviceType: string;
    setDeviceType(value: DeviceTypeOptions): void;
    sort: string;
    setSort(newSort: Sort): void;
}

export const Filters: FC<Props> = ({ searchValue, setSearchValue, deviceType, setDeviceType, sort, setSort }) => {
    return (
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
                    {DEVICE_TYPE_OPTIONS.map(device =>
                        <option
                            value={device.toUpperCase()}
                            key={device}
                            className='device-option'
                        >
                            Device Type: {device}
                        </option>
                    )}
                </select>

                <select className='form-item' value={sort}
                    onChange={e => setSort(e.target.value as Sort)}
                >
                    {SORT_OPTIONS.map(sort =>
                        <option key={sort.label} value={sort.value}>Sort by: {sort.label}</option>
                    )}
                </select>
            </div>

            <button className='refresh-button'><img src={refresh} alt='refresh' /></button>
        </div>
    );
};
