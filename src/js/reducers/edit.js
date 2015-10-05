import { EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE, EDIT_RESET } from 'actions';
import { merge } from 'lodash';

const initialState = {
  isRequesting: false,
  data: {}
};

export default function Edit(state = initialState, action) {
  switch (action.type) {
    case EDIT_REQUEST:
      return merge({}, initialState, {
        message: 'Sending edit request...',
        isRequesting: true,
        result: false,
        requestData: JSON.parse(action.parameters)
      });

    case EDIT_SUCCESS:
      return merge({}, state, action.json, {
        errorStatus: null,
        isRequesting: false
      });

    case EDIT_FAILURE:
      return merge({}, state, action.json, {
        isRequesting: false
      });

    case EDIT_RESET:
      return initialState;

    default:
      return state;
  }
}
