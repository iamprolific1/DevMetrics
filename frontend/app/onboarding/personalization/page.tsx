"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

const languages = ["JavaScript", "TypeScript", "Python", "Go", "Rust", "Other"];
const frequencies = ["Daily", "Weekly", "Monthly"];

export default function OnboardingPersonalization() {

    const [language, setLanguage] = useState<string>("");
    const [frequency, setFrequency] = useState<string>("");
    const [goal, setGoal] = useState<string>("");

    const isNextDisabled = !(language && frequency && goal);

    return (
        <>
            <motion.section
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="p-8 max-w-lg mx-auto bg-gray-900 text-gray-200 rounded-xl shadow-2xl"
            >
                <h2 className="text-2xl font-bold text-white mb-4">Let`s Customize Your Experience</h2>
                <p className="text-gray-400 mb-6">Set your preferences to personalize your DevMetrics dashboard.</p>

                <label className="block mb-4">
                    <span className="text-gray-300">Preferred Language</span>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a language</option>
                        {languages.map((lang) => (
                            <option
                                key={lang}
                                value={lang}
                            >
                                {lang}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block mb-4">
                    <span className="text-gray-300">Tracking Frequency</span>
                    <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a frequency</option>
                        {frequencies.map((freq) => (
                            <option
                                key={freq}
                                value={freq}
                            >
                                {freq}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block mb-6">
                    <span className="text-gray-300">Set Weekly Coding Goal (e.g., 10 commits/week)</span>
                    <input 
                        type="number" 
                        min={1}
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="e.g., 10"
                        className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                </label>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-400">Step 3 of 4</span>
                    <button
                        disabled={isNextDisabled}
                        className={`py-2 px-4 flex items-center gap-2 rounded-lg shadow-lg transition ${
                            isNextDisabled
                            ? "bg-gray-700 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105"
                        }`}
                    >
                        Continue <ChevronRight size={18} />
                    </button>
                </div>
            </motion.section>
        </>
    );
}