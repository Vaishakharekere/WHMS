"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    // Check login status immediately
    
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    // Initial check
    checkLoginStatus();

    // Listen for storage changes (when localStorage is updated in other tabs/components)
    const handleStorageChange = (e) => {
      if (e.key === "isLoggedIn") {
        checkLoginStatus();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also set up a custom event for same-tab updates
    const handleCustomEvent = () => checkLoginStatus();
    window.addEventListener("loginStateChanged", handleCustomEvent);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginStateChanged", handleCustomEvent);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("loginStateChanged"));
    router.push("/");
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full blur-sm opacity-30"></div>
          </div>
          <div onClick={() => router.push('/')} className="cursor-pointer select-none">
<span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
WHMS
</span>
<p className="text-xs text-gray-500 font-medium">Healthcare Excellence</p>
</div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {[
            { name: "About Us", href: "/aboutus" },
            { name: "Services & Facilities", href: "/services" },
            { name: "Health Programs", href: "/health-programs" },
            { name: "Help", href: "/help" },
          ].map((item) => (
            <div
              key={item.name}
              onClick={() => item.href && router.push(item.href)}
              className="relative group hover:text-pink-600 cursor-pointer flex items-center gap-1 py-2 px-3 rounded-lg transition-all duration-300 hover:bg-pink-50"
            >
              {item.name}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}
        </nav>

        {isLoggedIn ? (
          <Button
            onClick={handleLogout}
            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => router.push("/login")}
            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
}