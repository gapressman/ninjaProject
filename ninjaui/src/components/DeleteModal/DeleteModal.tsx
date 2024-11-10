import React, { FC } from 'react';
import { IconButton } from '../IconButton/IconButton';
import './DeleteModal.css';
import closeIcon from '../../icons/closeIcon.png';
import { Device } from '../../core/queries/useGetDevices';
import { useDeleteDevice } from '../../core/mutations/useDeleteDevice';

interface Props {
    onClose(): void;
    device: Device;
}

export const DeleteModal: FC<Props> = ({ onClose, device }) => {
    const { system_name, id } = device;

    const { mutate } = useDeleteDevice();

    const handleDelete = () => {
        mutate(id);
        onClose();
    };

    return (
        <div className='modal-cover'>
            <div className='modal delete-modal'>
                <div className='title-row'>
                    <span className='title'>Delete device?</span>
                    <IconButton icon={closeIcon} alt='close-icon' onClick={onClose} />
                </div>

                <div className='content'>
                    <span>You are about to delete the device <strong>{system_name}-{id}</strong>. This action cannot be undone.</span>

                    <div className='actions'>
                        <button className='button cancel' onClick={onClose}>Cancel</button>
                        <button className='button delete' onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};