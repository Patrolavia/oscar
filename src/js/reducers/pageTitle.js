import {
  FETCH_PAD_REQUEST, FETCH_PAD_SUCCESS, FETCH_PAD_FAILURE,
  FETCH_PADS_FAILURE
} from 'actions';

import { merge } from 'lodash';

const initialState = {
  title: 'Loading ...'
};

const errorOccurred = {
  title: 'Error!'
};

export default function PageTitle(state = initialState, action) {
  switch (action.type) {
    case FETCH_PAD_REQUEST:
      return initialState;

    case FETCH_PAD_FAILURE: case FETCH_PADS_FAILURE:
      return errorOccurred;

    case FETCH_PAD_SUCCESS:
      const padData = action.json.data;
      return merge({}, state, {
        title: (padData) ? padData.title : 'No such pad.'
      });

    default:
      return state;
  }
}
