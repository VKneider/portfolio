import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { buildProject, startServer, stopServer } from './utils/server.js';
import { fetchWithRetry, expectStatus } from './utils/http.js';

const projectRoot = new URL('../../', import.meta.url).pathname;
const distPath = new URL('../../dist', import.meta.url).pathname;
const PORT = 4330;
let serverProcess;

afterEach(async () => {
  await stopServer(serverProcess);
  serverProcess = null;
});

test('build then start returns api status', async () => {
  // Arrange
  await buildProject({ cwd: projectRoot, env: { NODE_ENV: 'production' } });
  serverProcess = await startServer({
    cwd: projectRoot,
    port: PORT,
    env: { NODE_ENV: 'production' }
  });

  const baseUrl = `http://localhost:${PORT}`;

  // Act
  const response = await expectStatus(`${baseUrl}/api/status`, 200);
  const payload = await response.json();

  // Assert
  assert.equal(payload.status, 'ok');
  assert.equal(payload.mode, 'production');
});

test('build can disable minification and obfuscation', async () => {
  // Arrange
  await fs.rm(path.join(distPath, 'bundles'), { recursive: true, force: true });
  await buildProject({
    cwd: projectRoot,
    env: { NODE_ENV: 'production' },
    extraArgs: ['--no-minify', '--no-obfuscate']
  });
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
  assert.equal(config.minified, false);
  assert.equal(config.obfuscated, false);
});

test('missing bundle file returns non-200', async () => {
  // Arrange
  await buildProject({ cwd: projectRoot, env: { NODE_ENV: 'production' } });
  serverProcess = await startServer({
    cwd: projectRoot,
    port: PORT,
    env: { NODE_ENV: 'production' }
  });

  const baseUrl = `http://localhost:${PORT}`;

  // Act
  const response = await fetchWithRetry(`${baseUrl}/bundles/slice-bundle.missing.js`);

  // Assert
  assert.notEqual(response.status, 200);
});

test('bundle output does not embed raw eval', async () => {
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
  const config = await configResponse.json();
  const criticalBundlePath = `${baseUrl}/bundles/${config.bundles.critical.file}`;
  const criticalResponse = await expectStatus(criticalBundlePath, 200);
  const criticalText = await criticalResponse.text();

  // Assert
  assert.ok(!criticalText.includes('new Function'));
});
