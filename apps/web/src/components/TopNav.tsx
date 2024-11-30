"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import SignIn from "./Signin";

// TODO: este user debe venir del contexto de react

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  //const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  //const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false); // Track if we're on the client

  useEffect(() => {
    setIsClient(true); // Set to true after the initial render on the client
  }, []);

  useEffect(() => {
    console.log("@@@@ -->", isLoggedIn)
    console.log("@@@@ user -->", user)
  }, [isLoggedIn, user]);

  const handleSignOut = async () => {
    // Call the DELETE API route to remove the session
    const response = await fetch("http://localhost:3000/api/logout", {
      method: "DELETE",
    });

    if (response.ok) {
      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      // Redirect to the login page
      router.push("/auth/login");
    } else {
      console.error("Failed to sign out");
    }
  };

  // Only render the navbar if we're on the client
  if (!isClient) return null;

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
                onClick={handleSignOut}
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
