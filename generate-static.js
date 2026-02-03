import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, 'docs');
const DOMAIN = 'https://kiliseczane.com';

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
    }
];

function generate() {
    if (!fs.existsSync(docsDir)) {
        console.error('Error: docs directory not found.');
        process.exit(1);
    }

    // Always use the fresh index.html from vite build
    const templatePath = path.join(docsDir, 'index.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    console.log('Generating Enhanced Static HTML for all routes...');

    // Load pharmacy data for indexing
    let searchableContent = '';
    try {
        const eczanelerPath = path.join(docsDir, 'data/eczaneler.json');
        if (fs.existsSync(eczanelerPath)) {
            const eczaneler = JSON.parse(fs.readFileSync(eczanelerPath, 'utf-8'));
            searchableContent = `
        <div style="display:none" aria-hidden="true">
            <h2>Kilis Eczaneler ve Sağlık Kuruluşları</h2>
            <p>Kilis şehrindeki tüm eczaneler, nöbetçi eczaneler ve hastaneler rehberi.</p>
            <ul>
            ${eczaneler.map(p => `<li><strong>${p.ad}</strong> - ${p.mahalle} Mah. ${p.ilce} - Tel: ${p.telefon}</li>`).join('')}
            </ul>
        </div>`;
        }
    } catch (e) {
        console.warn('Data injection skipped:', e.message);
    }

    routes.forEach(route => {
        let html = template;

        // Inject Meta Tags
        const canonicalUrl = `${DOMAIN}${route.path}`;
        const headTags = `
    <title>${route.title}</title>
    <meta name="description" content="${route.desc}" />
    <link rel="canonical" href="${canonicalUrl}" />
    `;

        // Replace existing title and inject meta/canonical
        html = html.replace(/<title>.*?<\/title>/, headTags);

        // Inject searchable content for Google bot
        html = html.replace('</body>', `${searchableContent}</body>`);

        // Determine target path
        const targetPath = route.path === '/'
            ? templatePath
            : path.join(docsDir, route.path.slice(1), 'index.html');

        const targetDir = path.dirname(targetPath);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        fs.writeFileSync(targetPath, html);
        console.log(`✓ Processed: ${route.path}`);
    });

    console.log('SEO Optimization Complete!');
}

generate();
