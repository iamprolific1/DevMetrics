import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
    withCredentials: true,
});

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

            try {
                console.log("🔄 Refreshing token...");
                const response = await axiosInstance.get("/auth/refresh");
                console.log("accessToken: ", response);
                
                await new Promise((resolve) => setTimeout(resolve, 300));
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("🔒 Token refresh failed:", refreshError);
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
