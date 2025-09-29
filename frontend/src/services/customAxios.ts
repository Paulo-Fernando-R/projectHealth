import axios, { AxiosError } from "axios";
import type { AxiosResponse, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import type { IcustomAxios } from "./IcustomAxios";

export default class CustomAxios implements IcustomAxios {
    instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: "https://api.example.com",
            timeout: 10000, // 10 seconds timeout
            headers: {
                "Content-Type": "application/json",
                Authorization: "Api token from storage or environment variable",
            },
        });
        this.instance.interceptors.request.use(this.reqInterceptor(), this.errInterceptor());
        this.instance.interceptors.response.use(this.resInterceptor());
    }

    private resInterceptor() {
        const interceptor = async (response: AxiosResponse) => {
            if (response.status !== 401) return response;

            //get token from storage or environment variable and execute refresh token logic
            return response;
        };

        return interceptor;
    }

    private reqInterceptor() {
        const interceptor = async (config: InternalAxiosRequestConfig<AxiosResponse>) => {
            config.validateStatus = () => true; // Accept all status codes
            return config;
        };
        return interceptor;
    }

    private errInterceptor() {
        const interceptor = async (error: AxiosError) => {
            //const { response, status  } = error;
            // Handle error based on status code if needed
            return Promise.reject(error);
        };

        return interceptor;
    }
}
