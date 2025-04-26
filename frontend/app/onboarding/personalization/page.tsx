"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, Check } from "lucide-react";
import { useAuth } from "@/app/providers/Auth/AuthProvider";
import { useToast } from "@/app/providers/Toast/Toast";
import axiosInstance from "@/app/api/axiosInstance";


const languages = ["JavaScript", "TypeScript", "Python", "Go", "Rust", "C++", "C", "Solidity", "Other"];
const frequencies = ["Daily", "Weekly", "Monthly"];

type FormDataType = {
    languages: string[],
    frequency: string,
    goal: string,
}

export default function OnboardingPersonalization() {

    const { isAuthenticated } = useAuth();
    const { showToast } = useToast();

    const searchParams = useSearchParams();
    const router = useRouter();

    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [frequency, setFrequency] = useState<string>("");
    const [goal, setGoal] = useState<string>("");

    const isNextDisabled = !(selectedLanguages.length && frequency && goal);

    const [formData, setFormData] = useState<FormDataType>({
        languages: [],
        frequency: "",
        goal: ""
    })

    const toggleLanguage = (lang: string) => {
        setSelectedLanguages((prev) => {
            const updatedLanguages = prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang];

            setFormData((prevData) => ({
                ...prevData,
                languages: updatedLanguages,
            }))

            return updatedLanguages;
        });
    };

    useEffect(()=> {
        const githubAuthenticationStatus = searchParams.get("github");
        console.log("Query parameter: ", githubAuthenticationStatus);

        if (githubAuthenticationStatus === "success") {
            console.log("Query parameter has success");
            showToast("Your GitHub account is connected successfully.", "success", {
                vertical: "top",
                horizontal: "center"
            });
            
            router.replace("/onboarding/personalization", undefined);
        }

        if (githubAuthenticationStatus === "failed") {
            console.log("Query parameter does not have success");
            showToast("Failed to connect your GitHub account.", "error", {
                vertical: "top",
                horizontal: "center"
            });

            router.replace("/onboarding/personalization", undefined);
        }
    }, [searchParams, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, 
            [name]: name === "goal" ? Number(value) : value, // ensuring the goal is stored as a number
        }))
    }

    const saveUserPreferenceData = async(e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();

        if (!formData.languages.length || !formData.frequency || !formData.goal) {
            showToast("Please complete all fields before continuing.", "error", {
                vertical: "top",
                horizontal: "center"
            });
            return;
        }

        console.log("user preferences: ", formData);
        try {
            const response = await axiosInstance.post('/user/createPreference', formData);
            if (response.status === 200) {
                showToast(response.data.message, "success", {
                    vertical: "top",
                    horizontal: "center",
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (!isAuthenticated) {
        router.push('/login');
    }

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

                <form className="w-full" onSubmit={saveUserPreferenceData}>

                    <div className="block mb-4">
                        <span className="text-gray-300">Preferred Languages</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {languages.map((lang) => (
                                <button
                                    type="button"
                                    key={lang}
                                    onClick={() => toggleLanguage(lang)}
                                    className={`px-4 py-2 rounded-lg transition text-sm font-medium shadow-md border ${
                                        selectedLanguages.includes(lang)
                                            ? "bg-blue-600 border-blue-400"
                                            : "bg-gray-800 border-gray-700"
                                    } hover:scale-105`}
                                >
                                    {lang} {selectedLanguages.includes(lang) && <Check size={16} className="inline ml-1" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label className="block mb-4">
                        <span className="text-gray-300">Tracking Frequency</span>
                        <select
                            name="frequency"
                            value={frequency}
                            onChange={(e) => {
                                setFrequency(e.target.value)
                                handleInputChange(e)
                            }}
                            className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a frequency</option>
                            {frequencies.map((freq) => (
                                <option key={freq} value={freq}>
                                    {freq}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="block mb-6">
                        <span className="text-gray-300">Set Weekly Coding Goal (e.g., 10 commits/week)</span>
                        <input
                            name="goal"
                            type="number"
                            min={1}
                            value={goal}
                            onChange={(e) => {
                                setGoal(e.target.value)
                                handleInputChange(e)
                            }}
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
                            type="submit"
                        >
                            Continue <ChevronRight size={18} />
                        </button>
                    </div>
                </form>

            </motion.section>
        </>
    );
}
