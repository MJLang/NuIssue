import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { IssueListPage } from '~pages/issue-list';

interface PublicProps {}
type Props = PublicProps;

export const Root: React.FC<Props> = props => {
  return (
    <Switch>
      <Route path="/" strict component={IssueListPage} />
      <Route component={RedirectToRoot} />
    </Switch>
  );
};

const RedirectToRoot = () => {
  return <Redirect to="/" />;
};
