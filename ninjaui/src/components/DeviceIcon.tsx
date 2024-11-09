import React from 'react';
import windows from '../icons/windows.png';
import mac from '../icons/apple.png';
import linux from '../icons/linux.png';

interface Props {
    deviceType: 'WINDOWS' | 'MAC' | 'LINUX';
}

const deviceTypeToIconPathMap = {
    WINDOWS: windows,
    MAC: mac,
    LINUX: linux
};

export const DeviceIcon: React.FC<Props> = ({ deviceType }) => {
    return <img src={deviceTypeToIconPathMap[deviceType]} alt='device icon' />;
};