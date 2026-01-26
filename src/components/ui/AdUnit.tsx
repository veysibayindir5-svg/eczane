import React from 'react';

interface AdUnitProps {
    slot: string; // 'header', 'sidebar', 'feed', 'footer'
    format?: 'horizontal' | 'rectangle' | 'vertical';
    className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ slot, format = 'horizontal', className = '' }) => {
    // In a real app, this would be your Google AdSense or AdManager code
    // For now, it's a stylish placeholder that fits the design

    const sizeClasses = {
        horizontal: 'w-full h-24', // Leaderboard
        rectangle: 'w-full h-64 md:h-80', // Medium Rectangle
        vertical: 'w-full h-[600px]', // Skyscraper
    };

    return (
        <div className={`flex flex-col items-center justify-center bg-slate-100/50 border border-dashed border-slate-300 rounded-xl overflow-hidden my-6 relative group ${sizeClasses[format]} ${className}`}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes-light.png')] opacity-30"></div>
            <div className="z-10 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white/50 px-2 py-1 rounded mb-2 inline-block">Reklam Alanı</span>
                <p className="text-slate-400 text-xs">{slot} • {format}</p>
            </div>

            {/* Hover Effect for preview */}
            <div className="absolute inset-0 bg-brand-50/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-xs font-bold text-brand-600">
                    Google Ads / Sponsor
                </div>
            </div>
        </div>
    );
};
