import { transformErrorKeys } from "utils/util";
import { ApiError } from "openapi-typescript-fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { castRequestBody, useTypedApiClientBS } from "hooks/useTypedApiClientBS";
import { Course, CourseRequest, TopDriversErrorDetails } from "types/api-basereservation";

interface usePutCourseProps {
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

export const usePutCourse = ({ onSuccess, onError, onSettled }: usePutCourseProps) => {
    const path = '/api/Course/{courseId}';
    const method = 'put';

    const putCourse = useTypedApiClientBS({ path, method });
    const queryClient = useQueryClient();

    return useMutation<Course, ApiError, CourseRequest>({
        mutationKey: ["PutCourse"],
        mutationFn: async (course: CourseRequest) => {
            const { data } = await putCourse(castRequestBody({ courseId: Number(course.id), ...course }, path, method));
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