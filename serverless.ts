import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'serverless-canary',
  frameworkVersion: '*',
  custom: {
    'serverless-plugin-canary-deployments': {
      stages: ['canary'],
      preTrafficHook: 'preTrafficHook',
      postTrafficHook: 'postTrafficHook',
      automaticRollback: true,
      type: 'Linear10PercentEvery2Minute',
      alias: 'Live',
    },
  },
  plugins: ['serverless-webpack', 'serverless-plugin-canary-deployments'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'us-east-1', // or your preferred region
    stage: 'canary',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['lambda:InvokeFunction'],
        Resource: '*',
      },
    ],
  },
  functions: {
    hello: {
      handler: 'src/handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          },
        },
      ],
    },
    preTrafficHook: {
      handler: 'src/handler.preTrafficHook',
      description: 'Lambda function that gets invoked before traffic shifting',
      memorySize: 128,
      timeout: 30,
    },
    postTrafficHook: {
      handler: 'src/handler.postTrafficHook',
      description: 'Lambda function that gets invoked after traffic shifting',
      memorySize: 128,
      timeout: 30,
    },
  },
};

module.exports = serverlessConfiguration;
