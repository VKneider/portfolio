import { fileURLToPath } from 'node:url';
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, stopServer } from './utils/server.js';
import { expectStatus } from './utils/http.js';

const projectRoot = fileURLToPath(new URL('../../', import.meta.url));
const PROD_PORT = 4342;
let serverProcess;

afterEach(async () => {
  await stopServer(serverProcess);
  serverProcess = null;
});

// Regression: framework 4.1.1 moved the SPA fallback out of the factory and into
// start(). This entrypoint never calls start() (Vercel imports the exported app),
// so without mounting sliceFallback() every page route answered Express's default
// 404 ("Cannot GET /") while /api/* and the static files kept working.
test('production entrypoint serves / and SPA deep routes with the shell', async () => {
  serverProcess = await startServer({
    cwd: projectRoot,
    port: PROD_PORT,
    env: { NODE_ENV: 'production' },
    build: true
  });

  for (const route of ['/', '/experience']) {
    const response = await expectStatus(`http://localhost:${PROD_PORT}${route}`, 200);
    assert.match(response.headers.get('content-type') || '', /text\/html/i);

    const body = await response.text();
    assert.match(body, /<div id="app">/);
    assert.doesNotMatch(body, /Cannot GET/);
  }
});
