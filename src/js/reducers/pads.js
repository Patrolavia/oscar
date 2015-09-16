const [FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE] = {FETCH_REQUEST: 'FETCH_REQUEST', FETCH_SUCCESS:'FETCH_SUCCESS', FETCH_FAILURE: 'FETCH_FAILURE'};
const initialState = {};

export default function Pads(state = initialState, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return state;

    case FETCH_SUCCESS:
      return action.result;

    case FETCH_FAILURE:
      return state;

    default:
      return state;
  }
}
