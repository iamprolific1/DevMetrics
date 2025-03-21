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
            const response = await axiosInstance.get("/auth/validate");
            console.log("Response: ", response?.data);

            if (response.status === 200) {
                const { redirect } = response.data;
                showToast("Authentication Successful!!. Welcome back.", "success", {
                    vertical: "top",
                    horizontal: "center"
                });
                setTimeout(()=> {
                    router.push(redirect);
                }, 1000)
            }
        } catch (error: any) {
            console.error("Error authenticating user: ", error);

            const status = error.response?.status;

            if (status === 401) {
                showToast("Your session has expired. Please log in again.", "error", {
                    vertical: "top",
                    horizontal: "center",
                });
                setTimeout(()=> {
                    router.push("/login");
                }, 1000);
            } else if (status === 404) {
                showToast(
                    "Looks like you’re new here! Let’s get you set up.",
                    "info",
                    {
                        vertical: "top",
                        horizontal: "center",
                    }
                );
                setTimeout(()=> {
                    router.push("/onboarding");
                }, 1000);
            } else {
                showToast("Login failed. Please try again.", "error", {
                    vertical: "top",
                    horizontal: "center",
                });
            }
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
                >
                    { isLoading ? <><CircularProgress sx={{
                        color: 'white'
                    }} size={20} /> Authenticating...</> : <><LockOpenIcon style={{ fontSize: 20 }} /> Unlock Your Productivity</>}
                </button>
            </motion.div>
        </>
    );
}