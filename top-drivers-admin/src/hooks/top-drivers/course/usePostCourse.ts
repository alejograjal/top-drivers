import { transformErrorKeys } from "utils/util";
import { ApiError } from "openapi-typescript-fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { castRequestBody, useTypedApiClientBS } from "hooks/useTypedApiClientBS";
import { Course, CourseRequest, TopDriversErrorDetails } from "types/api-basereservation";

interface usePostCourseProps {
    onSuccess?: (
        data: Course,
        variables: CourseRequest
    ) => void,
    onError?: (
        data: TopDriversErrorDetails,
        variables: CourseRequest
    ) => void,
    onSettled?: (
        data: Course | undefined,
        error: TopDriversErrorDetails | null,
        variables: CourseRequest,
    ) => void
}

export const usePostCourse = ({ onSuccess, onError, onSettled }: usePostCourseProps) => {
    const path = '/api/Course';
    const method = 'post';

    const postCourse = useTypedApiClientBS({ path, method });
    const queryClient = useQueryClient();

    return useMutation<Course, ApiError, CourseRequest>({
        mutationKey: ["PostCourse"],
        mutationFn: async (course: CourseRequest) => {
            const { data } = await postCourse(castRequestBody(course, path, method));
            return data;
        },
        onSettled: (data, error, variables) => {
            onSettled?.(data, error, variables)
        },
        onError: (error: ApiError, _) => {
            onError?.(transformErrorKeys(error.data) as TopDriversErrorDetails, _)
        },
        onSuccess: async (data: Course, variables: CourseRequest) => {
            await queryClient.invalidateQueries({
                queryKey: ['GetCourse']
            })
            onSuccess?.(data, variables)
        }
    })
}