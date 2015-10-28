import { DELETE_INIT, DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE, DELETE_CANCEL } from 'actions';
import { merge, assign } from 'lodash';

const initialState = {
  isRequesting: false,
  isActive: false
};

export default function Delete(state = initialState, action) {
  switch (action.type) {
    case DELETE_INIT:
      return assign({}, initialState, {
        isRequesting: false,
        isActive: true,
        padInfo: action.params
      });

    case DELETE_REQUEST:
      return assign({}, state, {
        message: 'Sending delete request...',
        isRequesting: true,
        result: false
      });

    case DELETE_SUCCESS:
      return merge({}, state, action.json, {
        errorStatus: null,
        isActive: !action.json.result,
        isRequesting: false
      });

    case DELETE_FAILURE:
      return merge({}, state, action.json, {
        isRequesting: false
      });

    case DELETE_CANCEL:
      return initialState;

    default:
      return state;
  }
}
