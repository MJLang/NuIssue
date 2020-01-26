import React, { useState } from 'react';
import { Input } from '~layout/input';

interface PublicProps {
  namespaceValue: string;
  onFinish: (namespace: string) => void;
}

type Props = PublicProps;

export const NamespaceField: React.FC<Props> = props => {
  const [namespace, setNamespace] = useState(props.namespaceValue);

  function onBlur(blurEvent: React.FocusEvent<HTMLInputElement>) {
    const newNamespace = blurEvent.target.value;
    props.onFinish(newNamespace);
  }

  return (
    <Input
      value={namespace}
      onChange={ev => setNamespace(ev.target.value)}
      placeholder="Namespace"
      onBlur={onBlur}
    />
  );
};
