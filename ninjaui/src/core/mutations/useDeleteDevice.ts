import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_KEYS } from "../queries/queryKeys";

export const useDeleteDevice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => {
            return axios.delete(`http://localhost:3000/devices/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.devices] });
        }
    });
};