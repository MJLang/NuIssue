import React from 'react';
import classNames from 'classnames';

interface PublicProps {
  center?: boolean;
}
type Props = PublicProps;

export const Container: React.FC<Props> = props => {
  let klass = classNames('container');
  if (props.center) {
    klass = classNames(klass, 'mx-auto');
  }

  return <div className={klass}>{props.children}</div>;
};
