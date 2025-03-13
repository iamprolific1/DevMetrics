"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Profile1 from '@/public/profile-1.jpg';
import Profile2 from '@/public/profile-11.jpg';
import Profile3 from '@/public/profile-15.jpg'

const testimonials = [
    {
        name: 'Jane Doe',
        role: 'Senior Developer @ TechCorp',
        image: Profile1,
        feedback: 'DevMetrics has transformed the way I track my GitHub activity. The analytics are top-notch!',
    },
    {
        name: 'John Smith',
        role: 'Open Source Contributor',
        image: Profile2,
        feedback: 'Finally, a tool that gives me deep insights into my coding habits. Highly recommended!',
    },
    {
        name: 'Alice Johnson',
        role: 'Software Engineer @ StartUpX',
        image: Profile3,
        feedback: 'The code quality tracking feature is a game changer for my workflow.',
    },
];


export default function TestimonialSection() {
    return (
        <section className='py-20 bg-[#0D1117] text-white text-center'>
            <h2
                className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6'
            >
                What Developers Say
            </h2>
            <p className='text-gray-400 mb-12 max-w-2xl mx-auto'>
                Trusted by developers worldwide to track productivity, improve code quality, and stay on top of their projects.
            </p>
            <div className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        className='p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 backdrop-blur-lg'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2, type: 'tween' }}
                    >
                        <div className='flex flex-col items-center text-center'>
                            <Image
                                src={testimonial.image}
                                width={80}
                                height={80}
                                alt={testimonial.name}
                                className='rounded-full border-4 border-blue-500 shadow-lg mb-4'
                            />
                            <p className='text-gray-300 italic'>{testimonial.feedback}</p>
                            <h4 className='mt-4 text-lg font-semibold text-blue-400'>{testimonial.name}</h4>
                            <span className='text-sm text-gray-500'>{testimonial.role}</span>
                        </div>

                    </motion.div>
                ))}
            </div>
        </section>
    );
}