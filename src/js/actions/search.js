export const SEARCH_PADS_BY_TITLE = 'SEARCH_PADS_BY_TITLE';
export const SEARCH_PADS_BY_USER = 'SEARCH_PADS_BY_USER';
export const SEARCH_PADS_BY_TAG = 'SEARCH_PADS_BY_TAG';
export const SEARCH_CANCEL = 'SEARCH_CANCEL';

const searchTypes = {
  'title': SEARCH_PADS_BY_TITLE,
  'user': SEARCH_PADS_BY_USER,
  'tag': SEARCH_PADS_BY_TAG
}

export function searchPad(params) {
  return dispatch => {
    dispatch({
      type: searchTypes[params.type],
      params
    });
  };
}

export function searchCancel() {
  return dispatch => {
    dispatch({
      type: SEARCH_CANCEL
    });
  };
}
