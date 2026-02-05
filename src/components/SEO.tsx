import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ALL_KEYWORDS } from '../utils/keywords';

interface Props {
    title: string;
    description: string;
    keywords?: string;
    structuredData?: object;
}


export const SEO: React.FC<Props> = ({ title, description, keywords, structuredData }) => {
    const defaultKeywords = ALL_KEYWORDS.join(', ');
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
