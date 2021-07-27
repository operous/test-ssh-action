import { expect, describe, it, jest } from "@jest/globals";
import { main } from "../src/lib";

jest.setTimeout(20000);

jest.mock("@actions/core", () => ({
  info: jest.fn(),
  setFailed: jest.fn(),
  getInput: jest
    .fn()
    .mockReturnValueOnce("id1,id2")
    .mockReturnValueOnce("token"),
}));

jest.mock("../src/generated/requests", () => ({
  getSdk: jest.fn().mockReturnValueOnce({
    checkToken: async function () {
      return {
        checkToken: "Token is valid!",
      };
    },
    instances: async function () {
      return {
        instances: [
          {
            identifier: "id1",
            name: "ancient-rock-700",
          },
          {
            identifier: "id2",
            name: "webapp-01",
          },
        ],
      };
    },
    startTestRun: async function () {
      return {
        startTestRun: 3,
      };
    },
    instance: jest
      .fn()
      .mockImplementationOnce(async function () {
        return {
          instance: {
            identifier: "id1",
            name: "ancient-rock-700",
            testRun: {
              id: 3,
              status: "RUNNING",
            },
          },
        };
      })
      .mockImplementationOnce(async function () {
        return {
          instance: {
            identifier: "id1",
            name: "ancient-rock-700",
            testRun: {
              id: 3,
              status: "FAILED",
              tests: [
                {
                  id: "SSHD/DisableRootLogin",
                  passed: false,
                  text: 'The SSHD Configuration PermitRootLogin should be "no" but the current value is "yes"\n',
                },
                {
                  id: "SSHD/CloseUnauthenticated",
                  passed: false,
                  text: "The SSHD Configuration LoginGraceTime should be a number between 1 and 60 but it is not configured explictly and it's using the default value\n",
                },
                {
                  id: "UBUNTU/EtcPasswordPermissions",
                  passed: true,
                  text: "The /etc/passwd file should be owned by root, writable only by root and readable by others",
                },
                {
                  id: "UBUNTU/EtcShadowPermissions",
                  passed: true,
                  text: "The /etc/shadow file should be owned by root, writable only by root and readable only by the group root or shadow",
                },
              ],
            },
          },
        };
      })
      .mockImplementationOnce(async function () {
        return {
          instance: {
            identifier: "id2",
            name: "webapp-01",
            testRun: {
              id: 3,
              status: "RUNNING",
            },
          },
        };
      })
      .mockImplementationOnce(async function () {
        return {
          instance: {
            identifier: "id2",
            name: "webapp-01",
            testRun: {
              id: 3,
              status: "FAILED",
              tests: [
                {
                  id: "SSHD/DisableRootLogin",
                  passed: true,
                  text: "The /etc/shadow file should be owned by root, writable only by root and readable only by the group root or shadow",
                },
                {
                  id: "SSHD/CloseUnauthenticated",
                  passed: true,
                  text: "The /etc/shadow file should be owned by root, writable only by root and readable only by the group root or shadow",
                },
                {
                  id: "UBUNTU/EtcPasswordPermissions",
                  passed: true,
                  text: "The /etc/passwd file should be owned by root, writable only by root and readable by others",
                },
                {
                  id: "UBUNTU/EtcShadowPermissions",
                  passed: true,
                  text: "The /etc/shadow file should be owned by root, writable only by root and readable only by the group root or shadow",
                },
              ],
            },
          },
        };
      }),
  }),
}));

const expectedResult = `
- ancient-rock-700 -
❌ SSHD/DisableRootLogin: The SSHD Configuration PermitRootLogin should be "no" but the current value is "yes"
❌ SSHD/CloseUnauthenticated: The SSHD Configuration LoginGraceTime should be a number between 1 and 60 but it is not configured explictly and it's using the default value
✅ UBUNTU/EtcPasswordPermissions: The /etc/passwd file should be owned by root, writable only by root and readable by others
✅ UBUNTU/EtcShadowPermissions: The /etc/shadow file should be owned by root, writable only by root and readable only by the group root or shadow

- webapp-01 -
✅ SSHD/DisableRootLogin: The /etc/shadow file should be owned by root, writable only by root and readable only by the group root or shadow
✅ SSHD/CloseUnauthenticated: The /etc/shadow file should be owned by root, writable only by root and readable only by the group root or shadow
✅ UBUNTU/EtcPasswordPermissions: The /etc/passwd file should be owned by root, writable only by root and readable by others
✅ UBUNTU/EtcShadowPermissions: The /etc/shadow file should be owned by root, writable only by root and readable only by the group root or shadow`;

describe("Runs a complete ssh test run", () => {
  it("Success ssh test", async () => {
    const message = await main();
    expect(message).toStrictEqual(expectedResult);
  });
});
