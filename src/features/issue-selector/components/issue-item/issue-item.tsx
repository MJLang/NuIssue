import React from 'react';
import { searchIssue_search_nodes_Issue } from '~gql/gql-schema';

interface PublicProps {
  issue: searchIssue_search_nodes_Issue;
  innerRef: React.RefObject<HTMLLIElement>;
}
type Props = PublicProps;

export const IssueItem: React.FC<Props> = props => {
  return <li ref={props.innerRef}>{props.issue.title}</li>;
};
