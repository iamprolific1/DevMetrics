"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import SecureLogin from "@/public/secure_login.svg";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CircularProgress from "@mui/material/CircularProgress";
import axiosInstance from "@/app/api/axiosInstance";
import { useToast } from "../providers/Toast/Toast";

export default function Login() {
    const router = useRouter();
    const { showToast } = useToast();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        setIsLoading(true);
        

        try {
            // Try to validate access token (if available)
            const response = await axiosInstance.get('/auth/validate');
            console.log("Response: ", response?.data);

            if(response.status === 200) {
                const { redirect } = response.data;

                showToast("Welcome Back! Authentication Successful.", "success", {
                    vertical: "top",
                    horizontal: "center",
                });
                setTimeout(()=> {
                    router.push(redirect);
                }, 1000);
                return;
            }
        } catch (error: any) {
            const status = error?.response?.status;
            console.warn("No valid token found. Status: ", status);

            // if token not found or is expired
            if (status === 401 || status === 404) {
                showToast("Welcome Back! Authentication Successful.", "success", {
                    vertical: "top",
                    horizontal: "center",
                });

                setTimeout(()=> {
                    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/github`);
                }, 1000)
            } else {
                // fallback error
                showToast("An unexpected error occured. Please try again.", "error", {
                    vertical: "top",
                    horizontal: "center"
                });
            }

            console.error("An unexpected error occured. Please try again.", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-1/2 hidden md:block"
            >
                <Image src={SecureLogin} alt="Secure Login" width={400} height={400} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2 text-center"
            >
                <h2 className="text-3xl font-bold mb-4">Welcome to DevMetrics</h2>
                <p className="text-gray-400 mb-6">Track your GitHub activity effortlessly.</p>

                <button 
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center cursor-pointer gap-2 py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition transform duration-300 text-white font-semibold shadow-lg"
                    disabled={isLoading}
                >
                    { isLoading ? <><CircularProgress sx={{
                        color: 'white'
                    }} size={20} /> Authenticating...</> : <><LockOpenIcon style={{ fontSize: 20 }} /> Unlock Your Productivity</>}
                </button>
            </motion.div>
        </>
    );
}