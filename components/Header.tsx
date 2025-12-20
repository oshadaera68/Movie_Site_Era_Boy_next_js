"use client";

import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Header() {
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState("English");

    const languages = [
        { code: "en", name: "English", flag: "🇬🇧" },
        { code: "si", name: "Malayalam", flag: "🇱🇰" },
    ];

    const socialLinks = [
        { icon: Facebook, href: "https://facebook.com", color: "hover:text-blue-500" },
        { icon: Twitter, href: "https://twitter.com", color: "hover:text-sky-400" },
        { icon: Instagram, href: "https://instagram.com", color: "hover:text-pink-500" },
        { icon: Youtube, href: "https://youtube.com", color: "hover:text-red-500" },
    ];

    const handleLanguageSelect = (langName: string) => {
        setSelectedLang(langName);
        setIsLangMenuOpen(false);
    };

    return (
        <header className="relative bg-gradient-to-r from-black via-zinc-900 to-black border-b border-white/10">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-yellow-500/5 to-red-600/5 animate-gradient pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">

                    {/* Logo Section */}
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative bg-gradient-to-r from-red-600 to-yellow-600 p-2 rounded-lg shadow-xl">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black italic bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                            Era Boy
                        </h1>
                    </Link>

                    {/* Right Section */}
                    <div className="flex items-center gap-4 md:gap-6">

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 group"
                            >
                                <Globe className="w-4 h-4 text-yellow-500 group-hover:rotate-12 transition-transform" />
                                <span className="hidden md:inline text-sm font-semibold text-gray-300">
                  {selectedLang}
                </span>
                                <ChevronDown
                                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                                        isLangMenuOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* Language Dropdown */}
                            {isLangMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsLangMenuOpen(false)}
                                    ></div>
                                    <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20 animate-fade-in">
                                        {languages.map((lang, index) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageSelect(lang.name)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                                                    selectedLang === lang.name
                                                        ? "bg-gradient-to-r from-red-600/20 to-yellow-600/20 text-white border-l-2 border-red-500"
                                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                                }`}
                                                style={{ animationDelay: `${index * 0.05}s` }}
                                            >
                                                <span className="text-xl">{lang.flag}</span>
                                                <span className="text-sm font-medium">{lang.name}</span>
                                                {selectedLang === lang.name && (
                                                    <svg className="w-4 h-4 ml-auto text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Social Media Links */}
                        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/10">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-full text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/10 hover:scale-110 active:scale-95`}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>

                        {/* Mobile Social Menu Button */}
                        <button className="md:hidden p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
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
                    animation: gradient 5s ease infinite;
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </header>
    );
}