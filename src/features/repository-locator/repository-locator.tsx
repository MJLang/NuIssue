import React, { useContext } from 'react';
import { NamespaceField } from '~features/repository-locator/components/namespace-field/namespace-field';
import { RepositoryContext } from '~features/repository-context';
import { RepositoryField } from '~features/repository-locator/components/repository-field';

interface PublicProps {}

type Props = PublicProps;

export const RepositoryLocator: React.FC<Props> = props => {
  const { namespace, repository, changeNamespace, changeRepository } = useContext(
    RepositoryContext
  );

  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <NamespaceField namespaceValue={namespace} onFinish={changeNamespace} />
      </div>
      <div className="col-span-1">
        <RepositoryField />
      </div>
    </div>
  );
};
