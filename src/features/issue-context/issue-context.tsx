import React, { useState, useReducer } from 'react';
import { Issue } from '~features/issue-selector/models/issue';
import { Action } from '~core/models/action';

export interface IssueContextStore {
  issue?: Issue;
  changeIssue: (issue: Issue) => void;
  storeIssue: (issue: Issue) => void;
  issueHistory: Issue[];
}

const defaultContext: IssueContextStore = {
  issue: undefined,
  issueHistory: [],
  changeIssue: () => null,
  storeIssue: () => null,
};

enum IssueStoreReducerActionTypes {
  Add = 'issue_store.add',
  Delete = 'issue_store.delete',
}

interface IssueStoreReducerAction {
  type: IssueStoreReducerActionTypes;
}

interface RemoveIssueAction extends Action<typeof IssueStoreReducerActionTypes.Delete> {
  index: number;
}

interface AddIssueAction extends Action<typeof IssueStoreReducerActionTypes.Add> {
  issue: Issue;
}

type IssueStoreReducerActions = RemoveIssueAction | AddIssueAction;

function issueStoreReducer(state: Issue[] = [], action: IssueStoreReducerActions) {
  switch (action.type) {
    case IssueStoreReducerActionTypes.Add:
      return [...state, action.issue];
    case IssueStoreReducerActionTypes.Delete:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
    default:
      return state;
  }
}

export const IssueContext = React.createContext<IssueContextStore>(defaultContext);

export const IssueContextProvider: React.FC = props => {
  const [currentIssue, seCurrenttIssue] = useState<Issue>();
  const [issueHistory, dispatch] = useReducer(issueStoreReducer, []);

  function changeIssue(issue: Issue) {
    seCurrenttIssue(issue);
  }

  return (
    <IssueContext.Provider
      value={{
        issue: currentIssue,
        changeIssue: changeIssue,
        storeIssue: issue => dispatch({ type: IssueStoreReducerActionTypes.Add, issue: issue }),
        issueHistory: issueHistory,
      }}
    >
      {props.children}
    </IssueContext.Provider>
  );
};
