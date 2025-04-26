"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/app/api/axiosInstance";
import { setAxiosInterceptors } from "@/app/api/axiosInstance";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/ui/loader";

interface AuthContextType {
  loading: boolean;
  setLoading: (state: boolean) => void;
  user: any | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/auth/me");
      console.log(data.user);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { refreshToken, ...userWithoutRefreshToken } = data.user;
      setUser(userWithoutRefreshToken);
    } catch (error) {
      console.error("Failed to fetch user: ", error);
      setUser(null);
    } finally {
      setTimeout(() => setLoading(false), 100);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(()=> {
    setAxiosInterceptors(setLoading);
  }, []);

  //Redirect unauthenticated users after loading completes
  useEffect(() => {
    const hasFetched = loading === false;
    if (hasFetched && user === null) {
      // showToast("user is not authenticated", "info", {
      //   vertical: "top",
      //   horizontal: "center"
      // })
      console.log("Redirecting user to login page");
      router.replace("/login");
    }
  }, [loading, user, router]);

  const logout = () => {
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setLoading,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {loading ? <Loader /> : children}{" "}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
