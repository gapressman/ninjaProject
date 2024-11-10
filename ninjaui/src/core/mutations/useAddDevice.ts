import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_KEYS } from "../queries/queryKeys";
import { Device } from "../queries/useGetDevices";

export const useAddDevice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newDevice: Omit<Device, 'id'>) => {
            return axios.post('http://localhost:3000/devices', newDevice);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.devices] });
        }
    });
};