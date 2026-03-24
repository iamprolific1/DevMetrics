import axiosInstance from "@/app/api/axiosInstance";

interface RefreshTokenResponse {
    accessToken: string | null;
}

export const refreshAccessToken = async(): Promise<RefreshTokenResponse> => {
    try {
        const response = await axiosInstance.get('/auth/refresh');
        const { accessToken } = response.data ?? {};
        return { accessToken: accessToken ?? null };
    } catch(error) {
        console.error("Error refreshing access token:", error);
        return { accessToken: null };
    }
}
