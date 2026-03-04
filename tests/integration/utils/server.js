import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { fetchWithRetry } from './http.js';

const cliPath = new URL('../../../../slicejs-cli/client.js', import.meta.url).pathname;

export async function buildProject({ cwd, env, extraArgs = [] }) {
  await runCommand('node', [cliPath, 'build', ...extraArgs], { cwd, env });
}

export async function startServer({ cwd, port, env, build = false }) {
  if (build) {
    await buildProject({ cwd, env });
  }

  const serverProcess = spawn('node', [cliPath, 'start', '--port', String(port)], {
    cwd,
    env: {
      ...process.env,
      ...env,
      PORT: String(port)
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  await waitForReady(serverProcess, port, 20_000);

  return serverProcess;
}

export async function stopServer(serverProcess) {
  if (!serverProcess || serverProcess.killed) return;

  serverProcess.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => serverProcess.once('exit', resolve)),
    delay(3000)
  ]);

  if (!serverProcess.killed) {
    serverProcess.kill('SIGKILL');
  }
}

async function waitForReady(serverProcess, port, timeoutMs) {
  const startedAt = Date.now();
  const baseUrl = `http://localhost:${port}`;

  while (Date.now() - startedAt < timeoutMs) {
    if (serverProcess.exitCode !== null) {
      throw new Error(`Server exited early with code ${serverProcess.exitCode}`);
    }

    try {
      const response = await fetchWithRetry(`${baseUrl}/api/status`, { retries: 0 });
      if (response.ok) {
        return;
      }
    } catch (error) {
      await delay(200);
    }
  }

  const stdout = serverProcess.stdout?.read?.()?.toString?.() || '';
  const stderr = serverProcess.stderr?.read?.()?.toString?.() || '';
  throw new Error(`Server did not become ready in time.\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`);
}

function runCommand(command, args, { cwd, env }) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: {
        ...process.env,
        ...env
      },
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed (${command} ${args.join(' ')}):\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`));
      }
    });
  });
}
