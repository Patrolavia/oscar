export const SEARCH_PADS_BY_TITLE = 'SEARCH_PADS_BY_TITLE';
export const SEARCH_PADS_BY_USER = 'SEARCH_PADS_BY_USER';
export const SEARCH_PADS_BY_TAG = 'SEARCH_PADS_BY_TAG';
export const SEARCH_CANCEL = 'SEARCH_CANCEL';
export const SEARCH_OWN = 'SEARCH_OWN';
export const SEARCH_ALL = 'SEARCH_ALL';

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

export function searchOwn() {
  return dispatch => {
    dispatch({
      type: SEARCH_OWN
    });
  };
}

export function searchAll() {
  return dispatch => {
    dispatch({
      type: SEARCH_ALL
    });
  };
}
