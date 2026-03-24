"use client";
import { motion } from "framer-motion";

const plans = [
    {
        name: 'Free',
        price: '$0',
        features: [
            'Limited GitHub integration',
            'Basic analytics',
            'Limited storage',
            'Community support',
        ],
        button: 'Get Started',
    },
    {
        name: 'Pro',
        price: '$9/month',
        features: [
            'Unlimited GitHub activity history',
            'Advanced analytics',
            'Priority email support',
        ],
        button: 'Upgrade',
    },
    {
        name: 'Team',
        price: '$29/month',
        features: [
            'Everything in Pro',
            'Team collaboration',
            'API access for integrations',
            'Role-based access control',
        ],
        button: 'Upgrade',
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        features: [
            'Everything in Team',
            'Self-hosting option',
            'Custom integrations & SLAs',
            'Dedicated support',
        ],
        button: 'Contact Us',
    },
];


export default function PricingSection() {
    return (
        <section className="py-20 bg-[#0D1117] text-gray-200 overflow-hidden">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2 
                    className="text-4xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Choose Your Plan
                </motion.h2>
                <motion.p 
                    className="text-gray-400 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Flexible pricing that scales with your needs.
                </motion.p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                    >
                        <h3 className="text-2xl font-semibold text-white mb-4">{plan.name}</h3>
                        <p className="text-3xl font-bold text-blue-400">{plan.price}</p>
                        <ul className="mt-4 text-gray-300 space-y-2">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                    <span className="mr-2 text-emerald-400">✔</span> {feature}
                                </li>
                            ))}
                        </ul>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg"
                        >
                            {plan.button}
                        </motion.button>

                    </motion.div>
                ))}
            </div>
        </section>
    );
}