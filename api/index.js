import { createSliceServer } from 'slicejs-web-framework/api/framework/server.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, '..');
let registeredThemes = [];

async function discoverThemes() {
  const themesDir = join(projectRoot, 'src', 'Themes');
  const themes = [];
  if (fs.existsSync(themesDir)) {
    const entries = fs.readdirSync(themesDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const themeCssPath = join(themesDir, entry.name, `${entry.name}.css`);
        if (fs.existsSync(themeCssPath)) {
          themes.push(entry.name);
        }
      }
    }
  }
  return themes;
}

registeredThemes = await discoverThemes();

const server = createSliceServer({ projectRoot });

// Custom endpoint: /api/themes
server.app.get('/api/themes', (req, res) => {
  res.json(Array.from(registeredThemes));
});

// Override /api/status to include custom version info
server.app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    folder: process.env.NODE_ENV === 'production' ? 'dist' : 'src',
    timestamp: new Date().toISOString(),
    framework: 'Slice.js',
    version: '4.0.2',
    security: {
      enabled: true,
      mode: 'automatic',
      description: 'Zero-config security - works with any domain'
    }
  });
});

if (!process.env.VERCEL) {
  server.start();
}

export default server.app;