/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/

import Link from 'next/link';
import Image from 'next/image';

interface Post {
    id: number;
    slug: string;
    title: string;
    image: string;
    language: string;
}

interface PostNavigationProps {
    prevPost: Post | null;
    nextPost: Post | null;
}

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Post */}
            <div className="relative group">
                {prevPost ? (
                    <Link href={`/posts/${prevPost.slug}`}>
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/30 to-yellow-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 hover:border-red-500/30 transition-all duration-300">
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="font-semibold">Previous Post</span>
                            </div>

                            <div className="flex gap-4">
                                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                    <Image
                                        src={prevPost.image}
                                        alt={prevPost.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                                        {prevPost.language}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-bold line-clamp-2 mb-2 group-hover:text-red-400 transition-colors">
                                        {prevPost.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <span>Read more</span>
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden p-6 opacity-50">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-semibold">No Previous Post</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Next Post */}
            <div className="relative group">
                {nextPost ? (
                    <Link href={`/posts/${nextPost.slug}`}>
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600/30 to-red-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 hover:border-yellow-500/30 transition-all duration-300">
                            <div className="flex items-center justify-end gap-2 text-sm text-gray-500 mb-3">
                                <span className="font-semibold">Next Post</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 min-w-0 text-right">
                                    <h3 className="text-white font-bold line-clamp-2 mb-2 group-hover:text-yellow-400 transition-colors">
                                        {nextPost.title}
                                    </h3>
                                    <div className="flex items-center justify-end gap-2 text-xs text-gray-400">
                                        <span>Read more</span>
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                    <Image
                                        src={nextPost.image}
                                        alt={nextPost.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-2 right-2 bg-yellow-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                                        {nextPost.language}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden p-6 opacity-50">
                        <div className="flex items-center justify-end gap-2 text-sm text-gray-600 mb-3">
                            <span className="font-semibold">No Next Post</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}