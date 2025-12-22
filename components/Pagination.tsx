/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/

import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const getPageNumbers = () => {
        const pages = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('ellipsis');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('ellipsis');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-yellow-500/20 to-red-600/20 rounded-2xl blur opacity-50"></div>
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6">
                <div className="flex items-center justify-center gap-2 flex-wrap">

                    {/* Previous Button */}
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                            currentPage === 1
                                ? 'bg-zinc-800/50 text-gray-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/50'
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-2">
                        {getPageNumbers().map((page, index) => {
                            if (page === 'ellipsis') {
                                return (
                                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                    ...
                  </span>
                                );
                            }

                            return (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page as number)}
                                    className={`min-w-[40px] h-10 rounded-lg font-bold transition-all duration-300 ${
                                        currentPage === page
                                            ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white shadow-lg shadow-red-500/50 scale-110'
                                            : 'bg-zinc-800/50 hover:bg-zinc-700/50 text-gray-400 hover:text-white border border-white/5 hover:border-red-500/30 hover:scale-105'
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                            currentPage === totalPages
                                ? 'bg-zinc-800/50 text-gray-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/50'
                        }`}
                    >
                        Next
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Page Info */}
                <div className="mt-4 text-center">
          <span className="text-sm text-gray-400">
            Page <span className="text-red-400 font-bold">{currentPage}</span> of{' '}
              <span className="text-yellow-400 font-bold">{totalPages}</span>
          </span>
                </div>
            </div>
        </div>
    );
}