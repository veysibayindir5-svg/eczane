import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { fetchMonthlyData } from '../utils/data';
import type { Pharmacy } from '../types';
import { PharmacyCard } from '../components/ui/PharmacyCard';
import { SEO } from '../components/SEO';
import { Calendar as CalendarIcon, CheckCircle, Search } from 'lucide-react';
import { AdUnit } from '../components/ui/AdUnit';

export const Calendar: React.FC = () => {
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [list, setList] = useState<Pharmacy[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const [year, month] = date.split('-');
            const monthStr = `${year}-${month}`;
            const data = await fetchMonthlyData(monthStr);
            if (data && data.days[date]) {
                setList(data.days[date]);
            } else {
                setList([]);
            }
            setLoading(false);
        }
        load();
    }, [date]);

    return (
        <div className="pb-12">
            <SEO
                title="Kilis Nöbetçi Eczane Takvimi - Geçmiş ve Gelecek Nöbetçiler"
                description="İstediğiniz tarihteki nöbetçi eczaneleri anında sorgulayın."
            />

            {/* Gradient Hero Section */}
            <div className="relative -mt-6 -mx-4 py-16 md:py-20 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-600 text-white shadow-xl overflow-hidden md:rounded-b-[3rem]">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl -ml-10 -mb-10"></div>

                <div className="relative container mx-auto px-6 text-center z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                        <CalendarIcon className="w-4 h-4 text-purple-200" />
                        <span className="text-sm font-medium text-purple-50">Nöbetçi Arşivi & Planlayıcı</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Nöbetçi Takvimi</h1>
                    <p className="text-indigo-100 text-lg md:text-xl font-light max-w-2xl mx-auto opacity-90">
                        İleri tarihli nöbetleri görüntüleyin veya geçmiş tarihli kayıtları inceleyin.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                {/* Search Box Card */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-100 max-w-2xl mx-auto animate-fade-in">
                    <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                        Tarih Seçiniz
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <CalendarIcon className="h-6 w-6 text-indigo-500 group-focus-within:text-purple-600 transition-colors" />
                        </div>
                        <input
                            type="date"
                            className="block w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 text-slate-900 bg-slate-50 text-lg font-medium shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all cursor-pointer hover:bg-white hover:border-indigo-300"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                        <CheckCircle className="w-5 h-5 text-indigo-600" />
                        <span>Seçtiğiniz tarihteki nöbetçiler aşağıda listelenecektir.</span>
                    </div>
                </div>

                {/* Ad Unit */}
                <div className="mt-8 max-w-4xl mx-auto">
                    <AdUnit slot="Takvim Arama Altı" format="horizontal" />
                </div>

                {/* Results Section */}
                <div className="mt-10 max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-8 bg-indigo-500 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            {format(new Date(date), 'd MMMM yyyy EEEE', { locale: tr })}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-64 bg-white rounded-3xl shadow-sm border border-slate-100 animate-pulse"></div>
                            ))}
                        </div>
                    ) : list.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {list.map((p, idx) => (
                                <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                                    <PharmacyCard pharmacy={p} isDuty={true} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-[2rem] shadow-sm border border-slate-100">
                            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Kayıt Bulunamadı</h3>
                            <p className="text-slate-500 max-w-xs mx-auto">
                                Seçilen tarih ({format(new Date(date), 'dd.MM.yyyy')}) için sistemde kayıtlı nöbetçi eczane bulunmuyor.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
