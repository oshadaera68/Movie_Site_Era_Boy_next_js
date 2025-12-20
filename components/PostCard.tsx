import Image from "next/image";
import Link from "next/link";

interface Post {
    id: number;
    slug: string;
    title: string;
    tags: string;
    excerpt: string;
    content: string;
    image: string;
    video: string;
    category: string;
    language: string;
    downloadUrl: string;
    releaseDate: string;
}

export default function PostCard({ post }: { post: Post }) {
    return (
        <div className="bg-[#121212] border border-white/5 rounded-lg overflow-hidden flex flex-col md:flex-row gap-6 p-4 hover:bg-[#1a1a1a] transition-colors shadow-xl">

            {/* Image with Red Badge */}
            <Link href={`/posts/${post.slug}`} className="relative w-full md:w-80 h-52 flex-shrink-0 group block overflow-hidden rounded">
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg border-b-2 border-red-800 uppercase">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                    </svg>
                    {post.language}
                </div>

                <div className="absolute top-3 left-30 z-10 flex items-center gap-1.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase">
                    {post.video}
                </div>

                {/* Hover Overlay with Play Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
                    <div className="transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
                            <div className="relative w-20 h-20 bg-gradient-to-r from-red-600 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/20">
                                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            {/* Text Content */}
            <div className="flex flex-col justify-between py-1">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                            {post.title}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs text-gray-500 font-medium">
              {post.releaseDate}
            </span>
                    </div>

                    <p className="text-gray-400 text-sm line-clamp-3 mb-4 font-light">
                        {post.content}
                    </p>
                </div>

                {/* This link must match your folder structure /post/[slug] */}
                <Link
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center justify-center w-max bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transition-all duration-300 active:scale-95 text-sm group"
                >
                    Read more
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}