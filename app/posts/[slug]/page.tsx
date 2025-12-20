import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { posts } from "@/data/posts";
import { notFound } from "next/navigation";

export default async function PostPage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}) {
    // Await params in Next.js 15
    const { slug } = await params;

    // Find the post (case-insensitive)
    const post = posts.find((p) => p.slug.toLowerCase() === slug.toLowerCase());

    // If post not found → 404
    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Header and Navbar */}
            <Header />
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Article */}
                    <article className="lg:col-span-2 bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="p-6 md:p-8">
                            <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight border-b border-white/10 pb-4">
                                {post.title}
                            </h1>

                            <div className="relative w-full flex justify-center mb-8">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={1200}
                                    height={675}
                                    className="rounded-lg shadow-2xl object-cover border border-white/10"
                                    priority
                                />
                            </div>

                            <div className="whitespace-pre-line text-gray-300 text-lg leading-relaxed mb-10 font-light">
                                {post.content}
                            </div>

                            <div className="whitespace-pre-line text-gray-300 text-lg leading-relaxed mb-10 font-light">
                                <h2>Tags:</h2> {post.tags}
                            </div>

                            {/* Styled Section Before Download */}
                            <div className="mb-8 p-6 bg-black/80 rounded-lg border-t-2 border-b-2 border-red-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                                <h2 className="text-center text-yellow-400 text-xl md:text-2xl font-bold tracking-wide">
                                    උපසිරසි ගැන්වීම : {post.subtitledBy}
                                </h2>
                            </div>

                            {/* Download Section */}
                            <div className="mt-12 p-8 bg-gradient-to-b from-zinc-800/50 to-black/50 rounded-2xl border border-red-900/20 text-center">
                                <h3 className="text-xl font-medium text-gray-200 mb-6">
                                    පහත බොත්තමෙන් සිංහල උපසිරැසිය බාගත කරගන්න
                                </h3>

                                <a
                                    href={post.downloadUrl || "#"}
                                    download
                                    className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                                >
                                    <svg
                                        className="w-6 h-6 animate-bounce"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                    </svg>
                                    DOWNLOAD SUBTITLE
                                </a>

                                <div className="mt-6 flex justify-center gap-6 text-sm text-gray-500">
                                    <span>File: ZIP / SRT</span>
                                    <span>Language: Sinhala</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-8">
                            <Sidebar />
                        </div>
                    </aside>

                </div>
            </main>

            {/* Footer */}
            <footer className="mt-20 py-10 border-t border-white/5 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} ERA BOY. All Rights Reserved.</p>
            </footer>
        </div>
    );
}