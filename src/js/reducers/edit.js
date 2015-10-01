import { EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE } from 'actions';
import { merge } from 'lodash';

const initialState = {
  isRequesting: false,
  data: []
};

export default function Edit(state = initialState, action) {
  switch (action.type) {
    case EDIT_REQUEST:
      console.log(action)
      return merge({}, initialState, {
        message: 'Sending edit request...',
        isRequesting: true,
        result: false
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

    default:
      return state;
  }
}
