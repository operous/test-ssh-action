import * as core from "@actions/core";
import axios from "axios";

const operousUrl = "https://app.operous.dev/graphql";
const sleep = (date) => new Promise((resolve) => setTimeout(resolve, date));

const trackTestRun = async (instanceName, testRunId, axiosConfig) => {
  enum statusEnum {
    "FAILED",
    "SUCCESS",
    "RUNNING",
  }
  interface Test {
    id: string;
    passed: boolean;
    suite: string;
    text: string;
  }
  interface TestRunType {
    number: number;
    status: statusEnum;
    time: Date;
    tests: [Test];
  }
  var isTestRunning = false;

  while (isTestRunning) {
    const testRun: TestRunType = await axios
      .post(
        operousUrl,
        {
          query: `{"query":"{  instance(input:{value: \"${instanceName}\", kind:NAME}){    name    testRun (number:${testRunId}){      number      status      time      tests{          id          passed          suite          text      }    }  }}"}`,
        },
        axiosConfig
      )
      .then((response) => {
        console.log("-->", response);
        return response.data.instance.testRun;
      });
    switch (testRun.status) {
      case statusEnum.FAILED:
      case statusEnum.SUCCESS:
        return testRun;
        break;
      case statusEnum.RUNNING:
        break;
      default:
        throw "Could not verify test run status.";
    }
    // Wait 30 seconds to validate if test has ended
    sleep(30 * 1000);
  }
};

const startTestRun = (instanceId, axiosConfig) => {
  const testRunId = axios
    .post(
      operousUrl,
      {
        query: `mutation { startTestRun (input: {serverId: \"${instanceId}\"})}`,
      },
      axiosConfig
    )
    .then((response) => {
      console.log("-->", response);
      return response.data.startTestRun;
    });

  if (typeof testRunId === "number") {
    return testRunId;
  }
};

const checkToken = async (axiosConfig) => {
  const response = await axios
    .post(
      operousUrl,
      {
        query: "{ mutation{ checkToken } }",
      },
      axiosConfig
    )
    .then((response) => {
      console.log("-->", response);
      return response.data.checkToken;
    });
  if (typeof response === "string" && response === "Token is valid!") {
    return true;
  }
  return false;
};

const getAccountInstance = async (instanceName, axiosConfig) => {
  type queryResponse = {
    identifier: string;
    name: string;
  };

  const accountInstances = await axios
    .post(
      operousUrl,
      {
        query: "{ instances { identifier    name } }",
      },
      axiosConfig
    )
    .then((response) => {
      console.log("-->", response);
      return response.data;
    });

  if (Array.isArray(accountInstances)) {
    const matchedInstance: queryResponse = accountInstances.filter(
      (instance) =>
        instance.name === instanceName || instance.identifier === instanceName
    )[0];
    console.log("-->", instanceName, matchedInstance);
    return matchedInstance;
  }
};

async function main() {
  try {
    const instanceName = core.getInput("instanceName", { required: true });
    const accountToken = core.getInput("accountToken", { required: true });
    const axiosConfig = {
      headers: `Token ${accountToken}`,
    };

    const isTokenValid = await checkToken(axiosConfig);
    if (!isTokenValid) {
      throw "Invalid token. Please verify if the token has expired or been deleted";
    }

    const instanceData = await getAccountInstance(instanceName, axiosConfig);
    if (!instanceData) {
      throw `No instance named ${instanceName} found on this Operous account.`;
    }

    const testRunId = await startTestRun(instanceData.identifier, axiosConfig);
    if (Boolean(testRunId)) {
      throw `Could not start a new Test Run. Verify if the correct parameters were passed`;
    }

    const testRunData = await trackTestRun(
      instanceName,
      testRunId,
      axiosConfig
    );
    const testsMessage = testRunData.tests
      .map((test) => `${test.passed ? "✅" : "❌"} ${test.id}: ${test.text}`)
      .join("\n");
    const hasAllPassed = testRunData.tests.every(
      (test) => test.passed === true
    );

    if (hasAllPassed) {
      core.info(testsMessage);
    } else {
      core.setFailed(testsMessage);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
