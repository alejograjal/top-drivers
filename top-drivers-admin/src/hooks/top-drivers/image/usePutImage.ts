import { transformErrorKeys } from "utils/util";
import { useApiClient } from "hooks/useApiClient";
import { ApiError } from "openapi-typescript-fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { castRequestBodyMultipart } from "hooks/useTypedApiClientBS";
import { Image, ImageRequest, TopDriversErrorDetails } from "types/api-basereservation";

interface usePutImageProps {
    onSuccess?: (
        data: Image,
        variables: ImageRequest
    ) => void,
    onError?: (
        data: TopDriversErrorDetails,
        variables: ImageRequest
    ) => void,
    onSettled?: (
        data: Image | undefined,
        error: TopDriversErrorDetails | null,
        variables: ImageRequest,
    ) => void
}

export const usePutImage = ({ onSuccess, onError, onSettled }: usePutImageProps) => {
    const path = '/api/Resource/{resourceId}';
    const method = 'put';

    const putImageApiClient = useApiClient();
    const queryClient = useQueryClient();

    return useMutation<Image, ApiError, ImageRequest>({
        mutationKey: ["PutImage"],
        mutationFn: async (image: ImageRequest) => {
            const formData: FormData = castRequestBodyMultipart(image, method);

            const { data, error } = await putImageApiClient.PUT(path, {
                params: { path: { resourceId: Number(image.Id) } },
                body: {},
                bodySerializer: () => formData
            })

            if (error) {
                throw error as ApiError;
            }
            return data;
        },
        onSettled: (data, error, variables) => {
            onSettled?.(data, error, variables)
        },
        onError: (error: ApiError, _) => {
            onError?.(transformErrorKeys(error.data) as TopDriversErrorDetails, _)
        },
        onSuccess: async (data: Image, variables: ImageRequest) => {
            await queryClient.invalidateQueries({
                queryKey: ['GetImage']
            })
            onSuccess?.(data, variables)
        }
    })
}