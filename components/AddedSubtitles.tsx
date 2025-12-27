import Link from 'next/link';

interface Post {
    id: number;
    title: string;
    video: string;
    language: string;
    category: string;
    releaseDate: string;
    content: string;
    tags: string;
    subtitleSite?: string;
    slug: string;
}

interface AddedSubtitlesProps {
    posts: Post[];
}

export default function AddedSubtitles({ posts }: AddedSubtitlesProps) {
    return (
        <div className="bg-gradient-to-r from-red-950/30 via-zinc-900/50 to-yellow-950/30 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400">
                            Added Subtitles:
                        </h2>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 via-transparent to-transparent"></div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {posts.slice(0, 8).map((post, index) => (
                        <Link
                            href={`/post/${post.slug}`}
                            key={post.slug}
                            className="group relative flex-shrink-0 w-48 animate-fade-in block"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-yellow-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                            <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-lg p-3 hover:border-red-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105">
                                <div className="flex items-start gap-2 mb-2">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-600 to-yellow-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                        {post.language.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-white truncate group-hover:text-red-400 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 truncate">{post.video}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                                        {post.category}
                                    </span>
                                    <span className="text-gray-600">{post.releaseDate}</span>
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