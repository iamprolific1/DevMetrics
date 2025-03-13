"use client";

import { ChevronDown } from "lucide-react";

const faqs = [
    { question: 'What is DevMetrics?', answer: 'DevMetrics is a developer analytics platform that helps track GitHub activity, code quality, and productivity.' },
    { question: 'Is there a free plan?', answer: 'Yes! We offer a free plan with limited features so you can try out DevMetrics before upgrading.' },
    { question: 'Can I cancel my subscription anytime?', answer: 'Absolutely! You can cancel your subscription anytime with no extra charges.' },
];

export default function FAQSection() {
    return (
        <section className="py-20 bg-[#0D1117] text-gray-200 px-2">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-700 py-4">
                        <details className="group">
                            <summary className="flex justify-between items-center cursor-pointer text-white font-medium hover:text-blue-400">
                                {faq.question}
                                <ChevronDown className="group-open:rotate-180 transition-transform" />
                            </summary>
                            <p className="mt-2 text-gray-400">{faq.answer}</p>
                        </details>
                    </div>
                ))}
            </div>

        </section>
    )
}