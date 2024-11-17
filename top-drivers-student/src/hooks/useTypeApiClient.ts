import { paths } from "api/topdrivers/api";
import { Fetcher, type TypedFetch } from "openapi-typescript-fetch";

export const useTypedApiClient = <
    PathT extends keyof paths,
    MethodT extends keyof paths[PathT]
>({
    path,
    method
}: {
    path: PathT
    method: MethodT
}): TypedFetch<paths[PathT][MethodT]> => {

    const fetcher = Fetcher.for<paths>();
    fetcher.configure({
        baseUrl: import.meta.env.VITE_API_BASE_URL
    });

    return fetcher.path(path).method(method).create({}) as TypedFetch<paths[PathT][MethodT]>;
}