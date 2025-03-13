import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useTypedApiClient } from "../../hooks/useTypeApiClient";
import { Image } from "types/api";

export const useGetImages = (): UseQueryResult<Array<Image>> => {
    const getImages = useTypedApiClient({
        path: '/api/student-Resource',
        method: 'get'
    })

    return useQuery({
        queryKey: [
            'student-Resource'
        ],
        queryFn: async () => {
            const { data } = await getImages({});
            return data;
        },
        enabled: true
    })
}