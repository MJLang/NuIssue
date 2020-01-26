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

//==============================================================
// END Enums and Input Objects
//==============================================================
