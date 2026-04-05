import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fetchWithRetry } from './http.js';

export async function buildProject({ cwd, env, extraArgs = [] }) {
  const cliPath = resolveCliPath(cwd);
  await runCommand('node', [cliPath, 'build', ...extraArgs], { cwd, env });
}

export async function startServer({ cwd, port, env, build = false }) {
  const modeFlag = env?.NODE_ENV === 'production' ? '--production' : '--development';
  const serverEntry = path.join(cwd, 'api', 'index.js');

  if (build) {
    await buildProject({ cwd, env });
  }

  const serverProcess = spawn('node', [serverEntry, modeFlag, '--port', String(port)], {
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
  if (!serverProcess || serverProcess.exitCode !== null) return;

  serverProcess.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => serverProcess.once('exit', resolve)),
    delay(3000)
  ]);

  if (serverProcess.exitCode === null) {
    serverProcess.kill('SIGKILL');
    await Promise.race([
      new Promise((resolve) => serverProcess.once('exit', resolve)),
      delay(3000)
    ]);
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
    } catch (error) {}

    await delay(200);
  }

  const stdout = serverProcess.stdout?.read?.()?.toString?.() || '';
  const stderr = serverProcess.stderr?.read?.()?.toString?.() || '';
  throw new Error(`Server did not become ready in time.\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`);
}

function resolveCliPath(cwd) {
  let currentDir = path.resolve(cwd);

  while (true) {
    const nodeModulesCliPath = path.join(currentDir, 'node_modules', 'slicejs-cli', 'client.js');
    if (existsSync(nodeModulesCliPath)) {
      return nodeModulesCliPath;
    }

    const workspaceCliPath = path.join(currentDir, 'slicejs-cli', 'client.js');
    if (existsSync(workspaceCliPath)) {
      return workspaceCliPath;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }

    currentDir = parentDir;
  }

  throw new Error(`Could not locate slicejs-cli/client.js from cwd: ${cwd}`);
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
