import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
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
import { IssueContext } from '~features/issue-context/issue-context';

let debounceLock: number | null;

interface PublicProps {}
type Props = PublicProps;

export const IssueSelector: React.FC<Props> = props => {
  const mountRef = useRef(false);
  const { namespace, repository } = useContext(RepositoryContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [issues, setIssues] = useState<searchIssue_search_nodes_Issue[]>([]);
  const { issue, storeIssue, changeIssue } = useContext(IssueContext);

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
        let newIssues =
          (data?.search.nodes && (data.search.nodes as searchIssue_search_nodes_Issue[])) || [];
        newIssues = newIssues.filter(n => n.title && n.title.length);
        setIssues(newIssues);
      }
    },
  });

  const fetchIssues = useCallback(
    (searchTerm: string) => {
      setSearchTerm(searchTerm);

      if (!debounceLock) {
        debounceLock = window.setTimeout(() => {
          if (searchTerm.length > 0) {
            searchQuery({
              variables: {
                query: `repo:${namespace}/${repository} in:title sort:created-desc ${searchTerm}`,
                count: 5,
              },
            });
          } else {
            setIssues([]);
          }
          if (debounceLock) {
            clearTimeout(debounceLock);
            debounceLock = null;
          }
        }, 250);
      }
    },
    [namespace, repository, searchQuery]
  );

  function onIssueHighlight(issue: Issue) {
    changeIssue(issue);
  }

  function onIssueSelect(issue: Issue) {
    issue.repository = `${namespace}/${repository}`;
    changeIssue(issue);
    storeIssue(issue);
  }

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
