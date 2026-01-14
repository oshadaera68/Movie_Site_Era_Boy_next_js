// app/labels/[slug]/page.tsx

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { posts } from "@/data/posts";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function LabelPage() {
    const params = useParams();
    const slug = params.slug as string;

    // Decode the slug (e.g., "web-dl" or "2025" or "tamil")
    const decodedSlug = decodeURIComponent(slug);

    // Filter posts based on the label
    const filteredPosts = posts.filter((post) => {
        const slugLower = decodedSlug.toLowerCase();

        // Check if it matches language
        if (post.language.toLowerCase() === slugLower) {
            return true;
        }

        // Check if it matches year
        const year = post.releaseDate.split(' ').pop();
        if (year === decodedSlug) {
            return true;
        }

        // Check if it matches video quality (web-dl, camcopy)
        if (post.video.toLowerCase() === slugLower) {
            return true;
        }

        return false;
    });

    // Determine the label type and title
    const getLabelInfo = () => {
        const slugLower = decodedSlug.toLowerCase();

        // Check if it's a year
        if (/^\d{4}$/.test(decodedSlug)) {
            return {
                type: "Year",
                title: decodedSlug,
                icon: "📅"
            };
        }

        // Check if it's a video quality
        if (["web-dl", "camcopy", "bluray", "hdrip"].includes(slugLower)) {
            return {
                type: "Quality",
                title: decodedSlug.toUpperCase(),
                icon: "🎬"
            };
        }

        // Otherwise, it's a language
        return {
            type: "Language",
            title: decodedSlug.charAt(0).toUpperCase() + decodedSlug.slice(1),
            icon: "🌐"
        };
    };

    const labelInfo = getLabelInfo();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#050505]">
            <Header />
            <Navbar />

            {/* Page Header */}
            <div className="relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-yellow-600/10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Labels</span>
                            <span>/</span>
                            <span className="text-red-400">{labelInfo.type}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-4xl">{labelInfo.icon}</span>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500">
                                    {labelInfo.title}
                                </h1>
                                <p className="text-gray-400 mt-2">
                                    {filteredPosts.length} subtitle{filteredPosts.length !== 1 ? 's' : ''} found
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Posts Grid Section */}
                    <section className="lg:col-span-2">
                        {filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredPosts.map((post, index) => (
                                    <Link
                                        href={`/post/${post.id}`}
                                        key={post.id}
                                        className="group relative animate-fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        {/* Card Container */}
                                        <div className="relative bg-zinc-900/50 rounded-lg overflow-hidden border border-white/5 hover:border-red-500/50 transition-all duration-300">
                                            {/* Thumbnail Image */}
                                            <div className="relative aspect-video overflow-hidden">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />

                                                {/* Video Quality Badge */}
                                                <div className="absolute top-3 left-3">
                                                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded uppercase">
                                                        {post.video}
                                                    </span>
                                                </div>

                                                {/* Language Badge */}
                                                <div className="absolute top-3 right-3">
                                                    <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-yellow-600 text-white text-xs font-bold rounded">
                                                        {post.language}
                                                    </span>
                                                </div>

                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-4">
                                                {/* Title */}
                                                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                                                    {post.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                                    {post.content}
                                                </p>

                                                {/* Footer Info */}
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-500">{post.releaseDate}</span>
                                                    <span className="px-2 py-1 bg-zinc-800 text-gray-400 rounded">
                                                        {post.category}
                                                    </span>
                                                </div>

                                                {/* Tags */}
                                                <div className="flex gap-2 mt-3 flex-wrap">
                                                    {post.tags.split(',').slice(0, 3).map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-xs px-2 py-1 bg-zinc-800/50 text-gray-500 rounded hover:bg-red-900/30 hover:text-red-400 transition-colors"
                                                        >
                                                            #{tag.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
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
                                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 mb-3">
                                        No Subtitles Found
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        No subtitles available for this label yet.
                                    </p>
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
            `}</style>
        </div>
    );
}