import React from 'react';
import { searchIssue_search_nodes_Issue } from '~gql/gql-schema';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PublicProps {
  issue: searchIssue_search_nodes_Issue;
  innerRef: React.RefObject<HTMLLIElement>;
  selected?: boolean;
}
type Props = PublicProps;

export const IssueItem: React.FC<Props> = props => {
  const wrapperKlass = classNames(
    'px-2',
    'py-2',
    'hover:bg-primary',
    'hover:text-white',
    'flex',
    'items-center',
    {
      'bg-primary': props.selected,
      'text-white': props.selected,
    }
  );

  return (
    <li ref={props.innerRef} className={wrapperKlass}>
      <div className="mr-2">
        {props.issue.closed && <FontAwesomeIcon icon={['far', 'times-circle']} color="red" />}
        {!props.issue.closed && <FontAwesomeIcon icon={['far', 'check-circle']} color="green" />}
      </div>
      <div className="flex flex-col flex-1">
        <h2 className="text-2xl mb-2">{props.issue.title}</h2>
        <div className="flex w-full">
          <span className="text-gray-600">{props.issue.author?.login}</span>
          <div className="ml-auto">
            {props.issue.labels?.nodes?.map((label, index) => (
              <span
                key={`${label}${index}`}
                className="mx-1 p-1 rounded"
                style={{ backgroundColor: label?.color }}
              >
                {label?.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
};
