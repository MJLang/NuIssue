import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { History, createBrowserHistory } from 'history';
import { CONFIG } from '~core/config';
import ReactDOM from 'react-dom';
import { NuIssueContainer } from '~core/nu-issue-container';
import { initializeIcons } from '~core/icons';

export let nuIssue: NuIssue;
export let apolloClient: typeof nuIssue.client;
export let history: typeof nuIssue.history;

export class NuIssue {
  public client: ApolloClient<InMemoryCache>;
  public history: History;

  constructor(config: typeof CONFIG) {
    this.client = new ApolloClient({
      uri: config.gqlEndpoint,
      headers: {
        Authorization: `Bearer ${config.authHeader}`,
      },
    });
    this.history = createBrowserHistory();
  }
}

export function buildNuIssue(config: typeof CONFIG = CONFIG) {
  nuIssue = new NuIssue(config);
  apolloClient = nuIssue.client;
  history = nuIssue.history;
}

export function bootstrap() {
  buildNuIssue();
  initializeIcons();
  ReactDOM.render(<NuIssueContainer />, document.getElementById('root'));
}
