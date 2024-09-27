import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-600 px-6 py-4 sticky top-0 shadow-lg z-50 w-full">
      {/* Left Section with Logo */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
          <span className="text-2xl font-extrabold text-gray-800">D</span>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-wide">Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-lg">
        <li>
          <Link
            href="/"
            className="text-white hover:text-yellow-300 transition-colors duration-300"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            href="/create-user"
            className="text-white hover:text-yellow-300 transition-colors duration-300"
          >
            Create User
          </Link>
        </li>
      </ul>
    </header>
  );
}
