import { FETCH_PAD_REQUEST, FETCH_PAD_SUCCESS, FETCH_PAD_FAILURE, INIT_TOC, PAD_RESET } from 'actions';
import { merge, assign } from 'lodash';

const initialState = {
  isFetching: false,
  result: false,
  data: {},
  toc: {}
};

export default function Pad(state = initialState, action) {
  switch (action.type) {
    case FETCH_PAD_REQUEST:
      return merge({}, initialState, {
        message: 'Fetching pad...',
        isFetching: true,
        result: false
      });

    case FETCH_PAD_SUCCESS:
      return merge({}, state, action.json, {
        errorStatus: null,
        isFetching: false
      });

    case FETCH_PAD_FAILURE:
      return merge({}, state, action.json, {
        isFetching: false,
        result: false
      });

    case INIT_TOC:
      return assign({}, state, {
        toc: action.param.headings
      });

    case PAD_RESET:
      return initialState;

    default:
      return state;
  }
}
