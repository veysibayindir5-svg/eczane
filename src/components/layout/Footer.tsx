import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-800 text-slate-300 py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p className="mb-2 font-medium text-white">
                    "Geçmiş olsun ve Sağlıklı Günler Dileriz. Sitemiz Halkımıza Bilgilendirme Amaçlıdır."
                </p>
                <p className="text-sm opacity-70">
                    &copy; {new Date().getFullYear()} KİLİSECZANE.COM - Kilis Nöbetçi Eczaneler Portalı
                </p>
                <div className="mt-4 text-xs opacity-50">
                    Veriler bilgilendirme amaçlıdır, kesin bilgi için eczaneyi arayınız.
                </div>
            </div>
        </footer>
    );
};
