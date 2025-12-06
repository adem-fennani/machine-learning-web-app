"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname.startsWith(path);
  
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                ESPRIT ML Platform
              </span>
            </Link>
          </div>
          
          <div className="flex space-x-8">
            <Link
              href="/student"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive("/student")
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              <GraduationCap className="h-5 w-5 mr-1" />
              Student Portal
            </Link>
            
            <Link
              href="/admin"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive("/admin")
                  ? "border-blue-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              <LayoutDashboard className="h-5 w-5 mr-1" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
