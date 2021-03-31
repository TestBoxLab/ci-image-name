const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  let repo = core.getInput('app') + '-';

  if (github.context.eventName === 'workflow_dispatch') {
    core.info('This job was fired by a workflow dispatch.');
    core.info('Using the provided environment name...');
    const environment = core.getInput('environment');
    if (environment) {
      repo += environment;
    }
    else {
      repo += "dev";
    }
  }
  else {
    if (github.context.ref.includes('main')) {
      repo += 'prod';
    }
    else if (github.context.ref.includes('staging')) {
      repo += 'staging';
    }
    else {
      repo += "dev";
    }
  }

  const layer = core.getInput('layer');
  if (layer) {
    repo += '-' + layer;
  }

  core.setOutput('repository', repo);
}

run();
