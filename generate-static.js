import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// root/generate-static.js -> dist is root/docs
const distDir = path.join(__dirname, 'docs');

const routes = [
    'eczaneler',
    'takvim',
    'hastaneler',
    'blog',
    'iletisim',
    'nobetci'
];

if (!fs.existsSync(distDir)) {
    console.error('Error: docs directory not found. Please run build first.');
    process.exit(1);
}

// Read the main index.html
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

console.log('Generating static files for routes...');

routes.forEach(route => {
    const dir = path.join(distDir, route);

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Write index.html to the route directory
    fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);
    console.log(`✓ Created ${route}/index.html`);
});

console.log('Static site generation complete.');
