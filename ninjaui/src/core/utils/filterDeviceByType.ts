import { DeviceType, Device } from "../queries/useGetDevices";

export type DeviceTypeOptions = DeviceType | 'ALL';

export const filterDeviceByType = ({ type }: Device, selectedDeviceType: DeviceTypeOptions) => {
    if (selectedDeviceType === 'ALL') {
        return true;
    }

    return type === selectedDeviceType;
};