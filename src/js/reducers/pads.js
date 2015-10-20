import {
  FETCH_PADS_REQUEST, FETCH_PADS_SUCCESS, FETCH_PADS_FAILURE,
  SEARCH_PADS_BY_TITLE, SEARCH_PADS_BY_USER, SEARCH_PADS_BY_TAG, SEARCH_OWN, SEARCH_ALL, SEARCH_CANCEL
} from 'actions';
import { merge, assign, pluck, uniq, union, filter, indexOf } from 'lodash';

const initialState = {
  isFetching: false,
  data: []
};

export default function Pads(state = initialState, action) {
  switch (action.type) {
    case FETCH_PADS_REQUEST:
      return merge({}, state, {
        message: 'Fetching pads...',
        isFetching: true,
        result: false
      });

    case FETCH_PADS_SUCCESS:
      return merge({}, state, action.json, {
        errorStatus: null,
        isFetching: false
      });

    case FETCH_PADS_FAILURE:
      return merge({}, state, action.json, {
        isFetching: false
      });

    case SEARCH_PADS_BY_TITLE:
      return assign({}, state, {
        isSearching: true,
        searchResult: filter(state.data, (data) => {
          var inputed = action.params.inputed.toLowerCase();
          return ~ data.title.toLowerCase().indexOf(inputed);
        })
      });

    case SEARCH_PADS_BY_USER:
      return assign({}, state, {
        isSearching: true,
        searchResult: filter(state.data, (data) => {
          var usersId = action.params.usersId;
          return ~ indexOf(usersId, data.user);
        })
      });

    case SEARCH_PADS_BY_TAG:
      return assign({}, state, {
        isSearching: true,
        searchResult: filter(state.data, (data) => {
          var inputed = action.params.inputed.toLowerCase();
          return ~ data.tags.toString().toLowerCase().indexOf(inputed)
        })
      });

    case SEARCH_OWN:
      return merge({}, state, {
        isSearchOwn: true
      });

    case SEARCH_ALL:
      return merge({}, state, {
        isSearchOwn: false
      });

    case SEARCH_CANCEL:
      return merge({}, state, {
        isSearching: false
      });

    default:
      return state;
  }
}
