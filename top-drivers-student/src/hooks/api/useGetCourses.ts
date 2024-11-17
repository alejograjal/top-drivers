import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useTypedApiClient } from "../../hooks/useTypeApiClient";
import { Courses } from "types/api";

export const useGetCourses = (): UseQueryResult<Array<Courses>> => {
    const getCourses = useTypedApiClient({
        path: '/api/student-Course',
        method: 'get'
    })

    return useQuery({
        queryKey: [
            'student-Course'
        ],
        queryFn: async () => {
            const { data } = await getCourses({});
            return data;
        },
        enabled: true
    })
}