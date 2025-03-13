import { Course } from "types/api-basereservation";
import { ApiError } from "openapi-typescript-fetch";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useTypedApiClientBS } from "hooks/useTypedApiClientBS";

export const useGetCourses = (): UseQueryResult<Array<Course>, ApiError> => {
    const path = '/api/Course';
    const method = 'get';

    const getCourses = useTypedApiClientBS({ path, method });

    return useQuery({
        queryKey: ["GetCourses"],
        queryFn: async () => {
            const { data } = await getCourses({ includeDisabled: true } as never);
            return data;
        },
        enabled: true,
        staleTime: 0
    })
}