import { gql } from "graphql-request";

export const getInstance = gql`
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

export const startTestRun = gql`
  mutation ($instanceId: ID!) {
    startTestRun(input: { serverId: $instanceId })
  }
`;

export const checkToken = gql`
  mutation {
    checkToken
  }
`;

export const listInstances = gql`
  {
    instances {
      identifier
      name
    }
  }
`;
