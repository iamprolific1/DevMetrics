"use client";
import Link from 'next/link';
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import styles from "./Navbar.module.css"
export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [theme, setTheme] = useState<string>('dark');

    // useEffect(() => {
    //     const storedTheme = localStorage.getItem('theme');
    //     if (storedTheme) {
    //     setTheme(storedTheme);
    //     document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    //     }
    // }, []);

    const handleToggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
    }

    return (
        <nav 
            className={`fixed top-0 left-0 w-full z-50 bg-opacity-30 backdrop-blur-lg bg-gray-900/50 border-b border-gray-700 px-6 md:px-12 py-4 flex items-center justify-between ${styles.nav}`}
        >
            {/* Logo */}
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                DevMetrics
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items:center space-x-6 text-gray-300">
                <a href="#" className="hover:text-white transition">Home</a>
                <a href="#" className="hover:text-white transition">Features</a>
                <a href="#" className="hover:text-white transition">Pricing</a>
                <a href="#" className="hover:text-white transition">Contact</a>
            </div>

            {/* Dark Mode Toggle */}
            <div onClick={handleToggleTheme} className="hidden md:flex p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-gray-300">
                { theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex space-x-4">
                <Link href="/login">
                    <button className="px-4 py-2 text-gray-300 border border-gray-500 rounded-lg hover:bg-gray-800 transition">Sign In</button>
                </Link>
                <Link href="/onboarding">
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:scale-105 transition">Get Started</button>
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-300" onClick={() => setIsOpen(!isOpen)}>
                { isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu */}
            { isOpen && (
                <div className="absolute top-16 left-0 w-full bg-gray-900 backdrop-blur-md text-gray-300 flex flex-col items-center space-y-6 py-6 md:hidden">
                    <a href="#" className="hover:text-white transition">Home</a>
                    <a href="#" className="hover:text-white transition">Features</a>
                    <a href="#" className="hover:text-white transition">Pricing</a>
                    <a href="#" className="hover:text-white transition">Contact</a>
                    <button className="px-4 py-2 border border-gray-500 rounded-lg hover:bg-gray-800 transition">Sign In</button>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:scale-105 transition">Get Started</button>

                    {/* Dark Mode Toggle */}
                    <button onClick={handleToggleTheme} className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-gray-300">
                        { theme === 'dark'? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            )}

        </nav>
    );
}