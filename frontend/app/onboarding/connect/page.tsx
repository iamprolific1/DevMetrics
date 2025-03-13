"use client";
import { useState } from 'react';
import { motion } from "framer-motion";
import Button from "@/app/components/ui/button";
import GitHubIcon from "@mui/icons-material/GitHub";
import CircularProgress from "@mui/material/CircularProgress";
import VersionControl from "@/public/version-control.svg";
import Image from "next/image";

export default function OnboardingConnect() {

    const [isConnecting, setIsConnecting ] = useState(false);

    const handleGithubAuth = async() => {
        setIsConnecting(true);

        // setTimeout(() => {
        //   setIsConnecting(false);
        //   onNext(); // Move to the next step after successful connection
        // }, 2000);
    }

    return (
        <>
            {/* <div className="py-20"></div> */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Connect Your GitHub Account
                </h2>
                <p className="text-gray-400 mb-6">
                    To provide personalized analytics and track your GitHub activity, we require GitHub authentication.
                </p>
                <Image 
                    src={VersionControl}
                    alt="GitHub Connection"
                    width={400}
                    height={300}
                    className="mb-6 mx-auto"
                />
                <div className='flex items-center justify-between'>
                    <span className='text-gray-400'>Step 2 of 4</span>
                    <Button
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition"
                        disabled={isConnecting}
                        onClick={handleGithubAuth}
                    >
                        { isConnecting ? 
                            <>
                                <CircularProgress size={20} sx={{ color: 'white' }} /> Connecting...
                            </> 
                            : 
                            <>
                                <GitHubIcon style={{ fontSize: 20 }} /> Connect with GitHub
                            </> 
                        }
                    </Button>
                </div>
            </motion.div>
        </>
    );
}