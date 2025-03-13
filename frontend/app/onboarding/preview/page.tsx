"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DataTrendSVG from "@/public/Data Trends-bro.svg";
import PerformanceTrends from "@/public/Dashboard-cuate.svg";
import Profile2 from '@/public/profile-11.jpg';
import { ArrowRight } from 'lucide-react';
import HeatMapComponent from "@/app/components/HeatMap/HeatMap";

export default function OnboardingDashboardPreview() {
    return (
        <section className="py-12 bg-gray-900 text-gray-200 flex flex-col items-center">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">You&apos;re almost there! <RocketLaunchIcon style={{ fontSize: 35 }} /> </h2>
                <p className="text-gray-400">Here&apos;s a sneek peek at the performance dashboard you&apos;ll unlock after connecting to GitHub.</p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Profile Card */}
                <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                    <h3 className="text-xl font-semibold mb-2">Your Profile</h3>
                    <Image src={Profile2} alt="Profile Image" width={150} height={150} className="rounded-full mx-auto" />
                    <p className="text-gray-300 mt-2">@JohnDoe</p>
                    <p className="text-gray-400">johndoe@gmail.com</p>
                </div>

                {/* Commit Activity Widget */}
                <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                    <h3 className="text-xl font-semibold mb-2">Commit Activity</h3>
                    <p className="text-gray-400 mb-2">Last 7 Days</p>
                    <Image src={DataTrendSVG} alt="Commit Graph" width={300} height={150} className="mx-auto" />
                </div>

                {/* Streaks Tracker */}
                <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                    <h3 className="text-xl font-semibold mb-2">Streaks & Active Days</h3>
                    <HeatMapComponent />
                </div>

                {/* Placeholder Performance Trends */}
                <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all relative">
                    <h3 className="text-xl font-semibold mb-2">Performace Trends</h3>
                    <Image src={PerformanceTrends} alt="Performance Trend" width={300} height={200} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-600 py-1 px-3 rounded-lg">Unlock this data</span>
                    </div>
                </div>

            </motion.div>

            <div className="flex items-center justify-between w-full mt-4">
                <span className="text-gray-400">Step 4 0f 4</span>
                <motion.button
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:scale-105 transition"
                    whileHover={{ scale: 1.1 }}
                >
                    Complete Setup <ArrowRight size={20} />
                </motion.button>
            </div>
        </section>
    );
}