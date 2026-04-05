import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { expectStatus, fetchWithRetry } from './utils/http.js';

const projectRoot = new URL('../../', import.meta.url).pathname;
const DEV_PORT = 4340;
const PROD_PORT = 4341;
let serverProcess;

afterEach(async () => {
  await stopServerProcess(serverProcess);
  serverProcess = null;
});

const sharedEnv = {
  PUBLIC_API_URL: 'https://api.slice.test',
  PUBLIC_FEATURE_FLAG: 'on',
  SECRET_API_KEY: 'top-secret',
  INTERNAL_TOKEN: 'internal-only'
};

test('development mode /slice-env.json returns 200 with mode and filtered env', async () => {
  serverProcess = await startApiServer({
    cwd: projectRoot,
    port: DEV_PORT,
    env: { NODE_ENV: 'development', ...sharedEnv }
  });

  const response = await expectStatus(`http://localhost:${DEV_PORT}/slice-env.json`, 200);
  await assertPublicEnvContract(response, 'development');
});

test('production mode /slice-env.json returns 200 with mode and filtered env', async () => {
  serverProcess = await startApiServer({
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
    assert.match(key, /^PUBLIC_/);
    assert.equal(typeof value, 'string');
  }

  const sortedKeys = Object.keys(body.env).sort();
  assert.deepEqual(sortedKeys, ['PUBLIC_API_URL', 'PUBLIC_FEATURE_FLAG']);
  assert.equal(body.env.PUBLIC_API_URL, sharedEnv.PUBLIC_API_URL);
  assert.equal(body.env.PUBLIC_FEATURE_FLAG, sharedEnv.PUBLIC_FEATURE_FLAG);
  assert.equal('SECRET_API_KEY' in body.env, false);
  assert.equal('INTERNAL_TOKEN' in body.env, false);
}

async function startApiServer({ cwd, port, env }) {
  const processHandle = spawn('node', ['api/index.js'], {
    cwd,
    env: {
      ...process.env,
      ...env,
      PORT: String(port)
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  await waitForReady(processHandle, port, 20_000);
  return processHandle;
}

async function waitForReady(processHandle, port, timeoutMs) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (processHandle.exitCode !== null) {
      throw new Error(`Server exited early with code ${processHandle.exitCode}`);
    }

    try {
      const response = await fetchWithRetry(`http://localhost:${port}/api/status`, { retries: 0 });
      if (response.ok) {
        return;
      }
      await delay(200);
    } catch {
      await delay(200);
    }
  }

  throw new Error('Server did not become ready in time');
}

async function stopServerProcess(processHandle) {
  if (!processHandle || processHandle.exitCode !== null) return;

  processHandle.kill('SIGTERM');
  await waitForExit(processHandle, 3_000);

  if (processHandle.exitCode === null) {
    processHandle.kill('SIGKILL');
    await waitForExit(processHandle, 3_000);
  }
}

async function waitForExit(processHandle, timeoutMs) {
  if (processHandle.exitCode !== null) return;

  await Promise.race([
    new Promise((resolve) => processHandle.once('exit', resolve)),
    delay(timeoutMs)
  ]);
}
