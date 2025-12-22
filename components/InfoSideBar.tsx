/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/

import {useState} from "react";
import {Post} from "@/lib/types";

interface InfoSideBarProps {
    director?: string;
    producer?: string;
    cast?: string;
}

export default function InfoSideBar({ director, producer, cast }: InfoSideBarProps) {

    const [post, setPost] = useState<Post | null>(null);


    return (
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-50"></div>
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
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
                    Info
                </h2>
                <div className="space-y-4">
                    {/* Director */}
                    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                        <svg
                            className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                        </svg>
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
                                Director
                            </p>
                            <p className="text-gray-200 font-medium">
                                {director || "Not Available"}
                            </p>
                        </div>
                    </div>

                    {/* Producer */}
                    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                        <svg
                            className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
                                Producer
                            </p>
                            <p className="text-gray-200 font-medium">
                                {producer || "Not Available"}
                            </p>
                        </div>
                    </div>

                    {/* Cast */}
                    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                        <svg
                            className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
                                Cast
                            </p>
                            <p className="text-gray-200 font-medium">
                                {cast || "Not Available"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}