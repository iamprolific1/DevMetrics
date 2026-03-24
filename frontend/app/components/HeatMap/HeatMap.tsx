"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const generateRandomHeatMapData = () => {
    return Array.from({ length: 7 * 5}, () => Math.floor(Math.random() * 4));
}

export default function HeatMapComponent() {

    const [data, setData] = useState<number[]>(generateRandomHeatMapData());

    useEffect(() => {
        const interval = setInterval(() => {
            setData(generateRandomHeatMapData());
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const colorScale = ["#1F2937", "#3B82F6", "#8B5CF6", "#A855F7"];

    return (
        <div className='grid grid-cols-7 gap-1 p-4 rounded-2xl bg-gray-900 shadow-lg'>
            {data.map((value, index) => (
                <motion.div
                    key={index}
                    className='w-10 h-10 rounded-md'
                    style={{ backgroundColor: colorScale[value] }}
                    initial={{ opacity: 0.6, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.2, boxShadow: "0px 0px 15px rgba(139, 92, 246, 0.8)"}}
                />

            ))}
        </div>
    )
}