// scripts/prebuild.js
// Copies assets/ → public/assets/ before every build (works on Windows & Linux)
import { cpSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const src = join(root, 'assets');
const dest = join(root, 'public', 'assets');

mkdirSync(dest, { recursive: true });

if (existsSync(src)) {
  cpSync(src, dest, { recursive: true, force: false, errorOnExist: false });
  console.log('✓ Copied assets/ → public/assets/');
} else {
  console.log('⚠ No assets/ directory found — skipping copy');
}
