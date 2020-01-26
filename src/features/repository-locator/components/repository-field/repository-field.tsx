import React, { useContext, useState } from 'react';
import { RepositoryContext } from '~features/repository-context';
import { useQuery } from '@apollo/react-hooks';
import searchRepositoryQuery from './search-repository.query.graphql';
import {
  searchRepository,
  searchRepositoryVariables,
  searchRepository_search_nodes_Repository,
} from '~gql/gql-schema';
import { RepositoryFieldComponent } from '~features/repository-locator/components/repository-field/repository-field-component';

interface PublicProps {}

type Props = PublicProps;

export const RepositoryField: React.FC<Props> = props => {
  const { namespace, repository, changeRepository } = useContext(RepositoryContext);

  const [localRepository, setLocalRepository] = useState(repository);

  const { loading, data, error, called } = useQuery<searchRepository, searchRepositoryVariables>(
    searchRepositoryQuery,
    {
      variables: {
        query: `org:${namespace} sort:stars in:name ${localRepository}`,
        count: 10,
      },
    }
  );

  const repositories: searchRepository_search_nodes_Repository[] =
    ((data &&
      data.search &&
      data.search.nodes &&
      data.search.nodes.filter(
        n => n?.__typename === 'Repository'
      )) as searchRepository_search_nodes_Repository[]) || [];

  if (!data) {
    return <div />;
  }

  return (
    <RepositoryFieldComponent
      repositories={repositories}
      repositoryName={localRepository}
      onNameChange={ev => setLocalRepository(ev)}
      onSelect={repo => changeRepository(repo)}
    />
  );
};
