const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  let repo = core.getInput('app') + '-';
  let environment = core.getInput('environment');

  if (github.context.eventName !== 'workflow_dispatch') {
    if (github.context.ref.includes('main')) {
      environment = 'prod';
      core.info('Calculated "prod" as environment because we are pushing to the main branch...');
    }
    else if (github.context.ref.includes('staging')) {
      environment = 'staging';
      core.info('Calculated "staging" as environment because we are pushing to the staging branch...');
    }
    else {
      environment = "dev";
      core.info('Calculated "dev" as environment...');
    }
  }

  core.info('Final environment is', environment);
  core.setOutput('environment', environment);
    
  repo += environment;

  core.info('Final app name is', repo);
  core.setOutput('appName', repo);

  const layer = core.getInput('layer');
  if (layer) {
    repo += '-' + layer;
  }

  core.info('Final repository is', repo);
  core.setOutput('repository', repo);
}

run();
