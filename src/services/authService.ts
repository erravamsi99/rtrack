import {AxiosResponse} from "axios";
import api from "./apiService";
import envUrls from "../utils/apiConfig";
interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

class AuthService {
  getUserSession = async (): Promise<AxiosResponse<any>> => {
    const response = await api.get(envUrls.apis.session);
    if (!response) throw new Error("Failed to fetch session details");
    return response;
  };

  login = async (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@righttrack.com' && password === 'password123') {
          resolve({
            data: {
              success: true,
              token: 'fake-jwt-token-12345',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as any,
          });
        } else {
          resolve({
            data: {
              success: false,
              message: 'Invalid credentials',
            },
            status: 401,
            statusText: 'Unauthorized',
            headers: {},
            config: {} as any,
          });
        }
      }, 1000);
    });
  };

  logout = async (): Promise<AxiosResponse<any>> => {
    document.cookie = 'session-name=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    return new Promise((resolve) => {
      resolve({
        data: {
          success: true,
          message: 'Logged out successfully',
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });
    });
  };
}

export const authService: AuthService = new AuthService();