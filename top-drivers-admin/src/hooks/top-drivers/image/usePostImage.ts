import { transformErrorKeys } from "utils/util";
import { ApiError } from "openapi-typescript-fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image, ImageRequest, TopDriversErrorDetails } from "types/api-basereservation";
import { castRequestBodyMultipart } from "hooks/useTypedApiClientBS";
import { useApiClient } from "../../useApiClient";

interface usePostImageProps {
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

export const usePostImage = ({ onSuccess, onError, onSettled }: usePostImageProps) => {
    const path = '/api/Resource';
    const method = 'post';

    const postImageApiClient = useApiClient();
    const queryClient = useQueryClient();

    return useMutation<Image, ApiError, ImageRequest>({
        mutationKey: ["PostImage"],
        mutationFn: async (image: ImageRequest) => {
            const formData: FormData = castRequestBodyMultipart(image, method);

            const { data, error } = await postImageApiClient.POST(path, {
                params: {},
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
                queryKey: ['GetImages']
            })
            onSuccess?.(data, variables)
        }
    })
}