"use client";

import { useState } from "react";
import Link from "next/link";
import { posts } from "@/data/posts";
import { Post } from "@/lib/types";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const POSTS_PER_PAGE = 10;

export default function PostsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter posts based on search query
    const filteredPosts = posts.filter((post: Post) => {
        const query = searchQuery.toLowerCase();
        return (
            post.title.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query) ||
            post.language.toLowerCase().includes(query) ||
            post.tags.toLowerCase().includes(query) ||
            post.category.toLowerCase().includes(query) ||
            (post.subtitleSite?.toLowerCase() || '').includes(query)
        );
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#050505] text-white">
            <Header />
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                        All Subtitle Posts
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Browse through our collection of subtitled content. Use the search below to filter by title, language, or tags.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8 max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="w-full bg-zinc-900/80 border border-white/10 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosts.map((post: Post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="group"
                        >
                            <Link href={`/posts/${post.slug}`}>
                                <div className="relative h-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-red-500/50 hover:shadow-red-500/20">
                                    {/* Post Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                        
                                        {/* Language Badge */}
                                        <div className="absolute top-3 right-3">
                                            <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-yellow-600 text-white text-xs font-bold rounded-full shadow-lg">
                                                {post.language}
                                            </span>
                                        </div>

                                        {/* CAM Badge */}
                                        {post.video?.toLowerCase().includes('cam') && (
                                            <div className="absolute top-3 left-3 bg-blue-900/80 backdrop-blur-sm border border-blue-500/30 rounded-lg px-2 py-1">
                                                <span className="text-blue-300 text-xs font-medium">
                                                    CAM RIP
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Post Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                                            {post.title}
                                        </h3>
                                        
                                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                            <span>{post.releaseDate}</span>
                                            <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">
                                                {post.category}
                                            </span>
                                        </div>

                                        <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {post.tags.split(',').slice(0, 3).map((tag, index) => (
                                                <span 
                                                    key={index} 
                                                    className="text-xs px-2 py-1 bg-zinc-800 rounded-full text-gray-300"
                                                >
                                                    #{tag.trim().split(' ')[0]}
                                                </span>
                                            ))}
                                            {post.tags.split(',').length > 3 && (
                                                <span className="text-xs px-2 py-1 bg-zinc-800 rounded-full text-gray-500">
                                                    +{post.tags.split(',').length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg border border-white/10 bg-zinc-900/50 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-900/30 transition-colors"
                            >
                                Previous
                            </button>
                            
                            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            currentPage === pageNum
                                                ? 'bg-red-600 text-white'
                                                : 'bg-zinc-900/50 text-gray-300 hover:bg-zinc-800/50'
                                        } transition-colors`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg border border-white/10 bg-zinc-900/50 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-900/30 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* No Results Message */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-5xl mb-4">😕</div>
                        <h3 className="text-xl font-bold text-white mb-2">No posts found</h3>
                        <p className="text-gray-400">Try adjusting your search or filter to find what you&#39;re looking for.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
