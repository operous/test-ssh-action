"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listInstances = exports.checkToken = exports.startTestRun = exports.getInstance = void 0;
const graphql_request_1 = require("graphql-request");
exports.getInstance = graphql_request_1.gql `
  query ($testRunId: Int!, $instanceName: String!) {
    instance(input: { value: $instanceName, kind: NAME }) {
      name
      testRun(number: $testRunId) {
        number
        status
        time
        tests {
          id
          passed
          text
        }
      }
    }
  }
`;
exports.startTestRun = graphql_request_1.gql `
  mutation ($instanceId: ID!) {
    startTestRun(input: { serverId: $instanceId })
  }
`;
exports.checkToken = graphql_request_1.gql `
  mutation {
    checkToken
  }
`;
exports.listInstances = graphql_request_1.gql `
  {
    instances {
      identifier
      name
    }
  }
`;
//# sourceMappingURL=queries.js.map