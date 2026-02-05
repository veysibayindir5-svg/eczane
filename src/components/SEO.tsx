import React from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
    title: string;
    description: string;
    keywords?: string;
    structuredData?: object;
}

export const SEO: React.FC<Props> = ({ title, description, keywords, structuredData }) => {
    const defaultKeywords = "kilis nöbetçi eczane, kilis eczaneleri, kilis açık eczane, kilis eczane telefon, kilis nöbetçi eczane listesi, kilis 7/24 eczane, kilis merkez nöbetçi eczane, kilis bugün nöbetçi eczane, kilis yarın nöbetçi eczane, kilis eczane adresleri, kilis nöbetçi eczaneler bugün, kilis nöbetçi eczane yarın, kilis sağlık rehberi, kilis tıp merkezi, kilis hastane telefonları";
    const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={finalKeywords} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta name="robots" content="index, follow" />
            {structuredData && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            )}
        </Helmet>
    );
};
