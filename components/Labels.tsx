"use client";

import Link from "next/link";
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

    // Count posts by year
    const yearCounts = posts.reduce((acc, post) => {
        const year = post.releaseDate.split(' ').pop();
        if (year) {
            acc[year] = (acc[year] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    // Count posts by subtitle site
    const subtitleSiteCounts = posts.reduce((acc, post) => {
        const site = post.subtitleSite;
        acc[site] = (acc[site] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Build dynamic labels array with sections
    const labels = [
        { name: "All Subtitles", count: totalDownloads, isHeader: false, link: "/" },
        { name: "By Year", count: Object.keys(yearCounts).length, isHeader: true, link: null },
        ...Object.entries(yearCounts).map(([year, count]) => ({
            name: year,
            count: count,
            isHeader: false,
            link: `/labels/${year}`
        })),
        { name: "By Language", count: Object.keys(languageCounts).length, isHeader: true, link: null },
        ...Object.entries(languageCounts).map(([lang, count]) => ({
            name: lang,
            count: count,
            isHeader: false,
            link: `/labels/${lang.toLowerCase()}`
        })),
        { name: "By Subtitle Site", count: Object.keys(subtitleSiteCounts).length, isHeader: true, link: null },
        ...Object.entries(subtitleSiteCounts).map(([site, count]) => ({
            name: site,
            count: count,
            isHeader: false,
            link: `/labels/${site.toLowerCase().replace(/\./g, '-')}`
        })),
        { name: "By Quality", count: Object.keys(categoryCounts).length, isHeader: true, link: null },
        ...Object.entries(categoryCounts).map(([category, count]) => ({
            name: category.charAt(0).toUpperCase() + category.slice(1),
            count: count,
            isHeader: false,
            link: `/labels/${category.toLowerCase()}`
        })),
    ];

    return (
        <div className="bg-black/60 p-4 rounded">
            <h3 className="font-bold mb-3">Labels</h3>

            {labels.map((label) => {
                // If it's a header, just render text
                if (label.isHeader) {
                    return (
                        <div
                            key={label.name}
                            className="text-red-400 font-bold mt-2 py-1"
                        >
                            {label.name}
                        </div>
                    );
                }

                // If it has a link, make it clickable
                return (
                    <Link
                        key={label.name}
                        href={label.link || "#"}
                        className="flex justify-between py-1 text-sm hover:text-red-500 cursor-pointer transition-colors group"
                    >
                        <span className="group-hover:translate-x-1 transition-transform">
                            {label.name}
                        </span>
                        <span className="bg-zinc-800 group-hover:bg-red-900/50 px-2 py-0.5 rounded text-xs font-medium transition-colors">
                            {label.count}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}