"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/app/api/axiosInstance";
import { useRouter } from "next/navigation";

interface AuthContextType {
    loading: boolean;
    user: any | null;
    isAuthenticated: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUser = async()=> {
        try {
            const { data } = await axiosInstance.get('/auth/me');
            console.log(data.user);
            setUser(data.user);
        } catch (error) {
            console.error("failed to fetch user: ",error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        router.push('/login');
    };

    useEffect(()=> {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            logout,
            isAuthenticated: !!user,
        }}>
            {loading ? <div>loading...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}