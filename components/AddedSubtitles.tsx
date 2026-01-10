import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
    video: string;
    language: string;
    category: string;
    date?: string;
    content: string;
    tags: string;
    subtitleSite?: string;
}

interface AddedSubtitlesProps {
    posts: Post[];
}

export default function AddedSubtitles({ posts }: AddedSubtitlesProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };
    return (
        <div className="bg-gradient-to-r from-red-950/30 via-zinc-900/50 to-yellow-950/30 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-2 rounded-md">
                        <h2 className="text-lg font-bold text-black">
                            Added Subtitles
                        </h2>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="group p-2 bg-zinc-800/60 hover:bg-zinc-700/80 border border-white/10 rounded-lg transition-all duration-300"
                            aria-label="Scroll left"
                        >
                            <svg
                                className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="group p-2 bg-zinc-800/60 hover:bg-zinc-700/80 border border-white/10 rounded-lg transition-all duration-300"
                            aria-label="Scroll right"
                        >
                            <svg
                                className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {posts.slice(0, 8).map((post, index) => (
                        <Link
                            href={`/post/${post.id}`}
                            key={post.id}
                            className="group relative flex-shrink-0 animate-fade-in block"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="relative bg-zinc-800/60 backdrop-blur-sm border border-white/5 rounded px-4 py-2 hover:bg-zinc-700/60 transition-all duration-300 cursor-pointer group/item">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        {post.video?.toLowerCase().includes('cam') && (
                                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse group-hover/item:animate-none group-hover/item:bg-red-500 transition-colors z-10">
                                                CAM
                                            </span>
                                        )}
                                        <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded flex items-center justify-center text-black text-xs font-bold">
                                            {post.language.slice(0, 2).toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                                            {post.title}
                                        </h3>
                                    </div>
                                    <span className="flex-shrink-0 text-xs text-gray-500 font-medium">
                                        {post.date}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}