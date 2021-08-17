import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A specific point in time */
  DateTime: any;
};

/** Information used to confirm the server registration at Operous */
export type ConfirmRegistrationInput = {
  /** The token used to register the server */
  token: Scalars['String'];
};


/** Errors the API can return */
export enum Errors {
  /**
   * The token used to register the server is invalid.
   * Maybe it expired, maybe it never existed.
   */
  InvalidServerRegisterToken = 'INVALID_SERVER_REGISTER_TOKEN',
  /** The operation requires user authentication */
  UnauthenticatedRequest = 'UNAUTHENTICATED_REQUEST',
  /**
   * The operation requested was not permitted because the account have reached
   * the usage quota
   */
  MaximumAccountQuota = 'MAXIMUM_ACCOUNT_QUOTA',
  /**
   * The operation could not proceed because there was a failure while checking
   * the account usage
   */
  AccountQuotaCheck = 'ACCOUNT_QUOTA_CHECK'
}

/** Receives a hash with the attribute to filter the server result and its value */
export type GetServerInput = {
  /** Attribute value used to filter */
  value: Scalars['String'];
  /** An enum to determine which attribute from the server will be used to filter */
  kind: ServerFilterKind;
};

/** Information used to filter the servers on the servers query */
export type ListServerInput = {
  /** List of server identifiers */
  identifier?: Maybe<Array<Scalars['ID']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Starts the register of a new server on the Operous account
   *
   * Example:
   *
   * Query:
   * mutation RegisterServer {
   *   registerServer(
   *     input: { token: "WBw98UVdPrN2", sshPort: 22, ssvIps: "185.76.253.221" }
   *   ) {
   *     ca
   *   }
   * }
   *
   * Response:
   * {
   *   "data": {
   *     "registerServer": {
   *       "ca": "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEFUhjRNZfRqnbVUgPxi2bdhhPUQwL+K/bLrrpQXvSc6 Operous Test Runner"
   *     }
   *   }
   * }
   */
  registerServer?: Maybe<RegisterServerResponse>;
  /**
   * Confirms the server registration at Operous
   *
   * Example:
   *
   * Query:
   * mutation ConfirmRegistration{
   *   confirmRegistration(input: { token: "WBw98UVdPrN2" })
   * }
   *
   * Response:
   * {
   *   "data": {
   *     "confirmRegistration": "stiff-authority-9065"
   *   }
   * }
   */
  confirmRegistration?: Maybe<Scalars['String']>;
  /**
   * Check token legitimacy
   *
   * Example:
   *
   * Query:
   * mutation{ checkToken }
   *
   * Response:
   * {
   *   "data":  {
   *     "checkToken": "Token is valid!"
   *   }
   * }
   */
  checkToken: Scalars['String'];
  /**
   * Starts an SSH test run on a determined server
   *
   * Example:
   *
   * Query:
   * mutation {
   *   startTestRun (input: {serverId: "7QiCIABxXyXe"})
   * }
   *
   * Response:
   * {
   *   "data":  {
   *     "startTestRun": 1
   *   }
   * }
   */
  startTestRun: Scalars['Int'];
};


export type MutationRegisterServerArgs = {
  input: RegisterServerInput;
};


export type MutationConfirmRegistrationArgs = {
  input: ConfirmRegistrationInput;
};


export type MutationStartTestRunArgs = {
  input: StartTestRunInput;
};

export type Query = {
  __typename?: 'Query';
  /**
   * Get a single server data according to the filter used
   *
   * Example:
   *
   * Query:
   * {
   *   server(input:{value: "ubiquitous-chicken-8974", kind:NAME}){
   *     identifier
   *     name
   *   }
   * }
   *
   * Response:
   * {
   *   "data":  {
   *     "server": {
   *       "identifier": "7QiCIABxXyXe",
   *       "name": "webapp-01"
   *     }
   *   }
   * }
   */
  server?: Maybe<Server>;
  /**
   * Get all account servers registered can be filtered by a list of the server identifiers
   *
   * Example:
   *
   * Query:
   * {
   *   servers {
   *     identifier
   *     name
   *   }
   * }
   *
   * Response:
   * {
   *   "data": {
   *     "servers": [
   *       {
   *         "identifier": "gMAjMO8mkmhsFRxW",
   *         "name": "ancient-rock-700"
   *       },
   *       {
   *         "identifier": "7QiCIABxXyXe",
   *         "name": "webapp-01"
   *       }
   *     ]
   *   }
   * }
   */
  servers: Array<Server>;
};


export type QueryServerArgs = {
  input: GetServerInput;
};


export type QueryServersArgs = {
  input?: Maybe<ListServerInput>;
};

