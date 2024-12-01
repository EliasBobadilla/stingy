"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import SignIn from "./Signin";

export default function Navbar() {
  const { isLoggedIn, user, signOut } = useAuth();


  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <p className="text-white text-xl font-bold">Logo</p>
        </Link>
        <div className="flex space-x-4 items-center">
          <Link href="/">
            <p className="text-white hover:text-blue-200">Home</p>
          </Link>
          <Link href="/admin">
            <p className="text-white hover:text-blue-200">Admin</p>
          </Link>
          <Link href="/manager">
            <p className="text-white hover:text-blue-200">Manager</p>
          </Link>
          <Link href="/cto">
            <p className="text-white hover:text-blue-200">CTO</p>
          </Link>
          <Link href="/dashboard">
            <p className="text-white hover:text-blue-200">Dashboard</p>
          </Link>

          {/* Conditional rendering based on login status */}
          {isLoggedIn ? (
            <>
            <span>{user?.email}</span>
              <div>
                <Image
                  src={user?.image || "/images/default.png"} // Use default image if no image is set
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="User Avatar"
                />
              </div>
              <button
                onClick={signOut}
                className="text-white hover:text-blue-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <SignIn />
              <Link href="/auth/login">
                <p className="text-white hover:text-blue-200">Sign In</p>
              </Link>
              <Link href="/auth/register">
                <p className="text-white hover:text-blue-200">Sign Up</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
