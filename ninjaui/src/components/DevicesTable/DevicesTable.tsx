import React, { FC, useRef, useState } from 'react';
import { Device, useGetDevices } from '../../core/queries/useGetDevices';
import './DevicesTable.css';
import { DeviceIcon } from '../DeviceIcon';
import { filterDeviceByText } from '../../core/utils/filterDeviceByText';
import { DeviceTypeOptions, filterDeviceByType } from '../../core/utils/filterDeviceByType';
import { sortDevices, Sort } from '../../core/utils/sortDevices';
import { Filters } from '../Filters/Filters';
import { IconButton } from '../IconButton/IconButton';
import elipsesIcon from '../../icons/elipsesIcon.png';
import { ModalMeta } from '../../App';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { useGetDeviceById } from '../../core/queries/useGetDeviceById';

interface Props {
    setDeviceMeta(meta: ModalMeta): void;
}

export const DevicesTable: FC<Props> = ({ setDeviceMeta }) => {
    const [searchValue, setSearchValue] = useState('');
    const [deviceType, setDeviceType] = useState<DeviceTypeOptions>('ALL');
    const [sort, setSort] = useState<Sort>('system_name descending');
    const [activeMenuItem, setActiveMenuItem] = useState(-1);
    const [deviceToDelete, setDeviceToDelete] = useState<Device | undefined>();
    const [openRowId, setOpenRowId] = useState<string | undefined>();

    const ref = useRef<HTMLDivElement>(null);

    const { data: devices } = useGetDevices();
    const { data: selectedDevice } = useGetDeviceById(openRowId);

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, device: Device) => {
        e.stopPropagation();

        setDeviceMeta({ modalType: 'edit', deviceToEdit: device });
        setActiveMenuItem(-1);
    };

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, device: Device) => {
        e.stopPropagation();

        setDeviceToDelete(device);
        setActiveMenuItem(-1);
    };

    const handleOutsideClick = ({ target }: MouseEvent) => {
        if (ref.current && !ref.current.contains(target as HTMLElement)) {
            setActiveMenuItem(-1);
        }

        document.removeEventListener('click', handleOutsideClick);
    };

    const handleOpenContextMenu = (itemToSet: number, e: MouseEvent) => {
        if (activeMenuItem === -1) {
            e.stopPropagation();
        }

        setActiveMenuItem(itemToSet);
        document.addEventListener('click', handleOutsideClick);
    };

    const handleOpenRow = (id: string) => {
        if (openRowId === id) {
            setOpenRowId(undefined);

            return;
        }

        setOpenRowId(id);
    };

    const filteredDevices = devices
        .filter((device) => {
            return filterDeviceByText(device, searchValue) && filterDeviceByType(device, deviceType);
        });

    const sortedDevices = sortDevices(filteredDevices, sort);

    return (
        <div className='container' >
            <Filters
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                deviceType={deviceType}
                setDeviceType={setDeviceType}
                sort={sort}
                setSort={setSort}
            />

            {!!deviceToDelete && <DeleteModal onClose={() => setDeviceToDelete(undefined)} device={deviceToDelete} />}
            <span className='table-item table-header'>Device</span>

            {sortedDevices.map((device, i) => {
                const { id, hdd_capacity, system_name, type } = device;
                const isActive = activeMenuItem === i;

                return (
                    <div className='table-item' key={id} onClick={() => handleOpenRow(id)}>
                        <div className='table-row'>
                            <div className='device-data'>
                                <div className='device'>
                                    <DeviceIcon deviceType={type} />
                                    <span>{system_name}-{id}</span>
                                </div>

                                <div className='device-details'>
                                    <span>{type} - {hdd_capacity} GB</span>
                                </div>
                            </div>
                            <IconButton className={`show-more-button ${isActive && 'active'}`} icon={elipsesIcon} onClick={e => handleOpenContextMenu(i, e)} alt='Show more icon' />

                            {isActive && (
                                <div className='context-menu' ref={ref} >
                                    <button className='button' onClick={(e) => handleEditClick(e, device)}>Edit</button>
                                    <button className='button delete' onClick={(e) => handleDeleteClick(e, device)}>Delete</button>
                                </div>
                            )}
                        </div>

                        {openRowId === id && (
                            <div>
                                {!selectedDevice ?
                                    <div>loading... </div> :
                                    <ul>
                                        <li>Name: {system_name}</li>
                                        <li>type: {type}</li>
                                        <li>id: {id}</li>
                                        <li>storage: {hdd_capacity}</li>
                                    </ul>
                                }
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};