/** Information used to register a new server on the Operous account */
export type RegisterServerInput = {
  /** The token used to register the server */
  token: Scalars['String'];
  /** A list of IPs separated by spaces */
  ssvIps: Scalars['String'];
  /** The port used to perform an SSH connection at this server */
  sshPort: Scalars['Int'];
};

/** The register will respond with the CA key to be configured on the server */
export type RegisterServerResponse = {
  __typename?: 'RegisterServerResponse';
  /** Certificate authority key */
  ca: Scalars['String'];
};

/**
 * A physical or virtual on-premise, private, or public cloud server that must
 * be registered to be tested by Operous. A server must belong to an Operous
 * account.
 */
export type Server = {
  __typename?: 'Server';
  /** The server immutable identifier */
  identifier: Scalars['ID'];
  /** A name for this server, can be edited */
  name: Scalars['String'];
  /** Server specific Test Run information */
  testRun?: Maybe<TestRun>;
  /** Server list of Test Runs */
  testRuns: Array<TestRun>;
};


/**
 * A physical or virtual on-premise, private, or public cloud server that must
 * be registered to be tested by Operous. A server must belong to an Operous
 * account.
 */
export type ServerTestRunArgs = {
  number: Scalars['Int'];
};

/** Determines which attribute from the server will be used to filter */
export enum ServerFilterKind {
  /** The server external ID */
  Id = 'ID',
  /** The server name */
  Name = 'NAME'
}

/** Information used to start a Test Run at Operous */
export type StartTestRunInput = {
  /** server identifier */
  serverId: Scalars['ID'];
};

/** A test executed in a Test Run */
export type Test = {
  __typename?: 'Test';
  /** The test identifier */
  id?: Maybe<Scalars['String']>;
  /** The test full message. It informs what was tested and what issue was found */
  text?: Maybe<Scalars['String']>;
  /** If this test has passed */
  passed?: Maybe<Scalars['Boolean']>;
};

/** A Test Run that is running or already was executed at a server */
export type TestRun = {
  __typename?: 'TestRun';
  /**
   * This number is scoped to the server. If the number is 4, this Test Run
   * server represents the fourth test execution in the related server.
   */
  number: Scalars['Int'];
  /** The Test Run start time */
  time: Scalars['DateTime'];
  /** The test current status */
  status: TestRunStatus;
  /** The tests executed in this Test Run */
  tests: Array<Test>;
};

/** Status available for a test run */
export enum TestRunStatus {
  /** The Test Run could not run or it finished with some failing tests */
  Failed = 'FAILED',
  /** The Test Run finished execution with success, and the server passed in all the tests */
  Success = 'SUCCESS',
  /** The Test Run is still in progress */
  Running = 'RUNNING'
}

export type CheckTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type CheckTokenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'checkToken'>
);

export type ServerQueryVariables = Exact<{
  testRunId: Scalars['Int'];
  serverId: Scalars['String'];
}>;


export type ServerQuery = (
  { __typename?: 'Query' }
  & { server?: Maybe<(
    { __typename?: 'Server' }
    & Pick<Server, 'name'>
    & { testRun?: Maybe<(
      { __typename?: 'TestRun' }
      & Pick<TestRun, 'number' | 'status' | 'time'>
      & { tests: Array<(
        { __typename?: 'Test' }
        & Pick<Test, 'id' | 'passed' | 'text'>
      )> }
    )> }
  )> }
);

export type ServersQueryVariables = Exact<{ [key: string]: never; }>;


export type ServersQuery = (
  { __typename?: 'Query' }
  & { servers: Array<(
    { __typename?: 'Server' }
    & Pick<Server, 'identifier' | 'name'>
  )> }
);

export type StartTestRunMutationVariables = Exact<{
  serverId: Scalars['ID'];
}>;


export type StartTestRunMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'startTestRun'>
);


export const CheckTokenDocument = gql`
    mutation checkToken {
  checkToken
}
    `;
export const ServerDocument = gql`
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
export const ServersDocument = gql`
    query servers {
  servers {
    identifier
    name
  }
}
    `;
export const StartTestRunDocument = gql`
    mutation startTestRun($serverId: ID!) {
  startTestRun(input: {serverId: $serverId})
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    checkToken(variables?: CheckTokenMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CheckTokenMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CheckTokenMutation>(CheckTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkToken');
    },
    server(variables: ServerQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ServerQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ServerQuery>(ServerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'server');
    },
    servers(variables?: ServersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ServersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ServersQuery>(ServersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'servers');
    },
    startTestRun(variables: StartTestRunMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<StartTestRunMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<StartTestRunMutation>(StartTestRunDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'startTestRun');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;