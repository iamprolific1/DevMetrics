"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import WelcomeImage from "@/public/welcome.svg";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
export default function OnboardingWelcome() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Welcome to DevMetrics <RocketLaunchIcon style={{ fontSize: 35 }} />
                </h1>
                <p className="text-lg text-gray-400 mb-8">
                    Track your GitHub activity, analyze your contributions, and improve your productivity effortlessly.
                </p>
                <Image
                    src={WelcomeImage}
                    alt="Welcome Image"
                    width={400}
                    height={300}
                    className="mx-auto mb-6"
                />
                <div className="flex items-center justify-between">
                    <span className="text-gray-400">Step 1 of 4</span>
                    <Link href="/onboarding/connect">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg transition"
                        >
                            Get Started
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </>
    );
}