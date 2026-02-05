import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, 'docs');
const DOMAIN = 'https://www.kiliseczane.com'; // Switched to WWW to match Search Console

const routes = [
    {
        path: '/',
        title: 'Kilis Nöbetçi Eczaneler | 7/24 Güncel Liste',
        desc: 'Kilis ilindeki nöbetçi eczaneler listesi. Bugün açık olan eczaneleri, adres ve telefon bilgilerini anında öğrenin.'
    },
    {
        path: '/eczaneler',
        title: 'Kilis Eczaneleri | Tüm Eczaneler Listesi',
        desc: 'Kilis ilindeki tüm eczanelerin alfabetik listesi, adres ve iletişim bilgileri.'
    },
    {
        path: '/takvim',
        title: 'Kilis Nöbetçi Eczane Takvimi',
        desc: 'Kilis nöbetçi eczane arşivi ve gelecek günlerin nöbet listesi.'
    },
    {
        path: '/hastaneler',
        title: 'Kilis Hastaneler ve Önemli Numaralar',
        desc: 'Kilis ilindeki hastaneler, acil servisler ve önemli sağlık kuruluşları rehberi.'
    },
    {
        path: '/blog',
        title: 'Kilis Sağlık Rehberi | Blog',
        desc: 'Sağlıklı yaşam ipuçları ve güncel sağlık bilgileri.'
    },
    {
        path: '/iletisim',
        title: 'İletişim | Kilis Eczane',
        desc: 'Bize ulaşın, öneri ve taleplerinizi iletin.'
    },
    {
        path: '/embed',
        title: 'Sitene Ekle | Kilis Nöbetçi Eczane Widget',
        desc: 'Kilis nöbetçi eczane bilgilerini kendi web sitenize ekleyin.'
    }
];

function generate() {
    if (!fs.existsSync(docsDir)) {
        console.error('Error: docs directory not found.');
        process.exit(1);
    }

    const templatePath = path.join(docsDir, 'index.html');
    if (!fs.existsSync(templatePath)) {
        console.error('Error: index.html template not found in docs.');
        process.exit(1);
    }
    const template = fs.readFileSync(templatePath, 'utf-8');

    console.log('Generating WWW-Standardized Static HTML for all routes...');

    // Load pharmacy data
    let searchableContent = '';
    try {
        const eczanelerPath = path.join(docsDir, 'data/eczaneler.json');
        if (fs.existsSync(eczanelerPath)) {
            const eczaneler = JSON.parse(fs.readFileSync(eczanelerPath, 'utf-8'));
            searchableContent = `
        <div style="display:none" aria-hidden="true">
            <h2>Kilis Eczaneler ve Sağlık Kuruluşları</h2>
            <ul>
            ${eczaneler.map(p => `<li>${p.ad} - ${p.mahalle} - ${p.telefon}</li>`).join('')}
            </ul>
        </div>`;
        }
    } catch (e) { }

    routes.forEach(route => {
        let html = template;

        // Canonical URL with WWW and trailing slash for maximum consistency
        const canonicalUrl = `${DOMAIN}${route.path}${route.path.endsWith('/') ? '' : '/'}`;

        const headTags = `
    <title>${route.title}</title>
    <meta name="description" content="${route.desc}" />
    <link rel="canonical" href="${canonicalUrl}" />
    `;

        html = html.replace(/<title>.*?<\/title>/, headTags);
        html = html.replace('</body>', `${searchableContent}</body>`);

        // Write to /folder/index.html
        const targetPath = route.path === '/'
            ? templatePath
            : path.join(docsDir, route.path.slice(1), 'index.html');

        const targetDir = path.dirname(targetPath);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        fs.writeFileSync(targetPath, html);

        // Also create path.html fallback for some crawlers
        if (route.path !== '/') {
            const fallbackPath = path.join(docsDir, `${route.path.slice(1)}.html`);
            fs.writeFileSync(fallbackPath, html);
        }

        console.log(`✓ Generated: ${route.path}`);
    });

    console.log('WWW SEO Optimization Complete!');
}

generate();
