import {
    useQuery,
    UseQueryResult,
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

export const useGetDeviceById = (id?: string): UseQueryResult<Device> => {
    return useQuery({
        enabled: !!id,
        queryKey: [QUERY_KEYS.devices, id],
        queryFn: async () => {
            const { data } = await axios({ url: `http://localhost:3000/devices/${id}`, method: 'get' });

            return data;
        },
    });
};