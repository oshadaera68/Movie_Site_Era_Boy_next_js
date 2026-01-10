"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import InfoSideBar from "@/components/InfoSideBar";
import CommentSection from "@/components/CommentSection";
import Image from "next/image";
import {posts} from "@/data/posts";
import {notFound} from "next/navigation";
import Link from "next/link";
import {useEffect, useState} from "react";
import {Post} from "@/lib/types";
import PostNavigation from "@/components/PostNavigation";

export default function PostPage({
                                     params,
                                 }: {
    params: Promise<{ slug: string }>;
}) {
    const [slug, setSlug] = useState<string>("");
    const [post, setPost] = useState<Post | null>(null);
    const [downloadCount, setDownloadCount] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        const initPage = async () => {
            const resolvedParams = await params;
            const resolvedSlug = resolvedParams.slug;
            setSlug(resolvedSlug);

            // Find the post (case-insensitive)
            const foundPost = posts.find((p) => p.slug.toLowerCase() === resolvedSlug.toLowerCase());

            // If post not found → 404
            if (!foundPost) {
                notFound();
            }

            setPost(foundPost);
            // Default to 0 if downloadCount doesn't exist
            setDownloadCount(0);
        };

        initPage();
    }, [params]);

    const formatDownloadCount = (count: number) => {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + "M";
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1) + "K";
        }
        return count.toString();
    };

    const handleDownload = async () => {
        setIsDownloading(true);

        try {
            // Add a null check before accessing post properties
            if (!post) {
                console.error("Post data is not available");
                return;
            }

            // Increment local count immediately
            setDownloadCount((prev) => prev + 1);

            // Trigger actual download
            if (post.downloadUrl) {
                const link = document.createElement('a');
                link.href = post.downloadUrl;
                link.download = '';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            // Optional: Track download in database if you have an API
            // await fetch(`/api/posts/${slug}/download`, { method: "POST" });
        } catch (error) {
            console.error('Download failed:', error);
            // Optionally revert the count if download fails
            setDownloadCount((prev) => Math.max(0, prev - 1));
        } finally {
            setIsDownloading(false);
        }
    };

    if (!post) {
        return null;
    }

    const currentIndex = posts.findIndex(p => p.slug === slug);
    const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

    return (<div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#050505] text-white">
        {/* Header and Navbar */}
        <Header/>
        <Navbar/>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb Navigation */}
            <div className="mb-6 flex items-center gap-2 text-sm">
                <Link
                    href="/"
                    className="text-gray-500 hover:text-red-500 transition-colors"
                >
                    Home
                </Link>
                <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
                <Link
                    href="/posts"
                    className="text-gray-500 hover:text-red-500 transition-colors"
                >
                    Posts
                </Link>
                <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
                <span className="text-red-500 font-semibold line-clamp-1">
            {post.title}
          </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Article */}
                <article className="lg:col-span-2 space-y-6">
                    {/* Title Card */}
                    <div className="relative group">
                        <div
                            className="absolute -inset-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                        <div
                            className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <h1 className="text-2xl md:text-4xl font-black leading-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                                    {post.title}
                                </h1>
                                <div
                                    className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-red-600 to-yellow-600 rounded-full text-xs font-bold shadow-lg">
                                    {post.language}
                                </div>
                            </div>

                                    {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span>{post.releaseDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                        />
                                    </svg>
                                    <span>{post.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Card */}
                    <div className="relative group">
                        <div
                            className="absolute -inset-1 bg-gradient-to-r from-red-600/30 to-yellow-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <div
                            className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    {/* Content Card */}
                    <div className="relative group">
                        <div
                            className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-yellow-600/20 rounded-2xl blur opacity-50"></div>
                        <div
                            className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8">
                            <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                About This Subtitle
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none">
                                <p className="whitespace-pre-line text-gray-300 leading-relaxed font-light">
                                    {post.content}
                                </p>
                            </div>
                        </div>
                    </div>



                    {/* Tags Card */}
                    <div className="relative group">
                        <div
                            className="absolute -inset-1 bg-gradient-to-r from-yellow-600/20 to-red-600/20 rounded-2xl blur opacity-50"></div>
                        <div
                            className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6">
                            <h3 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    />
                                </svg>
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.split(",").map((tag: string, index: number) => (<span
                                    key={index}
                                    className="px-3 py-1.5 bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-red-600/20 hover:to-yellow-600/20 border border-white/10 rounded-full text-sm text-gray-300 hover:text-white transition-all duration-300 cursor-pointer hover:scale-105"
                                >
                      #{tag.trim()}
                    </span>))}
                            </div>
                        </div>
                    </div>

                    {/* CAM Badge - Industry Standard */}
                    {post.video?.toLowerCase().includes('cam') && (
                        <div className="relative group mb-6">
                            <div className="relative bg-blue-900/20 backdrop-blur-sm border border-blue-500/20 rounded-lg p-3 text-center">
            <span className="text-blue-300 text-lg font-medium tracking-wide animate-pulse">
                [මෙය දැනට නිකුත් කල ඇති Cam පිටපතකට කල උපසිරැසි ගැන්වීමකි.]
            </span>
                            </div>
                        </div>
                    )}

                    {/* Subtitled By Card */}
                    <div className="relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-yellow-500/10 to-red-600/10 animate-gradient"></div>
                        <div
                            className="relative bg-black/90 backdrop-blur-xl border-t-2 border-b-2 border-red-500 rounded-xl p-8 text-center shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                            <div className="inline-flex items-center gap-3 mb-3">
                                <div
                                    className="w-12 h-12 bg-gradient-to-r from-red-600 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-400 to-yellow-400 mb-2">
                                Subtitled By
                            </h2>
                            <p className="text-xl md:text-2xl font-bold text-white">
                                {post.subtitledBy}
                            </p>
                        </div>
                    </div>

                    {/* Subtitle Site Card */}
                    <div className="relative overflow-hidden">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-500/10 to-blue-600/10 animate-gradient"></div>
                        <div
                            className="relative bg-black/90 backdrop-blur-xl border-t-2 border-b-2 border-blue-500 rounded-xl p-8 text-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                            <div className="inline-flex items-center gap-3 mb-3">
                                <div
                                    className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-2">
                                Subtitle Source
                            </h2>
                            <p className="text-xl md:text-2xl font-bold text-white">
                                {post.subtitleSite}
                            </p>
                        </div>
                    </div>

                    {/* Download Section */}
                    <div className="relative group">
                        <div
                            className="absolute -inset-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 animate-gradient transition duration-500"></div>
                        <div
                            className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 backdrop-blur-xl border border-red-500/30 rounded-3xl overflow-hidden shadow-2xl p-8 md:p-12 text-center">
                            <div
                                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(239,68,68,0.1),transparent)]"></div>

                            <div className="relative">
                                <div
                                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-yellow-600 rounded-full mb-6 shadow-lg animate-pulse">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                    </svg>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                                    Ready to Download?
                                </h3>
                                <p className="text-gray-400 mb-6 text-lg">
                                    Get your Sinhala subtitle file instantly
                                </p>

                                {/* Download Count Display */}
                                <div className="flex items-center justify-center gap-4 mb-8">
                                    <div
                                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600/20 to-yellow-600/20 border border-red-500/30 rounded-full backdrop-blur-sm">
                                        <svg
                                            className="w-5 h-5 text-red-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                            <path
                                                fillRule="evenodd"
                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-gray-300 font-semibold">
                        <span
                            className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400">
                          {formatDownloadCount(downloadCount)}
                        </span>
                        <span className="text-sm ml-2">downloads</span>
                      </span>
                                    </div>

                                    <button
                                        onClick={handleDownload}
                                        disabled={isDownloading}
                                        className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white font-black text-lg py-5 px-12 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-[0_0_40px_rgba(220,38,38,0.5)] hover:shadow-[0_0_60px_rgba(220,38,38,0.7)] uppercase tracking-wide disabled:opacity-50 cursor-pointer disabled:hover:scale-100"
                                    >
                                        {isDownloading ? (<>
                                            <svg
                                                className="w-6 h-6 animate-spin"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="3"
                                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                />
                                            </svg>
                                            Downloading...
                                        </>) : (<>
                                            <svg
                                                className="w-6 h-6 animate-bounce"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="3"
                                                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                />
                                            </svg>
                                            Download Now
                                        </>)}
                                    </button>
                                </div>

                                <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8 text-sm">
                                    <div
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                        <svg
                                            className="w-4 h-4 text-yellow-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-gray-400 font-semibold">
                        ZIP / SRT
                      </span>
                                    </div>
                                    <div
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                        <svg
                                            className="w-4 h-4 text-green-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-gray-400 font-semibold">
                        Sinhala
                      </span>
                                    </div>
                                    <div
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                        <svg
                                            className="w-4 h-4 text-blue-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-gray-400 font-semibold">
                        Fast Download
                      </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <CommentSection postSlug={slug}/>

                    {/*Post Navigation*/}
                    <PostNavigation prevPost={prevPost} nextPost={nextPost}/>
                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-8">
                        <InfoSideBar
                            director={post?.director || ""}
                            producer={post?.producer || ""}
                            cast={post?.cast || ""}
                        />
                    </div>
                </aside>
            </div>
        </main>

        {/* Footer */}
        <footer className="mt-20 py-10 border-t border-white/5 text-center">
            <div className="max-w-7xl mx-auto px-4">
                <p className="text-gray-500 text-sm mb-2">
                    &copy; {new Date().getFullYear()} ERA BOY. All Rights Reserved.
                </p>
                <p className="text-gray-600 text-xs">
                    Providing quality subtitles for your entertainment
                </p>
            </div>
        </footer>
    </div>);
}