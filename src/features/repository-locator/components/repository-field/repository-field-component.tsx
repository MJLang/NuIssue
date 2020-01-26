import React, { useState } from 'react';
import { searchRepository_search_nodes_Repository } from '~gql/gql-schema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCombobox } from 'downshift';
import { Input } from '~layout/input';
import classNames from 'classnames';

let debounceLock: NodeJS.Timeout | null;

interface PublicProps {
  repositories: searchRepository_search_nodes_Repository[];
  repositoryName: string;
  onNameChange: (name: string) => void;
  onSelect: (name: string) => void;
  loading?: boolean;
  error?: boolean;
}

type Props = PublicProps;

export const RepositoryFieldComponent: React.FC<Props> = props => {
  const item = props.repositories.find(x => x.name === props.repositoryName);
  const [searchTerm, setSearchTerm] = useState(props.repositoryName);

  function debounceInput(input: string) {
    setSearchTerm(input);
    if (!debounceLock) {
      debounceLock = setInterval(() => {
        props.onNameChange(searchTerm);
        if (debounceLock) {
          clearTimeout(debounceLock);
        }
        debounceLock = null;
      }, 300) as NodeJS.Timeout;
    }
  }

  const {
    isOpen,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getMenuProps,
    openMenu,
    highlightedIndex,
  } = useCombobox({
    initialSelectedItem: item,
    items: props.repositories,
    itemToString: item => item.name,
    onInputValueChange: event => {
      debounceInput(event.inputValue ?? '');
    },
    onSelectedItemChange: event => {
      if (event.selectedItem) {
        props.onSelect(event.selectedItem.name);
      }
    },
  });

  return (
    <div className="relative">
      <div {...getComboboxProps()}>
        <div className="relative">
          <Input {...getInputProps({ refKey: 'innerRef' })} onFocus={ev => openMenu()} />
        </div>
      </div>
      {isOpen && (
        <ul className="absolute z-20" {...getMenuProps()}>
          {props.repositories.map((repo, index) => {
            const itemKlass = classNames('hover:bg-primary', 'hover:text-white', 'px-2', 'py-1', {
              'bg-primary': highlightedIndex === index,
              'text-white': highlightedIndex === index,
            });
            return (
              <li
                key={`${item}${index}`}
                className={itemKlass}
                {...getItemProps({ item: repo, index: index })}
              >
                {repo.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
