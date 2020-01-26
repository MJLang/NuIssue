import React, { useState } from 'react';

export interface RepositoryContextStore {
  namespace: string;
  repository: string;
  changeNamespace: (namespace: string) => void;
  changeRepository: (repository: string) => void;
}

const DefaultContext: RepositoryContextStore = {
  namespace: 'facebook',
  repository: 'react',
  changeNamespace: () => null,
  changeRepository: () => null,
};

export const RepositoryContext = React.createContext<RepositoryContextStore>(DefaultContext);

export const RepositoryContextProvider: React.FC = props => {
  const [namespace, setNamespace] = useState(DefaultContext.namespace);
  const [repository, setRepository] = useState(DefaultContext.repository);

  function changeNamespace(newNamespace: string) {
    setNamespace(newNamespace);
  }

  function changeRepository(newRepository: string) {
    setRepository(newRepository);
  }

  return (
    <RepositoryContext.Provider
      value={{
        namespace: namespace,
        repository: repository,
        changeNamespace: changeNamespace,
        changeRepository: changeRepository,
      }}
    >
      {props.children}
    </RepositoryContext.Provider>
  );
};
