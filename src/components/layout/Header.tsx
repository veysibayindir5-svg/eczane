import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Calendar, LayoutGrid, Heart } from 'lucide-react';
import clsx from 'clsx';

export const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { to: '/', label: 'Nöbetçi/Anasayfa', icon: <MapPin className="w-5 h-5" /> },
        { to: '/eczaneler', label: 'Tüm Eczaneler', icon: <LayoutGrid className="w-5 h-5" /> },
        { to: '/takvim', label: 'Nöbet Takvimi', icon: <Calendar className="w-5 h-5" /> },
        { to: '/hastaneler', label: 'Hastaneler', icon: <Heart className="w-5 h-5" /> },
        { to: '/iletisim', label: 'İletişim', icon: <Phone className="w-5 h-5" /> },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <NavLink to="/" className="text-xl md:text-2xl flex items-center gap-2 text-brand-700 tracking-tight">
                    <div className="bg-brand-600 text-white p-1.5 rounded-lg">
                        <Heart className="w-5 h-5 fill-current" />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500 font-light">
                        KİLİS <span className="font-bold">ECZANE</span>
                    </span>
                </NavLink>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-brand-700 hover:bg-brand-50 p-2 rounded-lg transition"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-1">
                    {navItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => clsx(
                                "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                                isActive
                                    ? "bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200"
                                    : "text-slate-600 hover:text-brand-600 hover:bg-slate-50"
                            )}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <nav className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 absolute w-full shadow-lg animate-fade-in">
                    <ul className="flex flex-col p-2 space-y-1">
                        {navItems.map(item => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) => clsx(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition",
                                        isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.icon}
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
};
