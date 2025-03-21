import axiosInstance from "@/app/api/axiosInstance";
import Cookies from "js-cookie";

interface RefreshTokenResponse {
    accessToken: string | null;
}

export const refreshAccessToken = async(): Promise<RefreshTokenResponse | undefined> => {
    try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) { 
            console.log("Refresh token not found")
            return { accessToken: null }
        };

        const response = await axiosInstance.post('/refresh', {
            refreshToken
        });

        const { accessToken } = response.data;
        if (accessToken) {
            Cookies.set('accessToken', accessToken, {
                secure: true,
                sameSite: "strict",
                
            })
            return { accessToken };
        }
        return { accessToken: null }
    } catch(error) {
        console.error("Error refreshing access token:", error);
        return { accessToken: null };
    }
}