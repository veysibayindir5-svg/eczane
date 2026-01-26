import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { HelmetProvider } from 'react-helmet-async';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <HelmetProvider>
            <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
                <Header />
                {/* Adjusted padding top for fixed header */}
                <main className="flex-grow pt-20">
                    {children}
                </main>
                <Footer />
            </div>
        </HelmetProvider>
    );
};
