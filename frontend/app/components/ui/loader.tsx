"use client";
import { motion } from "framer-motion";

export default function DevMetricsLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 fixed z-30">
      <div className="relative w-32 h-32">
        {/* Glowing circular loader */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-0 w-full h-full border-4 border-t-transparent border-blue-500 rounded-full"
        ></motion.div>

        {/* Pulsing commit node */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-6 h-6 bg-purple-500 rounded-full shadow-xl -translate-x-1/2 -translate-y-1/2"
        ></motion.div>

        {/* DevMetrics Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm text-gray-300"
        >
          Loading DevMetrics...
        </motion.div>
      </div>
    </div>
  );
}
