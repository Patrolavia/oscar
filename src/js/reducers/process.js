import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from 'actions';

const initialState = {
  isFetching: false
};

export default function Process(state = initialState, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return { isFetching: true };

    case FETCH_SUCCESS:
      return { isFetching: false };

    case FETCH_FAILURE:
      return { isFetching: false };

    default:
      return state;
  }
}
