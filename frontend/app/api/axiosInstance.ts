import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
    withCredentials: true,
});

let globalSetLoading: ((state: boolean) => void) | null = null;
export const setAxiosInterceptors = (setLoading: (state: boolean) => void) => {
    globalSetLoading = setLoading;
}

let refreshPromise: Promise<any> | null = null;

axiosInstance.interceptors.request.use(
    (config) => {
        console.log("Axios Request Config:", config);
        return config;
    },
    (error) => {
        console.error("Request Interceptor Error:", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh");

        if (error.response?.status === 401 && !originalRequest._retry && !isRefreshRequest) {
            originalRequest._retry = true;

            try {
                if (!refreshPromise) {
                    console.log("Refreshing token...");
                    refreshPromise = axiosInstance.get("/auth/refresh");
                }

                const response = await refreshPromise;
                console.log("Response: ", response.data);

                await new Promise((resolve) => setTimeout(resolve, 300));

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                if (globalSetLoading) globalSetLoading(false);

                window.location.href = "/login";
            } finally {
                refreshPromise = null;
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
