import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
    withCredentials: true,
});

let globalSetLoading: ((state: boolean) => void) | null = null;
export const setAxiosInterceptors = (setLoading: (state: boolean) => void) => {
    globalSetLoading = setLoading;
}

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

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Check if refreshToken exists in cookies first
            const getCookie = (name: string) => {
                const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
                return match ? match[2] : null;
            };

            const refreshToken = getCookie("refreshToken");
            const accessToken = getCookie("accessToken");

            if (!refreshToken || !accessToken) {
                console.warn("Refresh token is missing. Aborting refresh attempt.");
                return Promise.reject(error);
            }

            try {
                console.log("Refreshing token...");
                const response = await axiosInstance.get("/auth/refresh");
                console.log("Response: ", response.data)

                await new Promise((resolve) => setTimeout(resolve, 300));

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                if (globalSetLoading) globalSetLoading(false);

                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
