#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable no-console */
const { spawn } = require('child_process');

function spawnEslint(cliArgs) {
  // Run ESLint via Yarn to leverage PnP-aware binary resolution
  const yarnBin = process.platform === 'win32' ? 'yarn.cmd' : 'yarn';
  return spawn(yarnBin, ['run', 'eslint', ...cliArgs], {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: process.env,
    shell: true,
  });
}

function main() {
  const userArgs = process.argv.slice(2);

  // If the user did not pass file globs, lint common source folders by default
  const hasPatterns = userArgs.some((a) => !a.startsWith('-'));
  const patterns = hasPatterns
    ? []
    : ['src/**/*.{ts,tsx,js,jsx}', 'scripts/**/*.{ts,tsx,js,jsx}', '*.config.{js,cjs,mjs,ts}'];

  const args = ['--max-warnings=0', ...userArgs, ...patterns];

  const child = spawnEslint(args);

  child.on('exit', (code) => process.exit(code));
  child.on('error', (err) => {
    console.error('[es-lint] Failed to run eslint:', err);
    process.exit(2);
  });
}

main();
