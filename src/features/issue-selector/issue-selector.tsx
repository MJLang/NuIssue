import React, { useContext, useState, useEffect, useRef } from 'react';
import { RepositoryContext } from '~features/repository-context';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import {
  searchIssue,
  searchIssueVariables,
  searchIssue_search_nodes_Issue,
  searchIssue_search_nodes,
} from '~gql/gql-schema';
import searchIssueQuery from './search-issue.query.graphql';
import { IssueselectorComponent } from '~features/issue-selector/issue-selector-component';
import { Issue } from '~features/issue-selector/models/issue';

let debounceLock: number | null;

interface PublicProps {}
type Props = PublicProps;

export const IssueSelector: React.FC<Props> = props => {
  const mountRef = useRef(false);
  const { namespace, repository } = useContext(RepositoryContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [issues, setIssues] = useState<searchIssue_search_nodes_Issue[]>([]);

  useEffect(() => {
    if (mountRef.current) {
      setSearchTerm('');
      setIssues([]);
    } else {
      mountRef.current = true;
    }
  }, [namespace, repository]);

  const [searchQuery] = useLazyQuery<searchIssue, searchIssueVariables>(searchIssueQuery, {
    onCompleted: data => {
      if (data) {
        const newIssues = (data?.search.nodes as searchIssue_search_nodes_Issue[]) || [];
        setIssues(newIssues);
      }
    },
  });

  function fetchIssues(searchTerm: string) {
    setSearchTerm(searchTerm);

    if (!debounceLock) {
      debounceLock = window.setTimeout(() => {
        searchQuery({
          variables: {
            query: `repo:${namespace}/${repository} in:title ${searchTerm}`,
            count: 10,
          },
        });
        if (debounceLock) {
          clearTimeout(debounceLock);
          debounceLock = null;
        }
      }, 250);
    }
  }

  function onIssueHighlight(issue: Issue) {}

  function onIssueSelect(issue: Issue) {}

  return (
    <IssueselectorComponent
      searchTerm={searchTerm}
      issues={issues}
      onInputChange={fetchIssues}
      onIssueHighlight={onIssueHighlight}
      onIssueSelect={onIssueSelect}
    />
  );
};
