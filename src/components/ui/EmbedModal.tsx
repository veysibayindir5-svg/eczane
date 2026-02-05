import React, { useState } from 'react';
import { X, Copy, Check, Code, ExternalLink } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const EmbedModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);
    const [previewSize, setPreviewSize] = useState('400px');

    if (!isOpen) return null;

    const embedCode = `<div style="margin:auto;text-align:center;width:100%;max-width:${previewSize};">
    <iframe src="https://kiliseczane.com/embed" name="Kilis Nöbetçi Eczaneler" style="width:100%;height:500px;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);"></iframe>
    <div style="margin-top:8px;font-family:sans-serif;font-size:12px;color:#64748b;">
        Veriler <a href="https://kiliseczane.com" target="_blank" style="color:#005599;text-decoration:none;font-weight:600;">kiliseczane.com</a> tarafından sağlanmaktadır.
    </div>
</div>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-white rounded-[2.5rem] w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">

                {/* Left Side: Preview */}
                <div className="hidden md:flex flex-col bg-slate-50 border-r border-slate-100 md:w-[45%] p-8 lg:p-10">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            Canlı Önizleme
                        </h3>
                        <div className="flex bg-white p-1 rounded-lg shadow-sm border border-slate-200">
                            {['300px', '400px'].map(size => (
                                <button
                                    key={size}
                                    onClick={() => setPreviewSize(size)}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition ${previewSize === size ? 'bg-brand-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    {size === '300px' ? 'Dar' : 'Geniş'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-grow flex items-center justify-center overflow-auto p-4">
                        <div style={{ width: previewSize }} className="transition-all duration-300 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 shrink-0">
                            <iframe
                                src="/embed"
                                title="Kilis Nöbetçi Eczaneler Önizleme"
                                className="w-full h-[450px] border-none"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Right Side: Code & Info */}
                <div className="flex-grow p-8 md:p-10 lg:p-12 flex flex-col overflow-y-auto">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="mb-8">
                        <div className="bg-medical-red/10 text-medical-red w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                            <Code className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Sitenize Ekleyin</h2>
                        <p className="text-slate-500 text-base lg:text-lg font-medium leading-relaxed">
                            Kilis nöbetçi eczane bilgilerini kendi web sitenizde ücretsiz olarak yayınlayın.
                        </p>
                    </div>

                    <div className="space-y-6 flex-grow">
                        <div className="relative group">
                            <div className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none z-10">
                                HTML Embed Kodu
                            </div>
                            <div className="bg-slate-900 rounded-2xl p-5 lg:p-6 pt-8 font-mono text-xs lg:text-sm text-slate-300 border border-slate-800 shadow-inner group-hover:border-medical-red transition-colors relative">
                                <pre className="whitespace-pre-wrap break-all">{embedCode}</pre>
                                <button
                                    onClick={handleCopy}
                                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl backdrop-blur-md transition-all active:scale-90"
                                    title="Kopyala"
                                >
                                    {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="bg-blue-50/50 rounded-2xl p-5 lg:p-6 border border-blue-100/50">
                            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <span className="bg-blue-500 w-2 h-2 rounded-full"></span>
                                Profesyonel Görünüm
                            </h4>
                            <p className="text-sm text-blue-800/80 leading-relaxed font-medium">
                                Widget otomatik olarak güncellenir, tamamen responsive ve mobil uyumludur. Sitenizin tasarımına uyum sağlar.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                            onClick={handleCopy}
                            className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg ${copied ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-brand-600 text-white shadow-brand-200 hover:bg-brand-700'}`}
                        >
                            {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                            {copied ? 'Kopyalandı!' : 'Kodu Kopyala'}
                        </button>

                        <a
                            href="/embed"
                            target="_blank"
                            className="flex items-center gap-2 text-slate-400 hover:text-brand-600 font-bold text-sm transition"
                        >
                            Tam Ekran Gör <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
