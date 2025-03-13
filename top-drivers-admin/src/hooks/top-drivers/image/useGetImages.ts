import { Image } from "types/api-basereservation";
import { ApiError } from "openapi-typescript-fetch";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useTypedApiClientBS } from "hooks/useTypedApiClientBS";

export const useGetImages = (): UseQueryResult<Array<Image>, ApiError> => {
    const path = '/api/Resource';
    const method = 'get';

    const getImages = useTypedApiClientBS({ path, method });

    return useQuery({
        queryKey: ["GetImages"],
        queryFn: async () => {
            const { data } = await getImages({ includeDisabled: true } as never);
            return data;
        },
        enabled: true,
        staleTime: 0
    })
}