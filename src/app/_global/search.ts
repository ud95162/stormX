/**
 * Created by kavindu on 6/28/2017.
 */
export class Search {
  // lsei_ - load search id
  // lsn_ - load search name
  // lsk_ search key

  static SEARCH_EMPLOYEE_ID: any = localStorage.getItem('lsei_');
  static SEARCH_EMPLOYEE_USERNAME: any = localStorage.getItem('lseun_');
  static SEARCH_KEY: any = localStorage.getItem('lsk_');
  static SEARCH_OBJECT: any = {
    'searchKey': Search.SEARCH_KEY,
    'searchOffset': 0,
    'searchFilter': 'All',
    'searchFilterValue': 'any'
  };
  static SEARCH_RESULT_SET: any = [];
  static SEARCH_COUNT: any;
  static PREVIOUS_SEARCH_LIST: any = [];
  static SEARCH_ROUTING: any = {
    'searchFrom': {
      'graph': 'GRAPH',
      'searchBar': 'SEARCH_BAR',
      'searchSuggestion': 'SEARCH_SUGGESTIONS',
      'projectCard': 'PROJECT_CARD'
    }
  };
}
