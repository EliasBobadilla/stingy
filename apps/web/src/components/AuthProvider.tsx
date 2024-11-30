"use client";

import { User } from "@/models/user";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

type SignInInput = {
  email: string;
  password: string;
};

async function signInFn(user: SignInInput): Promise<User> {
  const data = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(user),
  });
  return await data.json();
}

const signOutFn = async (): Promise<boolean> => {
  const response = await fetch("/api/logout", {
    method: "DELETE",
  });

  return response.ok;
};

type Authorization = {
  isLoggedIn: boolean;
  user: User | null;
  signIn: (user: SignInInput) => Promise<void>;
  signOut: () => Promise<void>;
};

const INITIAL_STATE: Authorization = {
  isLoggedIn: false,
  user: null,
   
  signIn: async () => Promise.resolve(),
  signOut: async () => Promise.resolve(),
};

const AuthContext = createContext<Authorization>(INITIAL_STATE);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = useRouter();

  const signIn = async (newUser: SignInInput) => {
    try {
      const response = await signInFn(newUser);
      setUser(response);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      const response = await signOutFn();
      if (response) {
        // Clear localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // Redirect to the login page
        router.push("/auth/login");
      } else {
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value: Authorization = {
    user,
    isLoggedIn,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
