const BASE_URL = "http://localhost:8080";

interface HTTPParams {
    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    url: string;
    headers?: any;
    body?: any,
    isFormData?: boolean;
    sanitize?: "yes" | "no";
}

export interface HTTPResponse<T = any> {
    status: string;
    data: T;
    message: string;
}

export const httpRequest = async (params: HTTPParams): Promise<HTTPResponse> => {

    try {
        const { url, method, body, headers } = params;

        if (!url) throw new Error("url is not set");
        if (typeof url !== "string") throw new Error("url must be a string");
        const options: any = {
            method: method || "GET",
            redirect: "follow",
            headers: {
                "x-access-token": sessionStorage.getItem("x-access-token"),
                "pragma": "no-cache",
                "cache-control": "no-cache",
                'Content-Type': 'application/json',
                ...headers
            },
        }

        if (body) {
            options.body = JSON.stringify(body);
        }

        const res = await fetch(`${BASE_URL}/api/${url}`, options);
        const result: any = await res.json();
        return result;
    } catch (error) {
        throw error;
    }
}