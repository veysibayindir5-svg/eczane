import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, 'docs');

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
        console.error('Error: docs directory not found. Please run build first.');
        process.exit(1);
    }

    // Read the index.html template from docs
    const template = fs.readFileSync(path.join(docsDir, 'index.html'), 'utf-8');

    console.log('Generating Hybrid Static HTML for all routes...');

    // Load pharmacy data for injection (optional but good for searchability)
    let extraContent = '';
    try {
        const eczaneler = JSON.parse(fs.readFileSync(path.join(docsDir, 'data/eczaneler.json'), 'utf-8'));
        extraContent = `
      <div style="display:none" aria-hidden="true">
        <h2>Kilis Eczaneleri Listesi</h2>
        <ul>
          ${eczaneler.map(p => `<li><strong>${p.ad}</strong>: ${p.mahalle} ${p.ilce} - ${p.telefon}</li>`).join('')}
        </ul>
      </div>
    `;
    } catch (e) {
        console.warn('Could not load eczaneler.json for data injection');
    }

    routes.forEach(route => {
        let html = template;

        // Inject Title and Meta Description
        html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

        // Check if meta description exists, otherwise inject
        if (html.includes('name="description"')) {
            html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.desc}" />`);
        } else {
            html = html.replace('</head>', `<meta name="description" content="${route.desc}" /></head>`);
        }

        // Inject extra content for indexing
        html = html.replace('</body>', `${extraContent}</body>`);

        // Determine target file path
        let targetPath;
        if (route.path === '/') {
            targetPath = path.join(docsDir, 'index.html');
        } else {
            const routeDir = path.join(docsDir, route.path.slice(1));
            if (!fs.existsSync(routeDir)) {
                fs.mkdirSync(routeDir, { recursive: true });
            }
            targetPath = path.join(routeDir, 'index.html');

            // Fix relative paths for JS/CSS assets
            // Since it's in a subdirectory, /assets/.. is correct if domain root, 
            // but let's make sure strings are correct.
        }

        fs.writeFileSync(targetPath, html);
        console.log(`✓ Generated ${targetPath}`);
    });

    console.log('Hybrid SSG complete!');
}

generate();
