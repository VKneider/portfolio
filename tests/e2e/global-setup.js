import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const portfolioRoot = path.resolve(__dirname, '../..');

export default async function globalSetup(_config) {
  // Only build when SLICE_BUILD=true is set.
  // The `--project` filter is NOT visible in globalSetup (Playwright always passes all
  // configured projects), so we rely on an explicit env var instead.
  if (!process.env.SLICE_BUILD) {
    console.log('[global-setup] Skipping build (SLICE_BUILD not set).');
    return;
  }

  console.log('[global-setup] Running slice build for production tests...');
  execSync('node node_modules/slicejs-cli/client.js build', {
    cwd: portfolioRoot,
    stdio: 'inherit',
  });
  console.log('[global-setup] Build complete.');
}
