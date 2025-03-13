import Link from 'next/link';
import LinkedIn from '@/public/linkedin.svg';
import Github from '@/public/github.svg';
import Twitter from '@/public/twitter.svg';
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-10 mt-20 border-t border-gray-700">
            <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between'>
                <div className="mb-6 md:mb-0 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white">DevMetrics</h3>
                    <p className="text-gray-400 text-sm mt-2">Track, analyze, and optimize your development workflow.</p>
                </div>
                <div className="flex space-x-6 text-sm">
                    <Link href="/about" className="hover:text-white transition">About</Link>
                    <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
                    <Link href="/features" className="hover:text-white transition">Features</Link>
                    <Link href="/contact" className="hover:text-white transition">Contact</Link>
                </div>
                <div className="flex space-x-4 mt-6 md:mt-0">
                    <a href="#" className="hover:text-white transition">
                    <Image src={Twitter} alt="Twitter" width={24} height={24} />
                    </a>
                    <a href="#" className="hover:text-white transition">
                    <Image src={Github} alt="GitHub" width={24} height={24} />
                    </a>
                    <a href="#" className="hover:text-white transition">
                    <Image src={LinkedIn} alt="LinkedIn" width={24} height={24} />
                    </a>
                </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">© {new Date().getFullYear()} DevMetrics. All rights reserved.</p>
        </footer>
    );
}