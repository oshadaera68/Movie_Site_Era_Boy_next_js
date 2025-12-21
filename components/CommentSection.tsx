/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/

"use client"
import React, { useState, useEffect, ReactElement } from 'react';

interface Comment {
    id: number;
    name: string;
    comment: string;
    timestamp: string;
    replyToId: number | null;
}

interface CommentSectionProps {
    postSlug: string;
}

export default function CommentSection({ postSlug }: CommentSectionProps): ReactElement {
    const [comments, setComments] = useState<Comment[]>([]);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyTo, setReplyTo] = useState<number | null>(null);

    // Load comments from localStorage
    useEffect(() => {
        const loadComments = () => {
            try {
                if (typeof window !== 'undefined') {
                    const storedComments = localStorage.getItem(`comments:${postSlug}`);
                    if (storedComments) {
                        setComments(JSON.parse(storedComments));
                    }
                }
            } catch (error) {
                console.log('No comments yet or error loading comments');
                setComments([]);
            }
        };
        
        loadComments();
    }, [postSlug]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim() || !comment.trim()) return;

        setIsSubmitting(true);

        const newComment = {
            id: Date.now(),
            name: name.trim(),
            comment: comment.trim(),
            timestamp: new Date().toISOString(),
            replyToId: replyTo,
        };

        const updatedComments = [...comments, newComment];

        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(`comments:${postSlug}`, JSON.stringify(updatedComments));
                setComments(updatedComments);
                setName('');
                setComment('');
                setReplyTo(null);
            }
        } catch (error) {
            console.error('Failed to save comment:', error);
            alert('Failed to post comment. Please try again.');
        }

        setIsSubmitting(false);
    };

    const handleReply = (commentId: number, commentName: string) => {
        setReplyTo(commentId);
        setComment(`@${commentName} `);
    };

    const cancelReply = () => {
        setReplyTo(null);
        setComment('');
    };

    const formatDate = (timestamp: string | number | Date) => {
        const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        return date.toLocaleDateString();
    };

    const getReplyToComment = (replyToId: number) => {
        return comments.find(c => c.id === replyToId);
    };

    const mainComments = comments.filter(c => !c.replyToId);
    const getReplies = (commentId: number) => comments.filter(c => c.replyToId === commentId);

    return (
        <div className="relative group mt-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-yellow-600/20 rounded-2xl blur opacity-50"></div>
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-yellow-600 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Comments</h2>
                        <p className="text-sm text-gray-400">{comments.length} comment{comments.length !== 1 ? 's' : ''}</p>
                    </div>
                </div>

                {/* Comment Form */}
                <div className="mb-8">
                    {replyTo && (
                        <div className="mb-3 flex items-center gap-2 text-sm bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2">
                            <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            <span className="text-yellow-500">Replying to {getReplyToComment(replyTo)?.name}</span>
                            <button
                                type="button"
                                onClick={cancelReply}
                                className="ml-auto text-gray-400 hover:text-white"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
                        />

                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your comment..."
                            rows={4}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                        />

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting || !name.trim() || !comment.trim()}
                                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Posting...
                                    </>
                                ) : (
                                    'Post Comment'
                                )}
                            </button>

                            {replyTo && (
                                <button
                                    onClick={cancelReply}
                                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                    {comments.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p className="text-gray-400 text-lg">No comments yet. Be the first to comment!</p>
                        </div>
                    ) : (
                        mainComments.map((c) => {
                            const replies = getReplies(c.id);
                            return (
                                <div key={c.id} className="space-y-4">
                                    {/* Main Comment */}
                                    <div className="bg-black/20 border border-white/5 rounded-lg p-5 hover:border-white/10 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                                                {c.name.charAt(0).toUpperCase()}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="font-semibold text-white">{c.name}</span>
                                                    <span className="text-xs text-gray-500">{formatDate(c.timestamp)}</span>
                                                </div>
                                                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                                                    {c.comment}
                                                </p>
                                                <button
                                                    onClick={() => handleReply(c.id, c.name)}
                                                    className="mt-3 flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                    </svg>
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Replies */}
                                    {replies.length > 0 && (
                                        <div className="ml-8 md:ml-14 space-y-4 border-l-2 border-yellow-600/30 pl-4">
                                            {replies.map((reply) => (
                                                <div key={reply.id} className="bg-black/20 border border-white/5 rounded-lg p-4 hover:border-white/10 transition-colors">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
                                                            {reply.name.charAt(0).toUpperCase()}
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-semibold text-white text-sm">{reply.name}</span>
                                                                <span className="text-xs text-gray-500">{formatDate(reply.timestamp)}</span>
                                                            </div>
                                                            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap break-words">
                                                                {reply.comment}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    )
}