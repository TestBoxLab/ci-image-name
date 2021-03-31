const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  let repo = core.getInput('app') + '-';
  let environment = core.getInput('environment');

  if (github.context.eventName !== 'workflow_dispatch') {
    if (github.context.ref.includes('main')) {
      environment = 'prod';
    }
    else if (github.context.ref.includes('staging')) {
      environment = 'staging';
    }
    else {
      environment = "dev";
    }
  }

  core.setOutput('environment', environment);
    
  repo += environment;

  core.setOutput('appName', repo);

  const layer = core.getInput('layer');
  if (layer) {
    repo += '-' + layer;
  }

  core.setOutput('repository', repo);
}

run();
