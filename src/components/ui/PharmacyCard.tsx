import React from 'react';
import type { Pharmacy } from '../../types';
import { Phone, MapPin, Navigation, Clock } from 'lucide-react';

interface Props {
    pharmacy: Pharmacy;
    isDuty?: boolean;
}

export const PharmacyCard: React.FC<Props> = ({ pharmacy, isDuty }) => {
    return (
        <div className={`group relative bg-white rounded-2xl p-5 transition-all duration-300 ${isDuty
                ? 'shadow-lg border-2 border-medical-red/10 ring-1 ring-medical-red/20'
                : 'shadow-card hover:shadow-card-hover border border-slate-100'
            }`}>

            {isDuty && (
                <div className="absolute -top-3 left-4 bg-medical-red text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Nöbetçi
                </div>
            )}

            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand-700 transition-colors">
                        {pharmacy.ad}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-slate-50 text-slate-600 text-xs px-2 py-1 rounded-md border border-slate-100 font-medium">
                            {pharmacy.ilce}
                        </span>
                        <span className="bg-slate-50 text-slate-600 text-xs px-2 py-1 rounded-md border border-slate-100 font-medium">
                            {pharmacy.mahalle}
                        </span>
                    </div>
                </div>
                {/* Status Dot (Mock Status for visual appeal) */}
                <div className="flex flex-col items-center">
                    <span className={`w-3 h-3 rounded-full ${isDuty ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></span>
                    <span className="text-[10px] text-slate-400 mt-1">{isDuty ? 'Açık' : ''}</span>
                </div>
            </div>

            <div className="space-y-3 mt-4">
                <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 leading-snug">{pharmacy.adres}</p>
                </div>

                <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                    <a href={`tel:${pharmacy.telefon}`} className="text-lg font-bold text-slate-800 hover:text-brand-600 transition">
                        {pharmacy.telefon || "Telefon Yok"}
                    </a>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                    href={`tel:${pharmacy.telefon}`}
                    className="flex items-center justify-center gap-2 bg-brand-50 text-brand-700 py-2.5 rounded-xl font-semibold hover:bg-brand-100 transition active:scale-95"
                >
                    <Phone className="w-4 h-4" /> Ara
                </a>
                <a
                    href={pharmacy.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-brand-600 text-white py-2.5 rounded-xl font-semibold hover:bg-brand-700 shadow-md shadow-brand-200 transition active:scale-95"
                >
                    <Navigation className="w-4 h-4" /> Yol Tarifi
                </a>
            </div>

            {/* Footer Badges */}
            <div className="mt-4 pt-3 border-t border-slate-50 flex gap-2">
                {pharmacy.sgk && (
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium">SGK</span>
                )}
            </div>
        </div>
    );
};
