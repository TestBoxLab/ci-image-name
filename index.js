const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  let repo = core.getInput('app') + '-';

  if (github.context.eventName === 'workflow_dispatch') {
    core.info('This job was fired by a workflow dispatch.');
    core.info('Using the provided environment name...');
    repo += core.getInput('environment');
  }
  else {
    repo += 'prod';
  }

  const layer = core.getInput('layer');
  if (layer) {
    repo += '-' + layer;
  }

  core.setOutput('repository', repo);
}

run();
