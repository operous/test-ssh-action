"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = exports.UniqueServerDocument = exports.StartTestRunDocument = exports.ServerDocument = exports.CheckTokenDocument = exports.TestRunStatus = exports.ServerFilterKind = exports.Errors = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
/** Errors the API can return */
var Errors;
(function (Errors) {
    /**
     * The token used to register the server is invalid.
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
/** Determines which attribute from the server will be used to filter */
var ServerFilterKind;
(function (ServerFilterKind) {
    /** The server external ID */
    ServerFilterKind["Id"] = "ID";
    /** The server name */
    ServerFilterKind["Name"] = "NAME";
})(ServerFilterKind = exports.ServerFilterKind || (exports.ServerFilterKind = {}));
/** Status available for a test run */
var TestRunStatus;
(function (TestRunStatus) {
    /** The Test Run could not run or it finished with some failing tests */
    TestRunStatus["Failed"] = "FAILED";
    /** The Test Run finished execution with success, and the server passed in all the tests */
    TestRunStatus["Success"] = "SUCCESS";
    /** The Test Run is still in progress */
    TestRunStatus["Running"] = "RUNNING";
})(TestRunStatus = exports.TestRunStatus || (exports.TestRunStatus = {}));
exports.CheckTokenDocument = graphql_tag_1.default `
    mutation checkToken {
  checkToken
}
    `;
exports.ServerDocument = graphql_tag_1.default `
    query server($testRunId: Int!, $serverId: String!) {
  server(input: {value: $serverId, kind: ID}) {
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
exports.StartTestRunDocument = graphql_tag_1.default `
    mutation startTestRun($serverId: ID!) {
  startTestRun(input: {serverId: $serverId})
}
    `;
exports.UniqueServerDocument = graphql_tag_1.default `
    query uniqueServer($serverId: String!) {
  server(input: {value: $serverId, kind: ID}) {
    name
    identifier
  }
}
    `;
const defaultWrapper = (action, _operationName) => action();
function getSdk(client, withWrapper = defaultWrapper) {
    return {
        checkToken(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.CheckTokenDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'checkToken');
        },
        server(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.ServerDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'server');
        },
        startTestRun(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.StartTestRunDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'startTestRun');
        },
        uniqueServer(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.UniqueServerDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'uniqueServer');
        }
    };
}
exports.getSdk = getSdk;
//# sourceMappingURL=requests.js.map