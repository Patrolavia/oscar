import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from 'actions';
const initialState = {
  result: false,
  message: 'Fetching users...',
  data: []
};

export default function Pads(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return state;

    case FETCH_USERS_SUCCESS:
      return action.json || state;

    default:
      return state;
  }
}
