import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { history, apolloClient } from '~core/nuissue';
import { ApolloProvider } from '@apollo/react-hooks';
import { Root } from '~pages/root';
import './../../styles/index.scss';

interface PublicProps {}
type Props = PublicProps;

export const NuIssueContainer: React.FC<Props> = props => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router history={history}>
        <Root />
      </Router>
    </ApolloProvider>
  );
};
