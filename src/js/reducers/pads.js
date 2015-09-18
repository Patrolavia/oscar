import { FETCH_PADS_REQUEST, FETCH_PADS_SUCCESS } from 'actions';
const initialState = {
  result: false,
  message: 'Fetching pads...',
  data: []
};

export default function Pads(state = initialState, action) {
  switch (action.type) {
    case FETCH_PADS_REQUEST:
      return state;

    case FETCH_PADS_SUCCESS:
      return action.json || state;

    default:
      return state;
  }
}
