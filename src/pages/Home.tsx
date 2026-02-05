import React, { useEffect, useState } from 'react';
import { fetchMonthlyData } from '../utils/data';
import type { Pharmacy } from '../types';
import { PharmacyCard } from '../components/ui/PharmacyCard';
import { isDutyTime, getDutyDate, formatDisplayDate } from '../utils/time';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Calendar as CalendarIcon, MapPin, Clock, ShieldCheck, Code } from 'lucide-react';
import { format } from 'date-fns';
import { AdUnit } from '../components/ui/AdUnit';
import { EmbedModal } from '../components/ui/EmbedModal';

export const Home: React.FC = () => {
    const [list, setList] = useState<Pharmacy[]>([]);
    const [loading, setLoading] = useState(true);
    const isDuty = isDutyTime();
    const [search, setSearch] = useState('');
    const [targetDate, setTargetDate] = useState(getDutyDate());
    const [isTomorrow, setIsTomorrow] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dateStr = format(targetDate, 'yyyy-MM-dd');
    const monthStr = format(targetDate, 'yyyy-MM');

    const handleTomorrow = () => {
        const d = getDutyDate();
        d.setDate(d.getDate() + 1);
        setTargetDate(d);
        setIsTomorrow(true);
    };

    const handleToday = () => {
        setTargetDate(getDutyDate());
        setIsTomorrow(false);
    };

    useEffect(() => {
        async function load() {
            setLoading(true);
            const data = await fetchMonthlyData(monthStr);
            if (data && data.days[dateStr]) {
                setList(data.days[dateStr]);
            } else {
                setList([]);
            }
            setLoading(false);
        }
        load();
    }, [monthStr, dateStr]);

    return (
        <>
            <SEO
                title="Kilis Nöbetçi Eczaneler – 7/24 Güncel"
                description="Kilis nöbetçi eczane listesi, adres ve telefon bilgileri."
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Kilis Eczane",
                    "url": "https://kiliseczane.com/",
                    "description": "Kilis nöbetçi eczane listesi, tüm eczaneler, nöbet takvimi ve sağlık kuruluşları.",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://kiliseczane.com/eczaneler?q={search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
                }}
            />

            {/* Modern Gradient Hero */}
            <div className="relative -mt-6 -mx-4 pb-20 md:pb-24 pt-10 md:pt-16 md:rounded-b-[3rem] overflow-hidden bg-gradient-to-br from-brand-900 via-[#005599] to-brand-600 text-white shadow-2xl z-0">
                {/* Abstract Shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 animate-float"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-400/20 rounded-full blur-3xl -ml-10 -mb-10"></div>

                <div className="relative container mx-auto px-6 text-center z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in">
                        <ShieldCheck className="w-4 h-4 text-brand-200" />
                        <span className="text-sm font-medium text-brand-50">Resmi ve Güncel Veriler</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-sm text-glow">
                        Kilis <span className="text-brand-200">Nöbetçi</span> Eczaneler
                    </h1>
                    <p className="text-brand-100 text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto opacity-90">
                        Sağlığınız için 7/24 hizmet veren en yakın eczaneyi anında bulun.
                    </p>

                    {/* Floating Search Bar */}
                    <div className="max-w-xl mx-auto relative group z-20">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-4 py-4 rounded-2xl border-0 text-gray-900 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] placeholder:text-gray-400 focus:ring-4 focus:ring-brand-500/20 focus:outline-none sm:text-lg transition-transform hover:scale-[1.02] focus:scale-[1.02]"
                            placeholder="Eczane adı, mahalle veya ilçe ara..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 mb-4">
                <AdUnit slot="Anasayfa Üst" format="horizontal" />
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-30 pb-12">

                {/* 3-Column Grid Layout for Desktop */}
                <div className="grid lg:grid-cols-[200px_1fr_200px] gap-6 items-start">

                    {/* Left Ad Sidebar (Hidden on mobile) */}
                    <aside className="hidden lg:block sticky top-8">
                        <AdUnit slot="Sol Dikey" format="vertical" className="h-[600px]" />
                    </aside>

                    {/* Main Content Column */}
                    <main>
                        {/* Premium Date Toggle (Segmented Control look) */}
                        <div className="flex justify-center mb-10">
                            <div className="bg-white p-1.5 rounded-2xl shadow-lg border border-slate-100 inline-flex relative">
                                <div
                                    className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-brand-600 rounded-xl shadow-md transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${isTomorrow ? 'translate-x-[100%] ml-1.5' : 'translate-x-0'}`}
                                ></div>

                                <button
                                    onClick={handleToday}
                                    className={`relative z-10 px-8 py-2.5 rounded-xl text-sm font-bold transition-colors duration-300 ${!isTomorrow ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Bugün
                                </button>
                                <button
                                    onClick={handleTomorrow}
                                    className={`relative z-10 px-8 py-2.5 rounded-xl text-sm font-bold transition-colors duration-300 ${isTomorrow ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    Yarın
                                </button>
                            </div>
                        </div>

                        {/* Floating Status Balloon (Right Side) */}
                        {!isDuty && !isTomorrow && (
                            <div className="fixed bottom-6 right-6 z-50 animate-fade-in group pointer-events-auto">
                                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <div className="relative bg-white/90 backdrop-blur-xl border border-white/50 p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm transition-transform hover:-translate-y-1">
                                    <div className="relative shrink-0">
                                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                                        <div className="bg-gradient-to-br from-green-400 to-emerald-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg relative z-10">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-sm leading-tight mb-0.5">Mesai Saatlerindeyiz</h3>
                                        <p className="text-[10px] text-slate-500 font-medium mb-2">08:30 - 19:30 arası hizmetinizdeyiz.</p>

                                        <Link
                                            to="/eczaneler"
                                            className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full hover:bg-brand-100 transition-colors"
                                        >
                                            Tüm Eczaneler <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4 mb-6 px-2">
                            <div className="bg-brand-100 p-2.5 rounded-xl text-brand-700">
                                <CalendarIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-0.5">Seçili Tarih</p>
                                <h2 className="text-2xl font-bold text-slate-900 leading-none">
                                    {formatDisplayDate(targetDate)}
                                </h2>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-64 bg-white rounded-3xl shadow-sm border border-slate-100 animate-pulse"></div>
                                ))}
                            </div>
                        ) : list.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                {list.filter(p =>
                                    search === '' ||
                                    p.ad.toLowerCase().includes(search.toLowerCase()) ||
                                    p.mahalle.toLowerCase().includes(search.toLowerCase()) ||
                                    p.ilce.toLowerCase().includes(search.toLowerCase())
                                ).map((p, idx) => (
                                    <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                                        <PharmacyCard pharmacy={p} isDuty={true} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-[2rem] shadow-sm border border-slate-100">
                                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-10 h-10 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Kayıt Bulunamadı</h3>
                                <p className="text-slate-500 max-w-xs mx-auto">Seçilen tarih için nöbetçi eczane verisi henüz girilmemiş olabilir.</p>
                            </div>
                        )}
                    </main>

                    {/* Right Ad Sidebar (Hidden on mobile) */}
                    <aside className="hidden lg:block sticky top-8">
                        <AdUnit slot="Sağ Dikey" format="vertical" className="h-[600px]" />
                    </aside>

                </div>
            </div>

            {/* Desktop-only Sitene Ekle Floating Button */}
            <div className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-40 group">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex flex-col items-center gap-2 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 hover:border-brand-300 transition-all duration-500 hover:-translate-y-1 hover:shadow-brand-200/50"
                >
                    <div className="bg-brand-600 text-white p-3 rounded-xl shadow-lg ring-4 ring-brand-50 group-hover:bg-brand-700 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <Code className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black text-brand-700 uppercase tracking-tighter text-center leading-[0.8] mt-1 group-hover:text-brand-800">
                        SİTENE<br />EKLE
                    </span>
                </button>

                {/* Tooltip-like label */}
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                    <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-2 rounded-xl shadow-2xl whitespace-nowrap flex items-center gap-2 border border-slate-800">
                        <div className="w-2 h-2 bg-brand-400 rounded-full animate-pulse"></div>
                        Ücretsiz Widget Alın
                        <div className="absolute left-0 top-1/2 -translate-x-[4px] -translate-y-1/2 w-2 h-2 bg-slate-900 border-l border-b border-slate-800 rotate-45"></div>
                    </div>
                </div>
            </div>

            <EmbedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
