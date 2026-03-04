import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { buildProject, startServer, stopServer } from './utils/server.js';
import { fetchWithRetry, expectStatus } from './utils/http.js';

const projectRoot = new URL('../../', import.meta.url).pathname;
const PORT = 4320;
let serverProcess;

afterEach(async () => {
  await stopServer(serverProcess);
  serverProcess = null;
});

test('build emits bundle config and JS bundles in dist', async () => {
  // Arrange
  await buildProject({ cwd: projectRoot, env: { NODE_ENV: 'production' } });
  serverProcess = await startServer({
    cwd: projectRoot,
    port: PORT,
    env: { NODE_ENV: 'production' }
  });

  const baseUrl = `http://localhost:${PORT}`;

  // Act & Assert
  const configResponse = await expectStatus(`${baseUrl}/bundles/bundle.config.json`, 200);
  const contentType = configResponse.headers.get('content-type') || '';
  assert.match(contentType, /application\/json/);
  const config = await configResponse.json();
  assert.ok(config.bundles?.critical?.file, 'Critical bundle file missing');

  assert.equal(config.minified, true);
  assert.equal(config.obfuscated, true);

  const hasFrameworkStructural = config.bundles.framework.components.some((name) =>
    name.startsWith('Framework/Structural/')
  );
  assert.equal(hasFrameworkStructural, true);

  const criticalBundlePath = `${baseUrl}/bundles/${config.bundles.critical.file}`;
  const criticalResponse = await expectStatus(criticalBundlePath, 200);
  const criticalText = await criticalResponse.text();
  assert.match(criticalText, /SLICE_BUNDLE_COMPONENTS/);

  const frameworkBundlePath = `${baseUrl}/bundles/${config.bundles.framework.file}`;
  const frameworkResponse = await expectStatus(frameworkBundlePath, 200);
  const frameworkText = await frameworkResponse.text();
  assert.match(frameworkText, /SLICE_BUNDLE_COMPONENTS/);
});

test('bundle integrity values are present in config', async () => {
  // Arrange
  await buildProject({ cwd: projectRoot, env: { NODE_ENV: 'production' } });
  serverProcess = await startServer({
    cwd: projectRoot,
    port: PORT,
    env: { NODE_ENV: 'production' }
  });

  const baseUrl = `http://localhost:${PORT}`;

  // Act
  const configResponse = await expectStatus(`${baseUrl}/bundles/bundle.config.json`, 200);
  const contentType = configResponse.headers.get('content-type') || '';
  assert.match(contentType, /application\/json/);
  const config = await configResponse.json();

  // Assert
  assert.match(config.bundles.critical.integrity || '', /^sha256:[a-f0-9]{64}$/);
});
