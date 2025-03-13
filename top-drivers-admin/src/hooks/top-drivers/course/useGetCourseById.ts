import { Course } from "types/api-basereservation";
import { ApiError } from "openapi-typescript-fetch/index";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { castRequestBody, useTypedApiClientBS } from "hooks/useTypedApiClientBS";
import { isPresent } from "utils/util";

export const useGetCourseById = (courseId: string | undefined): UseQueryResult<Course, ApiError> => {
    const path = '/api/Course/{courseId}';
    const method = 'get';

    const getBranch = useTypedApiClientBS({ path, method });

    return useQuery({
        queryKey: ["GetCourseById", courseId],
        queryFn: async () => {
            const { data } = await getBranch(castRequestBody({ courseId: Number(courseId) }, path, method));
            return data;
        },
        retry: false,
        enabled: isPresent(courseId),
        staleTime: 0
    })
}