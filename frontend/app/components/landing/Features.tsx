"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

import Performance from '@/public/performance_overview.svg';
import Integration from '@/public/version-control.svg';
import Analytics from '@/public/data-trends.svg';
import CodeReview from '@/public/code-review.svg';

const features = [
    {
        title: 'Seamless GitHub Integration',
        description: 'Connect your GitHub account and start tracking your development metrics instantly.',
        image: Integration,
    },
    {
        title: 'Comprehensive Analytics',
        description: 'Gain insights into your coding habits, productivity trends, and team contributions.',
        image: Analytics,
    },
    {
        title: 'Code Quality Tracking',
        description: 'Monitor code quality with automated analysis and ensure best practices.',
        image: CodeReview,
    },
    {
        title: 'Performance Metrics',
        description: 'Gain insights into your productivity with key performance indicators.',
        image: Performance,
    },
]
export default function FeaturesSection() {

    return (
        <section className="py-20 bg-[#0D1117] tex-gray-100">
            <div className='container mx-auto px-6 text-center'>
                <motion.h2
                    className='text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Features
                </motion.h2>
                <p className='mt-4 text-lg text-gray-300'>Empowering developers with actionable insights.</p>

                <div className='mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {features.map((feature,index) => (
                        <motion.div
                            key={index}
                            className='p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer'
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                        >
                            <div className='relative w-24 h-24 mx-auto'>
                                <Image src={feature.image} alt={feature.title} layout='fill' objectFit='contain' />
                            </div>
                            <h3 className='mt-6 text-xl font-semibold text-white'>{feature.title}</h3>
                            <p className='mt-2 text-gray-400'>{feature.description}</p>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}