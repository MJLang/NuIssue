import React from 'react';
import { Container } from '~layout/container/container';
import { RepositoryContextProvider } from '~features/repository-context';
import { RepositoryLocator } from '~features/repository-locator';
import { IssueSelector } from '~features/issue-selector';
import { IssueContextProvider } from '~features/issue-context/issue-context';

interface PublicProps {}
type Props = PublicProps;

export const IssueListPage: React.FC<Props> = props => {
  return (
    <RepositoryContextProvider>
      <IssueContextProvider>
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
            <main className="grid col-span-6 gap-2"></main>
          </div>
        </Container>
      </IssueContextProvider>
    </RepositoryContextProvider>
  );
};
