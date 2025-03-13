import React from "react";

export default function OnboardingLayout({ children} : {
    children: React.ReactNode
}) {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 px-6 text-center">
            {children}
        </section>
    );
}