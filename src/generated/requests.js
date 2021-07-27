"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = exports.StartTestRunDocument = exports.InstancesDocument = exports.InstanceDocument = exports.CheckTokenDocument = exports.TestRunStatus = exports.InstanceFilterKind = exports.Errors = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
/** Errors the API can return */
var Errors;
(function (Errors) {
    /**
     * The token used to register the instance is invalid.
     * Maybe it expired, maybe it never existed.
     */
    Errors["InvalidServerRegisterToken"] = "INVALID_SERVER_REGISTER_TOKEN";
    /** The operation requires user authentication */
    Errors["UnauthenticatedRequest"] = "UNAUTHENTICATED_REQUEST";
    /**
     * The operation requested was not permitted because the account have reached
     * the usage quota
     */
    Errors["MaximumAccountQuota"] = "MAXIMUM_ACCOUNT_QUOTA";
    /**
     * The operation could not proceed because there was a failure while checking
     * the account usage
     */
    Errors["AccountQuotaCheck"] = "ACCOUNT_QUOTA_CHECK";
})(Errors = exports.Errors || (exports.Errors = {}));
/** Determines which attribute from the instance will be used to filter */
var InstanceFilterKind;
(function (InstanceFilterKind) {
    /** The Instance external ID */
    InstanceFilterKind["Id"] = "ID";
    /** The Instance name */
    InstanceFilterKind["Name"] = "NAME";
})(InstanceFilterKind = exports.InstanceFilterKind || (exports.InstanceFilterKind = {}));
/** Status available for a test run */
var TestRunStatus;
(function (TestRunStatus) {
    /** The Test Run could not run or it finished with some failing tests */
    TestRunStatus["Failed"] = "FAILED";
    /** The Test Run finished execution with success, and the instance passed in all the tests */
    TestRunStatus["Success"] = "SUCCESS";
    /** The Test Run is still in progress */
    TestRunStatus["Running"] = "RUNNING";
})(TestRunStatus = exports.TestRunStatus || (exports.TestRunStatus = {}));
exports.CheckTokenDocument = graphql_tag_1.default `
    mutation checkToken {
  checkToken
}
    `;
exports.InstanceDocument = graphql_tag_1.default `
    query instance($testRunId: Int!, $serverId: String!) {
  instance(input: {value: $serverId, kind: ID}) {
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
exports.InstancesDocument = graphql_tag_1.default `
    query instances {
  instances {
    identifier
    name
  }
}
    `;
exports.StartTestRunDocument = graphql_tag_1.default `
    mutation startTestRun($serverId: ID!) {
  startTestRun(input: {serverId: $serverId})
}
    `;
const defaultWrapper = (action, _operationName) => action();
function getSdk(client, withWrapper = defaultWrapper) {
    return {
        checkToken(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.CheckTokenDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'checkToken');
        },
        instance(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.InstanceDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'instance');
        },
        instances(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.InstancesDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'instances');
        },
        startTestRun(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.StartTestRunDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'startTestRun');
        }
    };
}
exports.getSdk = getSdk;
//# sourceMappingURL=requests.js.map