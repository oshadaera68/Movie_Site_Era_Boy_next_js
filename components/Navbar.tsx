"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/", icon: "🏠" },
        { name: "Subtitles", href: "/subtitles", icon: "📝" },
        { name: "Downloads", href: "/downloads", icon: "⬇️" },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="relative bg-gradient-to-r from-black via-zinc-900 to-black border-b border-white/10 shadow-2xl">
            {/* Animated gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 animate-gradient"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative group px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                                    isActive(item.href)
                                        ? "text-white bg-gradient-to-r from-red-600 to-yellow-600 shadow-lg shadow-red-500/50"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                {/* Hover glow effect */}
                                {!isActive(item.href) && (
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600/0 via-yellow-500/0 to-red-600/0 group-hover:from-red-600/20 group-hover:via-yellow-500/20 group-hover:to-red-600/20 transition-all duration-300 blur"></div>
                                )}

                                <span className="relative flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                                    {item.name}
                </span>

                                {/* Active indicator */}
                                {isActive(item.href) && (
                                    <div className="absolute -bottom-[17px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full shadow-lg shadow-red-500/50 animate-pulse"></div>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right side - Stats or Info */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/10 to-yellow-600/10 rounded-full border border-red-500/20">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                            <span className="text-xs font-semibold text-gray-400">
                Live Updates
              </span>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                        <svg
                            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-4 py-4 space-y-2 bg-black/50 backdrop-blur-xl border-t border-white/5">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-lg text-sm font-bold transition-all duration-300 transform ${
                                isActive(item.href)
                                    ? "text-white bg-gradient-to-r from-red-600 to-yellow-600 shadow-lg shadow-red-500/30 scale-105"
                                    : "text-gray-400 hover:text-white hover:bg-white/5 hover:scale-105"
                            }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
              <span className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                  {item.name}
                  {isActive(item.href) && (
                      <span className="ml-auto">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  )}
              </span>
                        </Link>
                    ))}

                    {/* Mobile Stats */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/10 to-yellow-600/10 rounded-full border border-red-500/20">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                            <span className="text-xs font-semibold text-gray-400">
                Live Updates Active
              </span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
        </nav>
    );
}