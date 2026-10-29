import express from 'express';
import {
  createSliceServer,
  prepareSeo,
  sliceFallback,
  sliceErrorHandler
} from 'slicejs-web-framework/api/framework/server.js';
import { readContent, resolveContentFor } from 'slicejs-web-framework/api/framework/content.js';
import discoverThemes from './utils/themesDiscovery.js';
import fs from 'node:fs/promises';
import path from 'node:path';

const serverOptions = { projectRoot: process.cwd() };
const sliceServer = createSliceServer(serverOptions);
const app = express();
const brandTitle = 'Victor Kneider — Software Design & Architecture';
const defaultImage = 'https://vkneider.dev/images/og-image.png';
const origin = (process.env.PUBLIC_SITE_URL || 'https://vkneider.dev').replace(/\/+$/, '');
const contentRoot = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

async function readTranslatorConfig() {
  try {
    const file = path.join(process.cwd(), contentRoot, 'sliceConfig.json');
    return JSON.parse(await fs.readFile(file, 'utf8')).translator || {};
  } catch {
    return { defaultLocale: 'en', locales: ['en'], path: '/locales' };
  }
}

async function readDictionaries(config) {
  const folder = String(config.path || '/locales').replace(/^\/+|\/+$/g, '') || 'locales';
  const locales = [...new Set([config.defaultLocale, ...(config.locales || [])].filter(Boolean))];
  const dictionaries = {};
  for (const locale of locales) {
    try {
      dictionaries[locale] = JSON.parse(
        await fs.readFile(path.join(process.cwd(), contentRoot, folder, `${locale}.json`), 'utf8')
      );
    } catch {
      dictionaries[locale] = {};
    }
  }
  return dictionaries;
}

const translatorConfig = await readTranslatorConfig();
const dictionaries = await readDictionaries(translatorConfig);
const teachingByLocale = {};

for (const locale of translatorConfig.locales || [translatorConfig.defaultLocale || 'en']) {
  try {
    const document = readContent(process.cwd(), 'teaching', {
      deployedFolder: contentRoot,
      translator: translatorConfig
    });
    teachingByLocale[locale] = resolveContentFor(document, translatorConfig, locale);
  } catch (error) {
    console.warn(`[portfolio] Could not read teaching content for "${locale}": ${error.message}`);
  }
}

function brandFor(locale) {
  return dictionaries[locale]?.brand?.title || brandTitle;
}

function teachingLabel(locale) {
  return dictionaries[locale]?.teaching?.title || 'Teaching';
}

function teachingDescription(locale) {
  return dictionaries[locale]?.teaching?.subtitle
    || 'Course syllabi and learning resources developed and shared by Victor Kneider.';
}

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

function metadataForCourse(course, canonicalUrl, locale, alternates) {
  if (!course) {
    return {
      title: `${dictionaries[locale]?.teaching?.notFound || 'Course not found'} | ${teachingLabel(locale)} | ${brandFor(locale)}`,
      description: teachingDescription(locale),
      canonicalUrl,
      locale,
      alternates
    };
  }

  return {
    title: `${course.name} | ${teachingLabel(locale)} | ${brandFor(locale)}`,
    description: course.description,
    canonicalUrl,
    locale,
    alternates
  };
}

function metadataForTeachingHub(canonicalUrl, locale, alternates) {
  return {
    title: `${teachingLabel(locale)} | ${brandFor(locale)}`,
    description: teachingDescription(locale),
    canonicalUrl,
    locale,
    alternates
  };
}

function teachingAlternates(locale, path) {
  return [
    { hreflang: 'en', href: `${origin}${path}` },
    { hreflang: 'es', href: `${origin}/es${path}` },
    { hreflang: 'x-default', href: `${origin}${path}` }
  ];
}

function injectPreviewMetadata(html, metadata) {
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const canonicalUrl = escapeHtml(metadata.canonicalUrl);
  const image = escapeHtml(defaultImage);
  const locale = metadata.locale === 'es' ? 'es' : 'en';
  const ogLocale = locale === 'es' ? 'es_ES' : 'en_US';
  let output = html
    .replace(/<html\b([^>]*)>/i, (match, attributes) => {
      const next = /\slang="/i.test(attributes)
        ? attributes.replace(/\slang="[^"]*"/i, ` lang="${locale}"`)
        : `${attributes} lang="${locale}"`;
      return `<html${next}>`;
    })
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(/\s*<link\s+rel=["']alternate["'][^>]*>/gi, '');
  const metadataTags = [
    [/\s*<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${description}">`],
    [/\s*<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonicalUrl}">`],
    [/\s*<meta\s+property=["']og:type["'][^>]*>/i, '<meta property="og:type" content="website">'],
    [/\s*<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${title}">`],
    [/\s*<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${description}">`],
    [/\s*<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${canonicalUrl}">`],
    [/\s*<meta\s+property=["']og:image["'][^>]*>/i, `<meta property="og:image" content="${image}">`],
    [/\s*<meta\s+property=["']og:locale["'][^>]*>/i, `<meta property="og:locale" content="${ogLocale}">`],
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

  const alternates = (metadata.alternates || [])
    .map((alternate) => `<link rel="alternate" hreflang="${escapeHtml(alternate.hreflang)}" href="${escapeHtml(alternate.href)}">`)
    .join('\n    ');
  if (alternates) output = output.replace(/<\/head>/i, `    ${alternates}\n  </head>`);
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

app.get(['/teaching', '/es/teaching'], (req, res, next) => {
  const locale = req.path.startsWith('/es/') ? 'es' : (translatorConfig.defaultLocale || 'en');
  sendTeachingPreview(
    req,
    res,
    next,
    metadataForTeachingHub(`${origin}${req.path}`, locale, teachingAlternates(locale, '/teaching'))
  );
});

app.get(['/teaching/:slug', '/es/teaching/:slug'], (req, res, next) => {
  const locale = req.path.startsWith('/es/') ? 'es' : (translatorConfig.defaultLocale || 'en');
  const courses = teachingByLocale[locale]?.courses || [];
  const course = courses.find(({ slug }) => slug === req.params.slug) || null;
  const canonicalUrl = `${origin}${req.path}`;
  const path = `/teaching/${encodeURIComponent(req.params.slug)}`;
  const metadata = metadataForCourse(course, canonicalUrl, locale, teachingAlternates(locale, path));
  if (!course) metadata.status = 404;
  sendTeachingPreview(req, res, next, metadata);
});

// Per-route, per-locale head: the framework reads seo.json, prerenders every literal
// route and serves the cached page from the fallback. The custom teaching handlers above
// still own the course-specific metadata (a ${slug} title cannot come from the manifest).
const seo = await prepareSeo({
  projectRoot: process.cwd(),
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  port: Number(process.env.PORT) || 3001,
  seo: { manifest: './seo.json' }
});

// Delegate all other requests to the framework app. Only this outer app listens.
app.use(sliceServer.app);

// This entrypoint never calls `sliceServer.start()`, so it owns the end of the
// stack: without the fallback, "/" (and every SPA route) answers Express's
// default 404 ("Cannot GET /") in production and on Vercel. `start()` mounts
// these automatically for apps that use it; this adapter closes the chain here.
app.use(sliceFallback({ ...serverOptions, seo }));
app.use(sliceErrorHandler(serverOptions));

if (!process.env.VERCEL) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`🚀 Slice.js server running on port ${port}`);
  });
}

export default app;
