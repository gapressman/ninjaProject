import {
    useSuspenseQuery, UseSuspenseQueryResult,
} from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEYS } from './queryKeys';

export type DeviceType = "WINDOWS" | "MAC" | "LINUX";
export interface Device {
    hdd_capacity: string;
    id: string;
    system_name: string;
    type: DeviceType;
}

export const useGetDevices = (): UseSuspenseQueryResult<Device[]> => {
    return useSuspenseQuery<Device[]>({
        queryKey: [QUERY_KEYS.devices],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:3000/devices');

            return data;
        },

    });
};