import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '..', 'public', 'images');
const make = async (code, bg, filename) => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="600" viewBox="0 0 500 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg[0]}" />
      <stop offset="100%" stop-color="${bg[1]}" />
    </linearGradient>
  </defs>
  <rect width="500" height="600" rx="32" fill="url(#bg)" />
  <text x="50%" y="42%" text-anchor="middle" fill="#ffffff" font-family="Inter, sans-serif" font-size="54" font-weight="800">Brand ${code}</text>
  <text x="50%" y="56%" text-anchor="middle" fill="#f8fafc" font-family="Inter, sans-serif" font-size="22">Coleção Masculina</text>
  <rect x="100" y="360" width="300" height="120" rx="18" fill="rgba(255,255,255,0.08)" />
  <text x="50%" y="60%" text-anchor="middle" fill="#fbbf24" font-family="Inter, sans-serif" font-size="24">Edição numerada</text>
</svg>`;
  const filePath = path.join(outputDir, filename);
  await sharp(Buffer.from(svg)).resize(500, 600).webp({ quality: 90 }).toFile(filePath);
  console.log('Created', filePath);
};

(async () => {
  await make('321', ['#0f172a', '#334155'], '321.webp');
  await make('084', ['#111827', '#3f3f46'], '084.webp');
  if (!fs.existsSync(path.join(outputDir, '440.webp'))) {
    const jpgPath = path.join(outputDir, '440.jpg');
    if (fs.existsSync(jpgPath)) {
      await sharp(jpgPath).resize(500, 600).webp({ quality: 90 }).toFile(path.join(outputDir, '440.webp'));
      console.log('Converted 440.jpg to 440.webp');
    }
  }
})();
