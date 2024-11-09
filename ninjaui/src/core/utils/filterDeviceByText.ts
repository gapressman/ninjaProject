import { Device } from "../queries/useGetDevices";

export const filterDeviceByText = (device: Device, searchInput: string) => {
    const searchCriteria = `${device.system_name} ${device.id}`.toLowerCase();

    return searchCriteria.includes(searchInput.toLowerCase());
};