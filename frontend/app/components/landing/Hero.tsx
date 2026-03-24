"use client";

import Button from '../ui/button';
import { motion } from 'framer-motion';
import { Sparkles } from "lucide-react";
import FloatingGrid from "../FloatingGrid";
import "./styles.css";

export default function HeroSection() {
    return(
        <section className='relative flex flex-col items-center justify-center text-center min-h-screen bg-[#0D1117] text-white overflow-hidden px-6 md:px-12'>

            {/* Floating Grid Background */}
            <FloatingGrid />

            <motion.h1
                className='text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Supercharge Your Developer Productivity
            </motion.h1>
            <motion.p
                className='mt-4 text-lg md:text-xl text-gray-300 max-w-2xl'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                Track commits, pull requests, and contributions effortlessly with real-time insights.
            </motion.p>
            <motion.div 
                className='mt-6 flex space-x-4'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <Button className='px-6 py-3 text-lg font-medium rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out hover:shadow-blue-500/50'>
                    Get Started
                </Button>
                <Button 
                    variant="outline"
                    className='px-6 py-3 text-lg font-medium rounded-lg border border-gray-500 text-gray-300 hover:border-white hover:text-white hover:cursor-pointer transition-all duration-300 ease-in-out'
                >
                    Learn More
                </Button>
            </motion.div>
            <motion.div
                className="absolute bottom-10 flex items-center space-x-2 text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1.2 }}
            >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>AI-Powered Insights & Real-Time Analytics</span>
            </motion.div>
        </section>
    )
}