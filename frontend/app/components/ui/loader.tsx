"use client";
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <motion.div
        className="w-20 h-20 border-t-4 border-b-4 rounded-full"
        style={{
          borderColor: 'rgba(94, 234, 212, 1)',
          boxShadow: '0 0 20px rgba(94, 234, 212, 0.8)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      ></motion.div>
    </div>
  );
};

export default Loader;