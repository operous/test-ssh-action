<p align="center">
  <a href="https://github.com/operous/test-ssh-action/">
    <img width="200px" src="https://github.com/operous/test-ssh-action/raw/dev/assets/operous.svg">
  </a>
</p>

<h1 align="center">
  Operous ssh test action
</h1>

This GitHub Action will trigger an SSH test at Operous and return its results.

<p align="center">
  <img src="https://github.com/JamesIves/fetch-api-data-action/raw/dev/assets/action-example.png">
</p>

## Getting Started

You can include the action in your workflow to trigger on any event that [GitHub actions supports](https://help.github.com/en/articles/events-that-trigger-workflows). You'll need to provide the action with your [API Token](https://docs.operous.dev/operous/api/register-api-token.html) from you [Operous](https://operous.dev/) account.

In the example below, a push on the main branch will start the SSH test on the registered servers with the provided identifier.
The pipeline will only succeed if the tests in all servers are successful.

```yml
name: Test action
on:
  push:
    branches:
      - main
jobs:
  test:
    name: "Operous ssh test action"
    runs-on: ubuntu-latest
    steps:
      - name: Run Operous ssh test
        uses: operous/test-ssh-action@releases/v1
        with:
          accountToken: ${{ secrets.OPEROUS_ACCOUNT_TOKEN }}
          serverIds: "SnmjBjasb5TgadQk,gMAjMO8mkmhsFRxW,hCkhyiR5eT7kXjs5"
```

## Configuration

The `with` portion of the workflow **must** be configured before the action will work. You can add these in the `with` section found in the examples above. Any `secrets` must be referenced using the bracket syntax and stored in the GitHub repositories `Settings/Secrets` menu. You can learn more about setting environment variables with GitHub actions [here](https://help.github.com/en/articles/workflow-syntax-for-github-actions#jobsjob_idstepsenv).

#### Setup

The following configuration options should be set.

| Key            | Value Information                                                                                                                            |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `accountToken` | Your Operous account API token. Follow this [guide](https://docs.operous.dev/operous/api/register-api-token.html) if you need to create one. |
| `serverIds`    | The server identifier you can get on the Operous page in the detailed information of the server.                                             |
