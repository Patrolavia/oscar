import {
  FETCH_PADS_REQUEST, FETCH_PADS_SUCCESS, FETCH_PADS_FAILURE,
  SEARCH_PADS_BY_TITLE, SEARCH_PADS_BY_USER, SEARCH_PADS_BY_TAG
} from 'actions';
import { merge, assign } from 'lodash';

const initialState = {
  isFetching: false,
  data: []
};

export default function Pads(state = initialState, action) {
  switch (action.type) {
    case FETCH_PADS_REQUEST:
      return merge({}, initialState, {
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
      console.log('SEARCH_PADS_BY_TITLE');
      return

    case SEARCH_PADS_BY_USER:
      return

    case SEARCH_PADS_BY_TAG:
      return

    default:
      return state;
  }
}
