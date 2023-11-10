import axios, { CanceledError, AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
  data: T | null;
  status: number | undefined;
  error: string | null;
}

class ApiClient {
  private client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  private async request<T>(config: AxiosRequestConfig, abortSignal?: AbortSignal): Promise<ApiResponse<T>> {
    let result;
    let err;

    try {
      const response: ApiResponse<T> = await this.client({
        ...config,
        signal: abortSignal,
      });

      result = { data: response.data, error: null, status: response.status };
    } catch (error) {
      if (error instanceof CanceledError) {
        return { data: null, error: null, status: error.response?.status };
      } else {
        // @ts-ignore
        const err_message = error?.response?.data.message;
        if (err_message) {
          err = Array.isArray(err_message) ? err_message.join('\n') : err_message;
        } else if (error instanceof AxiosError) {
          if (error?.response?.status === 401) {
            err = 'Login Token expired';
          } else {
            err = error.message;
          }
        } else {
          err = 'Something went wrong';
        }
        // @ts-ignore
        result = { data: null, error: err, status: error?.response?.status };
      }
    }

    return result;
  }

  async get<T>(
    url: string,
    params?: AxiosRequestConfig['params'],
    headers?: AxiosRequestConfig['headers'],
    abortSignal?: AbortSignal,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      {
        method: 'GET',
        params,
        url,
        headers,
      },
      abortSignal,
    );
  }

  async post<T, TPayload>(
    url: string,
    data?: TPayload,
    headers?: AxiosRequestConfig['headers'],
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'POST',
      url,
      data,
      headers,
    });
  }

  async put<T, TPayload>(
    url: string,
    data?: TPayload,
    headers?: AxiosRequestConfig['headers'],
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PUT',
      url,
      data,
      headers,
    });
  }

  async delete<T>(url: string, headers?: AxiosRequestConfig['headers']): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'DELETE',
      url,
      headers,
    });
  }
}
const Index = new ApiClient();

export default Index;
