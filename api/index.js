import express from 'express';
import { createSliceServer } from 'slicejs-web-framework/api/framework/server.js';
import { teachingData } from '../src/Components/AppComponents/TeachingIndex/data/teaching.js';
import discoverThemes from './utils/themesDiscovery.js';
import fs from 'node:fs/promises';
import path from 'node:path';

const sliceServer = createSliceServer({ projectRoot: process.cwd() });
const app = express();
const brandTitle = 'Victor Kneider — Software Design & Architecture';
const defaultImage = 'https://vkneider.dev/images/og-image.png';
const origin = (process.env.PUBLIC_SITE_URL || 'https://vkneider.dev').replace(/\/+$/, '');

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll("'", '&#39;');
}

function metadataForCourse(course, canonicalUrl) {
  if (!course) {
    return {
      title: `Course Not Found | Teaching | ${brandTitle}`,
      description: 'Browse courses and learning resources shared by Victor Kneider.',
      canonicalUrl
    };
  }

  return {
    title: `${course.name} | Teaching | ${brandTitle}`,
    description: course.description,
    canonicalUrl
  };
}

function metadataForTeachingHub(canonicalUrl) {
  return {
    title: `Teaching | ${brandTitle}`,
    description: 'Course syllabi and learning resources developed and shared by Victor Kneider.',
    canonicalUrl
  };
}

function injectPreviewMetadata(html, metadata) {
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const canonicalUrl = escapeHtml(metadata.canonicalUrl);
  const image = escapeHtml(defaultImage);
  let output = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  const metadataTags = [
    [/\s*<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${description}">`],
    [/\s*<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}">`],
    [/\s*<meta\s+property=["']og:type["'][^>]*>/i, '<meta property="og:type" content="website">'],
    [/\s*<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${title}">`],
    [/\s*<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${description}">`],
    [/\s*<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${canonicalUrl}">`],
    [/\s*<meta\s+property=["']og:image["'][^>]*>/i, `<meta property="og:image" content="${image}">`],
    [/\s*<meta\s+name=["']twitter:card["'][^>]*>/i, '<meta name="twitter:card" content="summary_large_image">'],
    [/\s*<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${title}">`],
    [/\s*<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${description}">`],
    [/\s*<meta\s+name=["']twitter:image["'][^>]*>/i, `<meta name="twitter:image" content="${image}">`]
  ];

  for (const [pattern, tag] of metadataTags) {
    if (pattern.test(output)) {
      output = output.replace(pattern, `\n    ${tag}`);
    } else {
      output = output.replace(/<\/head>/i, `    ${tag}\n  </head>`);
    }
  }
  return output;
}

app.get('/api/themes', async (req, res, next) => {
  try {
    res.json(await discoverThemes());
  } catch (error) {
    next(error);
  }
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    framework: 'Slice.js',
    version: '4.0.2',
    security: {
      enabled: true,
      mode: 'automatic',
      description: 'Zero-config security - works with any domain'
    }
  });
});

async function sendTeachingPreview(req, res, next, metadata) {
  const projectRoot = process.cwd();
  const deployedFolder = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
  const indexFile = path.join(projectRoot, deployedFolder, 'App', 'index.html');

  try {
    const html = await fs.readFile(indexFile, 'utf8');
    res.status(metadata.status || 200);
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600');
    res.type('html').send(injectPreviewMetadata(html, metadata));
  } catch (error) {
    next(error);
  }
}

app.get('/teaching', (req, res, next) => {
  sendTeachingPreview(req, res, next, metadataForTeachingHub(`${origin}/teaching`));
});

app.get('/teaching/:slug', (req, res, next) => {
  const course = teachingData.courses.find(({ slug }) => slug === req.params.slug);
  const canonicalUrl = `${origin}/teaching/${encodeURIComponent(req.params.slug)}`;
  const metadata = metadataForCourse(course, canonicalUrl);
  if (!course) metadata.status = 404;
  sendTeachingPreview(req, res, next, metadata);
});

// Delegate all other requests to the framework app. Only this outer app listens.
app.use(sliceServer.app);

if (!process.env.VERCEL) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`🚀 Slice.js server running on port ${port}`);
  });
}

export default app;
