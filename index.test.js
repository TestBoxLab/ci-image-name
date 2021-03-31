const wait = require('./wait');
const process = require('process');
const cp = require('child_process');
const path = require('path');

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_APP'] = 'testbox';
  process.env['INPUT_ENVIRONMENT'] = '';
  const ip = path.join(__dirname, 'index.js');
  console.log(cp.execSync(`node ${ip}`, {env: process.env}).toString());
})
