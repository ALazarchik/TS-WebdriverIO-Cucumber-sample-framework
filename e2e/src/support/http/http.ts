import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { GlobalLogConfig } from "axios-logger/lib/common/types";
import * as AxiosLogger from "axios-logger";
import _ from "lodash";

export class HTTP {
    protected defaultConfig: AxiosRequestConfig;

    private readonly defaultLoggerConfig: GlobalLogConfig;

    public constructor(protected readonly axiosConfig?: AxiosRequestConfig) {
        this.defaultConfig = {
            ...axiosConfig,
        };

        this.defaultLoggerConfig = {
            method: true,
            url: true,
            data: true,
            prefixText: false,
            dateFormat: false,
            status: true,
        };

        AxiosLogger.setGlobalConfig(this.defaultLoggerConfig);
    }

    private async processor<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const axiosConfig: AxiosRequestConfig = _.merge({}, this.defaultConfig, config);
        try {
            const instance = axios.create();
            instance.interceptors.request.use((request) => AxiosLogger.requestLogger(request, { ...this.defaultLoggerConfig }), AxiosLogger.errorLogger);
            instance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
            return await instance.request(axiosConfig);
        } catch (error) {
            return error.response ? error.response : error;
        }
    }

    protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.processor({ ...config, url, method: "GET" });
    }

    protected async post<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.processor({ ...config, data, url, method: "POST" });
    }

    protected async put<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.processor({ ...config, data, url, method: "PUT" });
    }

    protected async patch<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.processor({ ...config, data, url, method: "PATCH" });
    }

    protected async delete<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.processor({ ...config, data, url, method: "DELETE" });
    }
}
