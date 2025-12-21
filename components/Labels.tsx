"use client";

import { posts } from "@/data/posts";

export default function Labels() {
    // Count total downloads (total posts)
    const totalDownloads = posts.length;

    // Count posts by language
    const languageCounts = posts.reduce((acc, post) => {
        const lang = post.language;
        acc[lang] = (acc[lang] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Count posts by category
    const categoryCounts = posts.reduce((acc, post) => {
        const category = post.video;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Build dynamic labels array
    const labels = [
        { name: "All Subtitles", count: totalDownloads },
        ...Object.entries(languageCounts).map(([lang, count]) => ({
            name: lang,
            count: count,
        })),
        ...Object.entries(categoryCounts).map(([category, count]) => ({
            name: category.charAt(0).toUpperCase() + category.slice(1),
            count: count,
        })),
    ];

    return (
        <div className="bg-black/60 p-4 rounded">
            <h3 className="font-bold mb-3">Labels</h3>

            {labels.map((label) => (
                <div
                    key={label.name}
                    className="flex justify-between py-1 text-sm hover:text-red-500 transition-colors cursor-pointer"
                >
                    <span>{label.name}</span>
                    <span className="bg-zinc-800 px-2 py-0.5 rounded text-xs font-medium">
            {label.count}
          </span>
                </div>
            ))}
        </div>
    );
}