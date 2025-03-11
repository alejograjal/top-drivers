import { transformErrorKeys } from "utils/util";
import { ApiError } from "openapi-typescript-fetch";
import { TopDriversErrorDetails } from "types/api-basereservation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { castRequestBody, useTypedApiClientBS } from "hooks/useTypedApiClientBS";

interface useDeleteImageProps {
    onSuccess?: (
        data: boolean,
        variables: number
    ) => void,
    onError?: (
        data: TopDriversErrorDetails,
        variables: number
    ) => void,
    onSettled?: (
        data: boolean | undefined,
        error: TopDriversErrorDetails | null,
        variables: number
    ) => void
}

export const useDeleteImage = ({
    onSuccess,
    onError,
    onSettled
}: useDeleteImageProps) => {
    const path = '/api/Resource/{resourceId}';
    const method = 'delete';

    const deleteImage = useTypedApiClientBS({ path, method })
    const queryClient = useQueryClient();

    const deleteImageMutation = useMutation({
        mutationKey: ['DeleteImage'],
        mutationFn: async (imageId: number) => {
            const { data } = await deleteImage(castRequestBody({ resourceId: imageId }, path, method))
            return data;
        },
        onSuccess: async (data: boolean, variables: number) => {
            await queryClient.invalidateQueries({
                queryKey: ['Images']
            })
            onSuccess?.(data, variables)
        },
        onError: (error: ApiError, _) => {
            onError?.(transformErrorKeys(error.data) as TopDriversErrorDetails, _)
        },
        onSettled: (data, error, variables) => {
            onSettled?.(data, error, variables)
        }
    })

    return deleteImageMutation;
}