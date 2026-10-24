import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Parse Provinces
const provContent = fs.readFileSync(path.join(__dirname, 'ID -ខេត្ត.md'), 'utf-8');
const provinces = [];
const provMap = new Map();

for (const line of provContent.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('CODE')) continue;
  const parts = trimmed.split(/\t+/);
  if (parts.length >= 2) {
    const rawId = parts[0].trim();
    const id = rawId.padStart(2, '0');
    const name = parts[1].trim();
    provinces.push({ id, name });
    provMap.set(id, name);
  }
}

// 2. Parse Districts
const distContent = fs.readFileSync(path.join(__dirname, 'ID-ខេត្ត-ស្រុក.md'), 'utf-8');
const districtsByProv = {};
const distMap = new Map();

for (const line of distContent.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('ID')) continue;
  const parts = trimmed.split(/\t+/);
  if (parts.length >= 3) {
    const provId = parts[0].trim().padStart(2, '0');
    const distCode = parts[1].trim();
    const distName = parts[2].trim();
    if (!districtsByProv[provId]) districtsByProv[provId] = [];
    districtsByProv[provId].push({ id: distCode, name: distName });
    distMap.set(distCode, distName);
  }
}

// 3. Parse Communes
const commContent = fs.readFileSync(path.join(__dirname, 'ID ស្រុក-ឃុំ.md'), 'utf-8');
const communesByDist = {};

for (const line of commContent.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('CODE')) continue;
  const parts = trimmed.split(/\t+/);
  if (parts.length >= 4) {
    const distCode = parts[0].trim();
    const commCode = parts[2].trim();
    const commName = parts[3].trim();
    if (!communesByDist[distCode]) communesByDist[distCode] = [];
    communesByDist[distCode].push({ id: commCode, name: commName });
  }
}

const geoData = {
  provinces,
  districts: districtsByProv,
  communes: communesByDist,
};

fs.writeFileSync(path.join(__dirname, 'cambodia_geography.json'), JSON.stringify(geoData, null, 2), 'utf-8');
console.log(`Generated cambodia_geography.json with ${provinces.length} provinces, ${Object.keys(districtsByProv).length} district sets, ${Object.keys(communesByDist).length} commune sets.`);
