import React, { useEffect, useState } from 'react';
import { fetchMonthlyData } from '../utils/data';
import type { Pharmacy } from '../types';
import { getDutyDate } from '../utils/time';
import { format } from 'date-fns';
import { Phone, MapPin, Navigation, Clock, ShieldCheck } from 'lucide-react';

export const Embed: React.FC = () => {
    const [list, setList] = useState<Pharmacy[]>([]);
    const [loading, setLoading] = useState(true);
    const targetDate = getDutyDate();
    const dateStr = format(targetDate, 'yyyy-MM-dd');
    const monthStr = format(targetDate, 'yyyy-MM');

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

    if (loading) {
        return (
            <div className="bg-white p-4 space-y-4">
                {[1, 2].map(i => (
                    <div key={i} className="h-40 bg-slate-100 animate-pulse rounded-xl"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen overflow-hidden">
            <div className="bg-brand-600 text-white p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-1.5 rounded-lg">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold uppercase tracking-tight">Kilis Nöbetçi</h1>
                        <p className="text-[10px] opacity-80">{format(targetDate, 'dd MMMM yyyy')}</p>
                    </div>
                </div>
                <a href="https://kiliseczane.com" target="_blank" rel="noopener noreferrer" className="text-[10px] bg-white/10 px-2 py-1 rounded text-white/90 hover:bg-white/20 transition">kiliseczane.com</a>
            </div>

            <div className="p-3 space-y-4">
                {list.length > 0 ? (
                    list.map((p, idx) => (
                        <div key={idx} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:border-brand-200 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-800 text-base leading-tight">{p.ad}</h3>
                                <ShieldCheck className="w-4 h-4 text-brand-500" />
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                                    <p className="text-xs text-slate-600 leading-snug line-clamp-2">{p.adres}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                                    <a href={`tel:${p.telefon}`} className="text-sm font-bold text-slate-700 hover:text-brand-600">
                                        {p.telefon}
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href={`tel:${p.telefon}`}
                                    className="flex items-center justify-center gap-1.5 bg-slate-50 text-slate-700 py-2 rounded-lg text-xs font-semibold hover:bg-slate-100 transition"
                                >
                                    <Phone className="w-3 h-3" /> Ara
                                </a>
                                <a
                                    href={p.maps}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-1.5 bg-brand-600 text-white py-2 rounded-lg text-xs font-semibold hover:bg-brand-700 transition"
                                >
                                    <Navigation className="w-3 h-3" /> Yol Tarifi
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-sm text-slate-500 font-medium tracking-tight">Kayıt Bulunamadı</p>
                    </div>
                )}
            </div>

            <div className="text-center p-3 border-t border-slate-50">
                <p className="text-[10px] text-slate-400 font-medium">Bu bilgiler ücretsiz olarak sunulmaktadır.</p>
            </div>
        </div>
    );
};
