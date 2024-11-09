import {
    useSuspenseQuery, UseSuspenseQueryResult,
} from '@tanstack/react-query';
import axios from 'axios';

export type DeviceType = "WINDOWS" | "MAC" | "LINUX"
export interface Device {
    hdd_capacity: string;
    id: string;
    system_name: string;
    type: DeviceType;
}

export const useGetDevices = (): UseSuspenseQueryResult<Device[]> => {
    return useSuspenseQuery<Device[]>({
        queryKey: ['devices'],
        queryFn: async () => {
            const { data } = await axios({ url: 'http://localhost:3000/devices', method: 'get' });

            return data;
        },

    });
};