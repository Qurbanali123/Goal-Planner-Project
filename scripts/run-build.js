#!/usr/bin/env node
const path = require('path');
const { spawn } = require('child_process');

const buildScript = path.resolve(__dirname, '../node_modules/react-scripts/scripts/build.js');
const node = process.execPath || 'node';

const child = spawn(node, [buildScript], { stdio: 'inherit' });
child.on('close', (code) => process.exit(code));
child.on('error', (err) => {
  console.error('Failed to start build script:', err);
  process.exit(1);
});
