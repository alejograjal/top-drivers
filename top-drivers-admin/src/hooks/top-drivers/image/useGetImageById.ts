import { isPresent } from "utils/util";
import { Image } from "types/api-basereservation";
import { ApiError } from "openapi-typescript-fetch/index";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { castRequestBody, useTypedApiClientBS } from "hooks/useTypedApiClientBS";

export const useGetImageById = (imageId: string | undefined): UseQueryResult<Image, ApiError> => {
    const path = '/api/Resource/{resourceId}';
    const method = 'get';

    const getImage = useTypedApiClientBS({ path, method });

    return useQuery({
        queryKey: ["GetImage", imageId],
        queryFn: async () => {
            const { data } = await getImage(castRequestBody({ resourceId: Number(imageId) }, path, method));
            return data;
        },
        retry: false,
        enabled: isPresent(imageId),
        staleTime: 0
    })
}