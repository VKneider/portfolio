import { setTimeout as delay } from 'node:timers/promises';

export async function fetchWithRetry(url, options = {}) {
  const { retries = 10, delayMs = 250, ...fetchOptions } = options;

  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, fetchOptions);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await delay(delayMs);
      }
    }
  }

  throw lastError;
}

export async function expectStatus(url, status, options = {}) {
  const response = await fetchWithRetry(url, options);
  if (response.status !== status) {
    throw new Error(`Expected ${status} for ${url} but got ${response.status}`);
  }
  return response;
}
