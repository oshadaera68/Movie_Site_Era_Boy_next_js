/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { posts } from "@/data/posts";

export default async function LanguagePage({
    params,
}: {
    params: { lang: string };
}) {
    const { lang } = params;

    // Map language codes to display names
    const languageMap: Record<string, string> = {
        en: "English",
        mal: "Malayalam",

    };

    const languageName = languageMap[lang] || lang;

    // Filter posts by language
    const filteredPosts = posts.filter(
        (post) => post.language.toLowerCase() === languageName.toLowerCase()
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#050505]">
            <Header />
            <Navbar />

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-yellow-600/10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600/20 to-yellow-600/20 rounded-full border border-red-500/30 mb-4">
                            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-bold text-gray-300">Language Filter</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500">
                            {languageName} Subtitles
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Showing all {languageName} subtitle downloads
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Feed */}
                    <section className="lg:col-span-2 space-y-6">

                        {/* Stats Bar */}
                        <div className="bg-[#121212] border border-white/5 rounded-xl p-4 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-red-600 to-yellow-600 rounded-lg">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Results</p>
                                        <p className="text-2xl font-bold text-white">{filteredPosts.length}</p>
                                    </div>
                                </div>

                                <a
                                    href="/"
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg text-sm font-semibold transition-all duration-300 border border-white/10"
                                >
                                    ← Back to All
                                </a>
                            </div>
                        </div>

                        {/* Posts */}
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
                                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 mb-3">
                                        No {languageName} Subtitles Yet
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        We don&#39;t have any {languageName} subtitles available at the moment
                                    </p>
                                    <a href="/"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/50"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Back to Home
                                    </a>
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