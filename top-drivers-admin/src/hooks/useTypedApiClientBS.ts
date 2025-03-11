import Cookies from 'js-cookie';
import { paths } from "api/top-drivers/api";
import { Fetcher, Middleware, type TypedFetch } from "openapi-typescript-fetch";

const getHeaders = (disableAuth: boolean, token: string): Record<string, string> => {
    if (disableAuth) {
        return { "x-api-version": "1" }
    }

    return {
        "x-api-version": "1",
        Authorization: `Bearer ${token}`
    }
}

const arrayWrapperMiddleware: Middleware = async (url, init, next) => {
    if (init?.body && typeof init.body === "string") {
        try {
            const body = JSON.parse(init.body);
            const keys = Object.keys(body);
            if (keys.length === 1 && Array.isArray(body[String(keys[0])])) {
                init.body = JSON.stringify(body[String(keys[0])]);
            }
        } catch (error) {
            console.warn("No se pudo parsear el body como JSON, posiblemente no es JSON.", error);
        }
    }
    return next(url, init);
};

export const useTypedApiClientBS = <
    PathT extends keyof paths,
    MethodT extends keyof paths[PathT],
>({
    path,
    method,
    disableAuth = false
}: {
    path: PathT
    method: MethodT
    disableAuth?: boolean
}): TypedFetch<paths[PathT][MethodT]> => {
    const token = Cookies.get('access_token');
    const fetcher = Fetcher.for<paths>();
    fetcher.configure({
        baseUrl: import.meta.env.VITE_API_TOPDRIVERS_BASE_URL,
        init: {
            headers: getHeaders(disableAuth, token ?? ''),
        },
        use: [arrayWrapperMiddleware]
    });

    return fetcher.path(path).method(method).create({}) as TypedFetch<paths[PathT][MethodT]>;
}


export const castRequestBody = <
    PathT extends keyof paths,
    MethodT extends keyof paths[PathT]
>(
    data: unknown,
    path: PathT,
    method: MethodT
): paths[PathT][MethodT] extends { requestBody: { content: { 'application/json': infer R } } } ? R | undefined : never => {
    if (method === 'post' || method === 'put' || method === 'patch') {

        return data as paths[PathT][MethodT] extends { requestBody: { content: { 'application/json': infer R } } } ? R : never;
    }

    if (method === 'get' || method === 'delete') {
        if (data && typeof data === 'object') {
            return data as never;
        }

        const pathParams = path.match(/{([^{}]+)}/g);
        if (pathParams) {
            const pathObj = pathParams.reduce((acc, param) => {
                const paramName = param.replace(/[{}]/g, '');
                if (typeof data === 'object' && data !== null && paramName in (data as Record<string, unknown>)) {
                    acc[paramName] = (data as Record<string, unknown>)[paramName];
                }
                return acc;
            }, {} as { [key: string]: unknown });

            return pathObj as never;
        }
    }

    return undefined as never;
};

export const castRequestBodyMultipart = <
    PathT extends keyof paths,
    MethodT extends keyof paths[PathT]
>(
    data: unknown,
    method: MethodT
): paths[PathT][MethodT] extends { requestBody: { content: { "multipart/form-data": infer FormData } } } ? FormData | undefined : never => {

    if (method === "post" || method === "put" || method === "patch") {
        const formData = new FormData();
        const requestData = data as Record<string, unknown>;

        for (const key in requestData) {
            const value = requestData[key];

            if (value instanceof File || value instanceof Blob) {
                formData.append(key, value);
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, String(item));
                });
            } else if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        }
        return formData as paths[PathT][MethodT] extends { requestBody: { content: { "multipart/form-data": infer FormData } } } ? FormData : never;
    }

    return undefined as never;
};
