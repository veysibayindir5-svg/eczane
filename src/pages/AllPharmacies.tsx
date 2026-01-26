import React, { useEffect, useState } from 'react';
import { fetchAllPharmacies } from '../utils/data';
import type { Pharmacy } from '../types';
import { PharmacyCard } from '../components/ui/PharmacyCard';
import { isDutyTime } from '../utils/time';
import { SEO } from '../components/SEO';
import { Navigate } from 'react-router-dom';

export const AllPharmacies: React.FC = () => {
    const [list, setList] = useState<Pharmacy[]>([]);
    const [search, setSearch] = useState('');

    // Rule: If duty time (19:30 - 08:30), redirect to Home (Duty page)
    const isNight = isDutyTime();

    useEffect(() => {
        if (!isNight) {
            fetchAllPharmacies().then(setList);
        }
    }, [isNight]);

    if (isNight) {
        return (
            <div className="text-center pt-10">
                <p>Şu an sadece nöbetçi eczaneler gösterilmektedir...</p>
                <Navigate to="/" replace />
            </div>
        );
    }

    const filtered = list.filter(p =>
        p.ad.toLowerCase().includes(search.toLowerCase()) ||
        p.mahalle.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <SEO
                title="Kilis Eczaneleri – Tüm Eczaneler Listesi"
                description="Kilis ilindeki tüm eczanelerin listesi, adres ve telefon bilgileri."
            />

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-slate-900">Tüm Eczaneler</h1>
                    <input
                        type="text"
                        placeholder="Eczane veya mahalle ara..."
                        className="border border-slate-300 rounded-lg px-4 py-2 w-full md:w-64"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((p, idx) => (
                        <PharmacyCard key={idx} pharmacy={p} />
                    ))}
                </div>
            </div>
        </>
    );
};
