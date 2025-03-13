"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SecureLogin from "@/public/secure_login.svg";
import GitHubIcon from "@mui/icons-material/GitHub";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = async() => {
        setIsLoading(true);
    }

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
                    }} size={20} /> Authenticating...</> : <><GitHubIcon style={{ fontSize: 20 }} /> Sign In with GitHub</>}
                </button>
            </motion.div>
        </>
    );
}