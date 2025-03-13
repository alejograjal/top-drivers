/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from "openapi-typescript-fetch";
import { TopDriversErrorDetails } from "types/api-basereservation";

export const isPresent = <T>(t: T): t is NonNullable<T> => {
    return t !== null && t !== undefined;
};

export const convertToArray = <T>(value: T | readonly T[] | undefined): T[] => {
    if (!value) return [];

    if (Array.isArray(value)) {
        return Array.from(value);
    }

    return [value as T];
}

const toCamelCase = (str: string): string => {
    return str.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`).replace(/^_/, "");
};

export const transformErrorKeys = (error: Record<string, any>): Record<string, any> => {
    const transformedError: Record<string, any> = {};
    for (const key in error) {
        if (Object.prototype.hasOwnProperty.call(error, key)) {
            transformedError[toCamelCase(key)] = error[key];
        }
    }
    return transformedError;
};

export const getErrorMessage = (error: ApiError) => {
    const errorDetail = transformErrorKeys(error.data as TopDriversErrorDetails);
    return errorDetail.message;
}

export const getNestedField = (obj: any, field: string) => {
    return field.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : null, obj);
};