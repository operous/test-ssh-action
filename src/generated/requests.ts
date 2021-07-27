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

/** Information used to confirm the instance registration at Operous */
export type ConfirmRegistrationInput = {
  /** The token used to register the instance */
  token: Scalars['String'];
};


/** Errors the API can return */
export enum Errors {
  /**
   * The token used to register the instance is invalid.
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

/** Receives a hash with the attribute to filter the instance result and its value */
export type GetInstanceInput = {
  /** Attribute value used to filter */
  value: Scalars['String'];
  /** An enum to determine which attribute from the instance will be used to filter */
  kind: InstanceFilterKind;
};

/**
 * A physical or virtual on-premise, private, or public cloud instance that must
 * be registered to be tested by Operous. An Instance must belong to an Operous
 * account.
 */
export type Instance = {
  __typename?: 'Instance';
  /** The Instance immutable identifier */
  identifier: Scalars['ID'];
  /** A name for this Instance, can be edited */
  name: Scalars['String'];
  /** Instance specific Test Run information */
  testRun?: Maybe<TestRun>;
  /** Instance list of Test Runs */
  testRuns: Array<TestRun>;
};


/**
 * A physical or virtual on-premise, private, or public cloud instance that must
 * be registered to be tested by Operous. An Instance must belong to an Operous
 * account.
 */
export type InstanceTestRunArgs = {
  number: Scalars['Int'];
};

/** Determines which attribute from the instance will be used to filter */
export enum InstanceFilterKind {
  /** The Instance external ID */
  Id = 'ID',
  /** The Instance name */
  Name = 'NAME'
}

/** Information used to filter the instances on the instances query */
export type ListInstanceInput = {
  /** List of instance identifiers */
  identifier?: Maybe<Array<Scalars['ID']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Starts the register of a new instance on the Operous account
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
   * Confirms the instance registration at Operous
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
   * Starts an SSH test run on a determined instance
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
   * Get a single instance data according to the filter used
   *
   * Example:
   *
   * Query:
   * {
   *   instance(input:{value: "ubiquitous-chicken-8974", kind:NAME}){
   *     identifier
   *     name
   *   }
   * }
   *
   * Response:
   * {
   *   "data":  {
   *     "instance": {
   *       "identifier": "7QiCIABxXyXe",
   *       "name": "webapp-01"
   *     }
   *   }
   * }
   */
  instance?: Maybe<Instance>;
  /**
   * Get all account instances registered can be filtered by a list of the instance identifiers
   *
   * Example:
   *
   * Query:
   * {
   *   instances {
   *     identifier
   *     name
   *   }
   * }
   *
   * Response:
   * {
   *   "data": {
   *     "instances": [
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
  instances: Array<Instance>;
};


export type QueryInstanceArgs = {
  input: GetInstanceInput;
};


export type QueryInstancesArgs = {
  input?: Maybe<ListInstanceInput>;
};

/** Information used to register a new instance on the Operous account */
export type RegisterServerInput = {
  /** The token used to register the instance */
  token: Scalars['String'];
  /** A list of IPs separated by spaces */
  ssvIps: Scalars['String'];
  /** The port used to perform an SSH connection at this instance */
  sshPort: Scalars['Int'];
};

/** The register will respond with the CA key to be configured on the instance */
export type RegisterServerResponse = {
  __typename?: 'RegisterServerResponse';
  /** Certificate authority key */
  ca: Scalars['String'];
};

/** Information used to start a Test Run at Operous */
export type StartTestRunInput = {
  /** Instance identifier */
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

/** A Test Run that is running or already was executed at an Instance */
export type TestRun = {
  __typename?: 'TestRun';
  /**
   * This number is scoped to the instance. If the number is 4, this Test Run
   * instance represents the fourth test execution in the related Instance.
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
  /** The Test Run finished execution with success, and the instance passed in all the tests */
  Success = 'SUCCESS',
  /** The Test Run is still in progress */
  Running = 'RUNNING'
}

export type CheckTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type CheckTokenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'checkToken'>
);

export type InstanceQueryVariables = Exact<{
  testRunId: Scalars['Int'];
  serverId: Scalars['String'];
}>;


export type InstanceQuery = (
  { __typename?: 'Query' }
  & { instance?: Maybe<(
    { __typename?: 'Instance' }
    & Pick<Instance, 'name'>
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

export type InstancesQueryVariables = Exact<{ [key: string]: never; }>;


export type InstancesQuery = (
  { __typename?: 'Query' }
  & { instances: Array<(
    { __typename?: 'Instance' }
    & Pick<Instance, 'identifier' | 'name'>
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
export const InstanceDocument = gql`
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
export const InstancesDocument = gql`
    query instances {
  instances {
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
    instance(variables: InstanceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InstanceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<InstanceQuery>(InstanceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'instance');
    },
    instances(variables?: InstancesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InstancesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<InstancesQuery>(InstancesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'instances');
    },
    startTestRun(variables: StartTestRunMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<StartTestRunMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<StartTestRunMutation>(StartTestRunDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'startTestRun');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;