import { transformErrorKeys } from "utils/util";
import { ApiError } from "openapi-typescript-fetch";
import { TopDriversErrorDetails } from "types/api-basereservation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { castRequestBody, useTypedApiClientBS } from "hooks/useTypedApiClientBS";

interface useDeleteCourseProps {
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

export const useDeleteCourse = ({
    onSuccess,
    onError,
    onSettled
}: useDeleteCourseProps) => {
    const path = '/api/Course/{courseId}';
    const method = 'delete';

    const deleteCourse = useTypedApiClientBS({ path, method })
    const queryClient = useQueryClient();

    const deleteCourseMutation = useMutation({
        mutationKey: ['DeleteCourse'],
        mutationFn: async (courseId: number) => {
            const { data } = await deleteCourse(castRequestBody({ courseId }, path, method))
            return data;
        },
        onSuccess: async (data: boolean, variables: number) => {
            await queryClient.invalidateQueries({
                queryKey: ['Courses']
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

    return deleteCourseMutation;
}