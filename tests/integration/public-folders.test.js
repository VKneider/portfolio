import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, stopServer } from './utils/server.js';
import { expectStatus, fetchWithRetry } from './utils/http.js';

const projectRoot = new URL('../../', import.meta.url).pathname;
const PORT = 4310;
let serverProcess;

afterEach(async () => {
  await stopServer(serverProcess);
  serverProcess = null;
});

test('production mode only serves public folders and bundles', async () => {
  // Arrange
  serverProcess = await startServer({
    cwd: projectRoot,
    port: PORT,
    env: { NODE_ENV: 'production' },
    build: true
  });

  const baseUrl = `http://localhost:${PORT}`;

  // Act & Assert
  await expectStatus(`${baseUrl}/Themes/CobaltBlue.css`, 200);

  const sliceResponse = await fetchWithRetry(`${baseUrl}/Slice/Slice.js`);
  assert.equal(sliceResponse.status, 200);

  const srcResponse = await fetchWithRetry(`${baseUrl}/Components/components.js`);
  assert.notEqual(srcResponse.status, 200);

  const bundleConfigResponse = await fetchWithRetry(`${baseUrl}/bundles/bundle.config.json`);
  assert.equal(bundleConfigResponse.status, 200);
});
