/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchIssue
// ====================================================

export interface searchIssue_search_nodes_App {
  __typename: "App" | "MarketplaceListing" | "Organization" | "PullRequest" | "Repository" | "User";
}

export interface searchIssue_search_nodes_Issue_author {
  __typename: "EnterpriseUserAccount" | "Organization" | "User" | "Mannequin" | "Bot";
  /**
   * The username of the actor.
   */
  login: string;
}

export interface searchIssue_search_nodes_Issue_labels_nodes {
  __typename: "Label";
  /**
   * Identifies the label color.
   */
  color: string;
  /**
   * Identifies the label name.
   */
  name: string;
}

export interface searchIssue_search_nodes_Issue_labels {
  __typename: "LabelConnection";
  /**
   * A list of nodes.
   */
  nodes: (searchIssue_search_nodes_Issue_labels_nodes | null)[] | null;
}

export interface searchIssue_search_nodes_Issue {
  __typename: "Issue";
  id: string;
  /**
   * Identifies the issue title.
   */
  title: string;
  /**
   * Identifies the state of the issue.
   */
  state: IssueState;
  /**
   * `true` if the object is closed (definition of closed may depend on type)
   */
  closed: boolean;
  /**
   * The actor who authored the comment.
   */
  author: searchIssue_search_nodes_Issue_author | null;
  /**
   * A list of labels associated with the object.
   */
  labels: searchIssue_search_nodes_Issue_labels | null;
}

export type searchIssue_search_nodes = searchIssue_search_nodes_App | searchIssue_search_nodes_Issue;

export interface searchIssue_search {
  __typename: "SearchResultItemConnection";
  /**
   * A list of nodes.
   */
  nodes: (searchIssue_search_nodes | null)[] | null;
}

export interface searchIssue {
  /**
   * Perform a search across resources.
   */
  search: searchIssue_search;
}

export interface searchIssueVariables {
  query: string;
  count?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchRepository
// ====================================================

export interface searchRepository_search_nodes_App {
  __typename: "App" | "Issue" | "MarketplaceListing" | "Organization" | "PullRequest" | "User";
}

export interface searchRepository_search_nodes_Repository {
  __typename: "Repository";
  /**
   * The name of the repository.
   */
  name: string;
}

export type searchRepository_search_nodes = searchRepository_search_nodes_App | searchRepository_search_nodes_Repository;

export interface searchRepository_search {
  __typename: "SearchResultItemConnection";
  /**
   * A list of nodes.
   */
  nodes: (searchRepository_search_nodes | null)[] | null;
}

export interface searchRepository {
  /**
   * Perform a search across resources.
   */
  search: searchRepository_search;
}

export interface searchRepositoryVariables {
  query: string;
  count: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * The possible states of an issue.
 */
export enum IssueState {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
