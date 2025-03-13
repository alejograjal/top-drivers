import Cookies from 'js-cookie';
import createClient from "openapi-fetch"
import { paths } from "api/top-drivers/api";

export const useApiClient = () => {
    const token = Cookies.get('access_token');

    return createClient<paths>({
        baseUrl: import.meta.env.VITE_API_TOPDRIVERS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token ?? ''}`
        }
    });
}