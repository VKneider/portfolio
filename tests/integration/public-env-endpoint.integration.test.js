import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, stopServer } from './utils/server.js';
import { expectStatus } from './utils/http.js';

const projectRoot = new URL('../../', import.meta.url).pathname;
const DEV_PORT = 4340;
const PROD_PORT = 4341;
let serverProcess;

afterEach(async () => {
  await stopServer(serverProcess);
  serverProcess = null;
});

const sharedEnv = {
  SLICE_PUBLIC_API_URL: 'https://api.slice.test',
  SLICE_PUBLIC_FEATURE_FLAG: 'on',
  SECRET_API_KEY: 'top-secret',
  INTERNAL_TOKEN: 'internal-only'
};

test('development mode /slice-env.json returns 200 with mode and filtered env', async () => {
  serverProcess = await startServer({
    cwd: projectRoot,
    port: DEV_PORT,
    env: { NODE_ENV: 'development', ...sharedEnv }
  });

  const response = await expectStatus(`http://localhost:${DEV_PORT}/slice-env.json`, 200);
  await assertPublicEnvContract(response, 'development');
});

test('production mode /slice-env.json returns 200 with mode and filtered env', async () => {
  serverProcess = await startServer({
    cwd: projectRoot,
    port: PROD_PORT,
    env: { NODE_ENV: 'production', ...sharedEnv }
  });

  const response = await expectStatus(`http://localhost:${PROD_PORT}/slice-env.json`, 200);
  await assertPublicEnvContract(response, 'production');
});

async function assertPublicEnvContract(response, expectedMode) {
  const cacheControl = response.headers.get('cache-control') || '';
  assert.match(cacheControl, /no-store/i);

  const contentType = response.headers.get('content-type') || '';
  assert.match(contentType, /application\/json/i);

  const body = await response.json();
  assert.equal(body.mode, expectedMode);
  assert.ok(body.env !== null && typeof body.env === 'object' && !Array.isArray(body.env));

  const publicEnvEntries = Object.entries(body.env);
  for (const [key, value] of publicEnvEntries) {
    assert.match(key, /^SLICE_PUBLIC_/);
    assert.equal(typeof value, 'string');
  }

  const sortedKeys = Object.keys(body.env).sort();
  assert.deepEqual(sortedKeys, ['SLICE_PUBLIC_API_URL', 'SLICE_PUBLIC_FEATURE_FLAG']);
  assert.equal(body.env.SLICE_PUBLIC_API_URL, sharedEnv.SLICE_PUBLIC_API_URL);
  assert.equal(body.env.SLICE_PUBLIC_FEATURE_FLAG, sharedEnv.SLICE_PUBLIC_FEATURE_FLAG);
  assert.equal('SECRET_API_KEY' in body.env, false);
  assert.equal('INTERNAL_TOKEN' in body.env, false);
}
