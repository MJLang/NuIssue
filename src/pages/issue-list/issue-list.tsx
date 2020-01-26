import React from 'react';
import { Container } from '~layout/container/container';
import { RepositoryContextProvider } from '~features/repository-context';
import { RepositoryLocator } from '~features/repository-locator';
import { IssueSelector } from '~features/issue-selector';

interface PublicProps {}
type Props = PublicProps;

export const IssueListPage: React.FC<Props> = props => {
  return (
    <RepositoryContextProvider>
      <Container center>
        <div className="grid grid-cols-8 gap-2">
          <aside className="col-span-2">
            <div className="mb-8">
              <RepositoryLocator />
            </div>
            <div>
              <IssueSelector />
            </div>
          </aside>
        </div>
      </Container>
    </RepositoryContextProvider>
  );
};
