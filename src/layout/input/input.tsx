import React from 'react';
import classNames from 'classnames';
import './styles.scss';

interface PublicProps {
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  innerRef?: React.RefObject<HTMLInputElement>;
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
}

type Props = PublicProps;

export const Input: React.FC<Props> = props => {
  let klass = classNames(
    'outline-none',
    'h-6',
    'bg-gray-200',
    'w-full',
    'ni-input',
    'border',
    'border-solid',
    'border-gray-300',
    'rounded',
    'focus:border-primary'
  );
  const { innerRef, ...restProps } = props;
  return (
    <div>
      <input ref={innerRef} {...restProps} className={klass} />
    </div>
  );
};
