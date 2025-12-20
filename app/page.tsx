"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import posts from "@/data/posts";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");

    // Get unique languages from posts
    const languages = ['All', ...Array.from(new Set(posts.map(post => post.language)))];

    // Filter posts based on search query and selected filter
    const filteredPosts = posts.filter((post) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            post.title.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query) ||
            post.language.toLowerCase().includes(query) ||
            post.tags.toLowerCase().includes(query) ||
            post.video.toLowerCase().includes(query) ||
            post.category.toLowerCase().includes(query);

        const matchesFilter = selectedFilter === "All" || post.language === selectedFilter;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#050505]">
            <Header />
            <Navbar />

            {/* Hero Section with Gradient */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-yellow-600/10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 animate-pulse">
                            Discover Subtitles
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Your ultimate destination for high-quality Sinhala subtitles
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Feed */}
                    <section className="lg:col-span-2 space-y-6">

                        {/* Modern Search Bar */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                                        <svg
                                            className="w-6 h-6 text-red-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.5"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search movies, languages, or keywords..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-black/50 text-white placeholder-gray-500 border border-white/20 rounded-xl pl-14 pr-14 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-red-500/50"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors hover:rotate-90 duration-300"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {/* Search Results Count with Animation */}
                                {searchQuery && (
                                    <div className="mt-4 flex items-center gap-3 text-sm animate-fade-in">
                                        <div className="flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-yellow-600/20 px-4 py-2 rounded-full border border-red-500/30">
                                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                                            </svg>
                                            <span className="text-gray-300 font-medium">
                                                {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        <span className="text-gray-500">for</span>
                                        <span className="text-red-400 font-semibold">&#34;{searchQuery}&ldquo;</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Filter Pills */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {languages.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedFilter(filter)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border whitespace-nowrap hover:scale-105 active:scale-95 ${
                                        selectedFilter === filter
                                            ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white border-transparent shadow-lg shadow-red-500/50'
                                            : 'bg-zinc-900/50 hover:bg-gradient-to-r hover:from-red-600 hover:to-yellow-600 text-gray-400 hover:text-white border-white/5 hover:border-transparent'
                                    }`}
                                >
                                    {filter}
                                    {selectedFilter === filter && (
                                        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-white/20 rounded-full text-xs">
                                            ✓
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Posts Grid */}
                        {filteredPosts.length > 0 ? (
                            <div className="space-y-6">
                                {filteredPosts.map((post, index) => (
                                    <div
                                        key={post.id}
                                        className="animate-fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <PostCard post={post} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-yellow-600/20 rounded-2xl blur"></div>
                                <div className="relative bg-[#0f0f0f] border border-white/10 rounded-2xl p-16 text-center backdrop-blur-xl">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-32 h-32 bg-gradient-to-r from-red-600/20 to-yellow-600/20 rounded-full blur-3xl"></div>
                                        </div>
                                        <svg
                                            className="relative w-20 h-20 text-gray-700 mx-auto mb-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 mb-3">
                                        No Results Found
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        We couldn&#39;t find any subtitles matching your search
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedFilter("All");
                                        }}
                                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/50"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            <Sidebar />
                        </div>
                    </aside>
                </div>
            </main>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}