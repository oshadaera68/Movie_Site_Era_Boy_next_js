"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import posts from "@/data/posts";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter posts based on search query
    const filteredPosts = posts.filter((post) => {
        const query = searchQuery.toLowerCase();
        return (
            post.title.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query) ||
            post.language.toLowerCase().includes(query) ||
            post.tags.toLowerCase().includes(query) ||
            post.video.toLowerCase().includes(query) ||
            post.category.toLowerCase().includes(query)
        );
    });

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Header />
            <Navbar />

            {/* Centering Wrapper */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Feed */}
                    <section className="lg:col-span-2 space-y-6">

                        {/* Search Bar */}
                        <div className="bg-[#121212] border border-white/5 rounded-lg p-4 shadow-xl mb-6">
                            <div className="relative">
                                <svg
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search by title, language, tags, or content..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#1a1a1a] text-white placeholder-gray-500 border border-white/10 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Search Results Count */}
                            {searchQuery && (
                                <div className="mt-3 text-sm text-gray-400">
                                    Found {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
                                </div>
                            )}
                        </div>

                        {/* Posts */}
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))
                        ) : (
                            <div className="bg-[#121212] border border-white/5 rounded-lg p-12 text-center">
                                <svg
                                    className="w-16 h-16 text-gray-600 mx-auto mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="text-xl font-bold text-gray-400 mb-2">No results found</h3>
                                <p className="text-gray-600">Try searching with different keywords</p>
                            </div>
                        )}
                    </section>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <Sidebar />
                    </aside>
                </div>
            </main>
        </div>
    );
}