import * as core from "@actions/core";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/requests";

const operousUrl = "https://app.operous.dev/graphql";
const graphqlClientBase = new GraphQLClient(operousUrl);
const graphqlClient = getSdk(graphqlClientBase);

const sleep = (date) => new Promise((resolve) => setTimeout(resolve, date));

const trackTestRun = async (instanceName, testRunId) => {
  while (true) {
    const testRun = await graphqlClient
      .instance({
        testRunId: testRunId,
        instanceName: instanceName,
      })
      .then((response) => {
        return response.instance.testRun;
      });
    switch (testRun.status) {
      case "FAILED":
      case "SUCCESS":
        return testRun;
      case "RUNNING":
        // Wait 10 seconds to validate if test has ended
        core.info("Waiting test execution completion.");
        await sleep(10 * 1000);
        break;
      default:
        throw "Could not verify test run status.";
    }
  }
};

const startTestRun = async (instanceId) => {
  return await graphqlClient
    .startTestRun({
      instanceId: instanceId,
    })
    .then((response) => {
      if (typeof response.startTestRun === "number") {
        core.info("Started test run.");
        return response.startTestRun;
      }
    });
};

const checkToken = async () => {
  return await graphqlClient.checkToken().then((response) => {
    if (
      typeof response.checkToken === "string" &&
      response.checkToken === "Token is valid!"
    ) {
      core.info("Token is valid.");
      return true;
    } else {
      return false;
    }
  });
};

const getAccountInstance = async (instanceName) => {
  return await graphqlClient.instances().then((response) => {
    if (Array.isArray(response.instances)) {
      const matchedInstance = response.instances.filter(
        (instance) =>
          instance.name === instanceName || instance.identifier === instanceName
      )[0];
      return matchedInstance;
    }
  });
};

async function main() {
  try {
    const instanceName = core.getInput("instanceName", { required: true });
    const accountToken = core.getInput("accountToken", { required: true });

    graphqlClientBase.setHeader("Authorization", `Token ${accountToken}`);

    const isTokenValid = await checkToken();
    if (!isTokenValid) {
      throw "Invalid token. Please verify if the token has expired or been deleted";
    }

    const instanceData = await getAccountInstance(instanceName);
    if (!instanceData) {
      throw `No instance named ${instanceName} found on this Operous account.`;
    }

    const testRunId = await startTestRun(instanceData.identifier);
    if (!testRunId) {
      throw `Could not start a new Test Run. Verify if the correct parameters were passed`;
    }

    const testRunData = await trackTestRun(instanceName, testRunId);

    const testsMessage = testRunData.tests
      .map((test) => `${test.passed ? "✅" : "❌"} ${test.id}: ${test.text}`)
      .join("\n");

    const hasConnectivty = testRunData.tests.every(
      (test) => test.passed != null
    );
    if (!hasConnectivty) {
      throw "Operous could not reach the server. Please verify the instance connectivity";
    }
    const hasAllPassed = testRunData.tests.every(
      (test) => test.passed === true
    );

    if (hasAllPassed) {
      core.info("\n" + testsMessage);
    } else {
      core.setFailed("\n" + testsMessage);
    }
  } catch (error) {
    core.setFailed("\n" + error);
  }
}

main();
