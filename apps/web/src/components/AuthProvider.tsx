"use client";

import { User } from "@repo/common/types/user";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "ahooks";
import { isDefined } from "remeda"

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
  user?: User | null;
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
  const [user, setUser] = useLocalStorageState<User | null>("user");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const logged = isDefined(user) && isDefined(user?.role);
    setIsLoggedIn(logged);
  }, [user])

  const signIn = async (newUser: SignInInput) => {
    try {
      const response = await signInFn(newUser);
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      const response = await signOutFn();
      if (response) {
        setUser(null)
        router.replace("/auth/login");
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
