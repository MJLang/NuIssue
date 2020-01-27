import React, { useState } from 'react';
import { searchIssue_search_nodes_Issue } from '~gql/gql-schema';
import { Issue } from '~features/issue-selector/models/issue';
import { useCombobox } from 'downshift';
import { Input } from '~layout/input';
import { IssueItem } from '~features/issue-selector/components/issue-item';

let debounceLock: NodeJS.Timeout | null;

interface PublicProps {
  issues: searchIssue_search_nodes_Issue[];
  searchTerm: string;
  onIssueSelect: (issue: Issue) => void;
  onIssueHighlight: (issue: Issue) => void;
  onInputChange: (searchTerm: string) => void;
}

type Props = PublicProps;

export const IssueselectorComponent: React.FC<Props> = props => {
  const [searchTerm, setSearchTerm] = useState('');

  function debounceValueChange(inputValue: string) {
    setSearchTerm(inputValue);

    if (!debounceLock) {
      debounceLock = setTimeout(() => {
        props.onInputChange(searchTerm);
        if (debounceLock) {
          clearTimeout(debounceLock);
          debounceLock = null;
        }
      }, 300) as NodeJS.Timeout;
    }
  }

  const {
    getMenuProps,
    getItemProps,
    openMenu,
    isOpen,
    highlightedIndex,
    getInputProps,
    getComboboxProps,
  } = useCombobox({
    items: props.issues,
    onHighlightedIndexChange: ev => {},
    onInputValueChange: ev => {
      props.onInputChange(ev.inputValue ?? '');
    },
    initialIsOpen: true,
    onSelectedItemChange: ev => {
      if (ev.selectedItem) {
        props.onIssueSelect({
          id: ev.selectedItem.id,
          title: ev.selectedItem.title,
        });
      }
    },
    itemToString: item => item.title,
  });

  return (
    <div className="">
      <div {...getComboboxProps()}>
        <Input
          {...getInputProps({ refKey: 'innerRef', value: props.searchTerm })}
          placeholder="Search for an issue"
          onFocus={ev => openMenu()}
        />
      </div>
      {isOpen && (
        <ul {...getMenuProps()} className="absolute z-10 max-w-100 shadow">
          {props.issues.map((issue, index) => (
            <IssueItem
              issue={issue}
              key={`${issue}${index}`}
              selected={highlightedIndex === index}
              {...getItemProps({ item: issue, index: index, refKey: 'innerRef' })}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
