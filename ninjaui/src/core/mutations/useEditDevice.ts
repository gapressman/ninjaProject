import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_KEYS } from "../queries/queryKeys";
import { Device } from "../queries/useGetDevices";

export const useEditDevice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...rest }: Device) => {
            return axios.put(`http://localhost:3000/devices/${id}`, rest);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.devices] });
        }
    });
};