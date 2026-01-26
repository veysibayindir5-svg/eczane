import React from 'react';
import { SEO } from '../components/SEO';
import { Phone, MapPin, ArrowRight, ShieldAlert, Stethoscope, Mail, Info, FileText, Navigation } from 'lucide-react';
import { AdUnit } from '../components/ui/AdUnit';

export const Hospitals: React.FC = () => {
    // Updated hospital list with map links
    const list = [
        {
            name: 'Kilis Prof. Dr. Alaeddin Yavaşca Devlet Hastanesi (Ana Bina)',
            tel: '0348 802 01 56',
            addr: 'Yaşar Aktürk Mah. Av. Mehmet Abdi Bulut Cad. No:127',
            type: 'Devlet',
            features: ['Acil Servis', 'Poliklinik', 'Yataklı Servis'],
            maps: 'https://www.google.com/maps/search/?api=1&query=Kilis+Prof.+Dr.+Alaeddin+Yavaşca+Devlet+Hastanesi'
        },
        {
            name: 'Kilis Devlet Hastanesi (Eski Bina / Ek Hizmet)',
            tel: '0348 822 10 10',
            addr: 'Kazım Karabekir Mah. Abdullah Gül Blv. Çevre Yolu Üzeri',
            type: 'Devlet',
            features: ['Fizik Tedavi', 'Psikiyatri'],
            maps: 'https://www.google.com/maps/search/?api=1&query=Kilis+Devlet+Hastanesi+Eski+Bina'
        },
        {
            name: 'Musabeyli Entegre İlçe Hastanesi',
            tel: '0348 746 20 85',
            addr: 'Cumhuriyet Mah. Tansu Çiller Cad. Musabeyli',
            type: 'Devlet',
            features: ['Entegre Sağlık Hizmeti'],
            maps: 'https://www.google.com/maps/search/?api=1&query=Musabeyli+Entegre+İlçe+Hastanesi'
        },
        {
            name: 'Özel Aktürk Tıp Merkezi',
            tel: '0348 814 44 82',
            addr: 'Tekye Mah. Cumhuriyet Cad. No:14',
            type: 'Özel',
            features: ['Özel Poliklinik', 'Laboratuvar'],
            maps: 'https://www.google.com/maps/search/?api=1&query=Özel+Aktürk+Tıp+Merkezi+Kilis'
        }
    ];

    const emergencyNumbers = [
        { label: 'Acil Çağrı (Hepsi Tek Numara)', number: '112', desc: 'Ambulans, Polis, İtfaiye', color: 'bg-red-500' },
        { label: 'Zehir Danışma', number: '114', desc: 'Zehirlenme durumlarında', color: 'bg-blue-500' },
        { label: 'MHRS Randevu', number: '182', desc: 'Hastane Randevu Hattı', color: 'bg-emerald-500' },
    ];

    return (
        <div className="space-y-12">
            <SEO title="Kilis Hastaneler ve Acil Numaralar – kiliseczane.com" description="Kilis önemli telefonlar ve hastaneler listesi." />

            {/* Medical Hero Section */}
            <div className="relative -mt-6 -mx-4 py-16 md:py-20 bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600 text-white shadow-xl overflow-hidden md:rounded-b-[3rem]">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl -ml-10 -mb-10"></div>

                <div className="relative container mx-auto px-6 text-center z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/50 backdrop-blur-md border border-blue-400/30 mb-6">
                        <Stethoscope className="w-4 h-4 text-cyan-300" />
                        <span className="text-sm font-medium text-blue-50">7/24 Sağlık Rehberi</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Kilis Sağlık Kurumları</h1>
                    <p className="text-blue-100 text-lg md:text-xl font-light max-w-2xl mx-auto">
                        Acil numaralar ve hastaneler hakkında detaylı bilgilere buradan ulaşabilirsiniz.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                <AdUnit slot="Hastaneler Üst" format="horizontal" />
            </div>

            <div className="container mx-auto px-4 max-w-5xl -mt-8 relative z-20 space-y-12">

                {/* Emergency Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {emergencyNumbers.map((item, idx) => (
                        <div key={idx} className="glass-card rounded-2xl p-6 relative overflow-hidden group">
                            <div className={`absolute top-0 right-0 w-24 h-24 ${item.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform`}></div>
                            <div className="relative z-10">
                                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg mb-4`}>
                                    <ShieldAlert className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-1">{item.number}</h3>
                                <div className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">{item.label}</div>
                                <p className="text-slate-500 text-sm">{item.desc}</p>
                                <a href={`tel:${item.number}`} className="absolute inset-0 z-20"></a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hospitals List */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-blue-100 p-2.5 rounded-xl text-blue-700">
                            <Stethoscope className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Hastaneler</h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {list.map((h, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 transform -translate-x-1 group-hover:translate-x-0 transition-transform"></div>

                                <div className="flex justify-between items-start mb-4 pl-2">
                                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-700 transition-colors pr-8">
                                        {h.name}
                                    </h3>
                                    <span className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide border ${h.type === 'Özel' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                        {h.type}
                                    </span>
                                </div>

                                <div className="space-y-4 pl-2">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                        <p className="text-sm text-slate-600 leading-relaxed">{h.addr}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {h.features.map((f, idx) => (
                                            <span key={idx} className="text-xs bg-slate-50 text-slate-500 px-2 py-1 rounded-md border border-slate-100">
                                                {f}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-4 flex gap-3">
                                        <a href={`tel:${h.tel}`} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                                            <Phone className="w-4 h-4" /> Ara
                                        </a>
                                        <a
                                            href={h.maps}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                                        >
                                            <Navigation className="w-4 h-4" /> Yol Tarifi
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-gradient-to-r from-slate-50 to-white p-6 rounded-2xl border border-slate-100 flex gap-4 items-start">
                    <Info className="w-6 h-6 text-slate-400 shrink-0 mt-1" />
                    <div className="text-sm text-slate-600">
                        <strong className="block text-slate-900 mb-1">Önemli Bilgilendirme</strong>
                        Aile Sağlığı Merkezleri (Sağlık Ocakları) hafta içi 08:00 - 17:00 saatleri arasında hizmet vermektedir. Mesai saatleri dışında acil durumlar için lütfen hastanelerin acil servislerine başvurunuz veya 112'yi arayınız.
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Contact: React.FC = () => {
    return (
        <div className="py-8 space-y-12">
            <SEO title="İletişim – kiliseczane.com" description="Bize ulaşın." />

            <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 text-white py-16 px-6 text-center shadow-2xl mx-4">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80')] bg-cover bg-center"></div>
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">İletişime Geçin</h1>
                    <p className="text-slate-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Görüşleriniz bizim için değerli. Her türlü öneri, talep veya hata bildirimi için bize e-posta gönderebilirsiniz.
                    </p>

                    <a href="mailto:iletisim@kiliseczane.com" className="group inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                        iletisim@kiliseczane.com
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-500 to-blue-500"></div>
                    <p className="mb-8 font-medium text-slate-800 text-xl italic">
                        "Sağlıklı günler dileriz."
                    </p>
                    <div className="p-6 bg-slate-50 rounded-2xl text-sm text-slate-500 leading-loose border border-slate-100">
                        Bu platform, Kilis halkının sağlık hizmetlerine erişimini kolaylaştırmak amacıyla <span className="font-semibold text-slate-700">sosyal sorumluluk projesi</span> olarak geliştirilmiştir. Resmi kurumlarla organik bir bağı yoktur. Veriler düzenli aralıklarla kontrol edilse de, en kesin bilgi için lütfen ilgili sağlık kuruluşunu arayınız.
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Blog: React.FC = () => {
    return (
        <div className="space-y-10 py-4 container mx-auto px-4">
            <SEO title="Sağlık Rehberi – Blog" description="Sağlık hakkında faydalı bilgiler." />

            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Sağlık Rehberi</h1>
                <p className="text-slate-500 text-lg">Uzman görüşleri, sağlıklı yaşam ipuçları ve güncel sağlık haberleri.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        <div className="h-56 bg-slate-200 relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br ${i === 1 ? 'from-blue-400 to-indigo-500' : i === 2 ? 'from-emerald-400 to-teal-500' : 'from-rose-400 to-orange-500'} opacity-80 group-hover:scale-110 transition-transform duration-700`}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FileText className="w-12 h-12 text-white/50" />
                            </div>
                            <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
                                Çok Yakında
                            </span>
                        </div>
                        <div className="p-8">
                            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-2 block">Sağlık & Yaşam</span>
                            <h3 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-brand-600 transition-colors leading-tight">
                                Mevsimsel Hastalıklardan Korunma Yolları #{i}
                            </h3>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">
                                Bağışıklık sisteminizi güçlendirmek ve hastalıklara karşı dirençli olmak için yapmanız gerekenler hakkında detaylı bir rehber hazırlanıyor.
                            </p>
                            <button className="w-full py-3 rounded-xl bg-slate-50 text-slate-900 font-bold text-sm group-hover:bg-brand-600 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                                Okumaya Devam Et <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
