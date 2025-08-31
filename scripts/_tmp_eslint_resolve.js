require('../.pnp.cjs');
try {
  const pkg = require.resolve('eslint/package.json');
  // eslint-disable-next-line no-console
  console.log('eslint package.json:', pkg);
  const resolvedBin = require.resolve('eslint/bin/eslint.js');
  // eslint-disable-next-line no-console
  console.log('eslint bin:', resolvedBin);
} catch (e) {
  console.error('Resolve error:', e && (e.message || e));
  process.exit(1);
}
