import expect from 'expect';
import reducer from 'reducers/pads';
import { FETCH_PADS_REQUEST, FETCH_PADS_SUCCESS, FETCH_PADS_FAILURE } from 'actions/fetch';
import { SEARCH_PADS_BY_TITLE, SEARCH_PADS_BY_USER, SEARCH_PADS_BY_TAG, SEARCH_OWN, SEARCH_ALL, SEARCH_CANCEL } from 'actions/search';

const padData = {
  user: 1,
  title: 'Run the test',
  tags: ['Run the test']
};

const initialState = {
  isFetching: false,
  data: []
};

const stateAfterRequest = {
  isFetching: true,
  result: false,
  data: []
};

const fetchedState = {
  errorStatus: null,
  isFetching: false,
  result: true,
  data: [padData]
};

describe('pads reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {type: '@@init'})
    ).toEqual(initialState)
  })

  it('should handle FETCH_PADS_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: FETCH_PADS_REQUEST
      })
    ).toEqual(stateAfterRequest)
  })

  it('should handle FETCH_PADS_SUCCESS', () => {
    expect(
      reducer(stateAfterRequest, {
        type: FETCH_PADS_SUCCESS,
        json: {
          result: true,
          data: [padData]
        }
      })
    ).toEqual(fetchedState)
  })

  it('should handle FETCH_PADS_FAILURE', () => {
    expect(
      reducer(stateAfterRequest, {
        type: FETCH_PADS_FAILURE,
        json: {
          errorStatus: 400
        }
      })
    ).toEqual(
      {
        isFetching: false,
        result: false,
        data: [],
        errorStatus: 400
      }
    )
  })

  it('should handle SEARCH_PADS_BY_TITLE', () => {
    expect(
      reducer(fetchedState, {
        type: SEARCH_PADS_BY_TITLE,
        params: {
          type: 'title',
          inputed: 'No results.'
        }
      })
    ).toEqual(
      {
        isSearching: true,
        isFetching: false,
        errorStatus: null,
        result: true,
        data: [padData],
        searchParams: {
          type: 'title',
          inputed: 'No results.'
        },
        searchResult: []
      }
    )

    expect(
      reducer(fetchedState, {
        type: SEARCH_PADS_BY_TITLE,
        params: {
          type: 'title',
          inputed: 'Run the test'
        }
      })
    ).toEqual(
      {
        isSearching: true,
        isFetching: false,
        errorStatus: null,
        result: true,
        data: [padData],
        searchParams: {
          type: 'title',
          inputed: 'Run the test'
        },
        searchResult: [padData]
      }
    )
  })

  it('should handle SEARCH_PADS_BY_USER', () => {
    expect(
      reducer(fetchedState, {
        type: SEARCH_PADS_BY_USER,
        params: {
          type: 'user',
          usersId: [0]
        }
      })
    ).toEqual(
      {
        isSearching: true,
        isFetching: false,
        errorStatus: null,
        result: true,
        data: [padData],
        searchParams: {
          type: 'user',
          usersId: [0]
        },
        searchResult: []
      }
    )

    expect(
      reducer(fetchedState, {
        type: SEARCH_PADS_BY_USER,
        params: {
          type: 'user',
          usersId: [1]
        }
      })
    ).toEqual(
      {
        isSearching: true,
        isFetching: false,
        errorStatus: null,
        result: true,
        data: [padData],
        searchParams: {
          type: 'user',
          usersId: [1]
        },
        searchResult: [padData]
      }
    )
  })

  it('should handle SEARCH_PADS_BY_TAG', () => {
    expect(
      reducer(fetchedState, {
        type: SEARCH_PADS_BY_TAG,
        params: {
          type: 'tag',
          inputed: 'No results.'
        }
      })
    ).toEqual(
      {
        isSearching: true,
        isFetching: false,
        errorStatus: null,
        result: true,
        data: [padData],
        searchParams: {
          type: 'tag',
          inputed: 'No results.'
        },
        searchResult: []
      }
    )

    expect(
      reducer(fetchedState, {
        type: SEARCH_PADS_BY_TAG,
        params: {
          type: 'tag',
          inputed: 'Run the test'
        }
      })
    ).toEqual(
      {
        isSearching: true,
        isFetching: false,
        errorStatus: null,
        result: true,
        data: [padData],
        searchParams: {
          type: 'tag',
          inputed: 'Run the test'
        },
        searchResult: [padData]
      }
    )
  })

  it('should handle SEARCH_OWN', () => {
    expect(
      reducer(fetchedState, {
        type: SEARCH_OWN
      })
    ).toEqual(
      {
        isSearchOwn: true,
        isFetching: false,
        errorStatus: null,
        result: true,
        data: [padData]
      }
    )
  })

  it('should handle SEARCH_ALL', () => {
    expect(
      reducer(fetchedState, {
        type: SEARCH_ALL
      })
    ).toEqual(
      {
        isSearchOwn: false,
        isFetching: false,
        errorStatus: null,
        result: true,
        data: [padData]
      }
    )
  })

  it('should handle SEARCH_CANCEL', () => {
    expect(
      reducer({
        isSearching: true,
        isFetching: false,
        errorStatus: null,
        result: true,
        data: [padData],
        searchParams: {
          type: 'user',
          usersId: [1]
        },
        searchResult: [padData]
      }, {
        type: SEARCH_CANCEL
      })
    ).toEqual(
      {
        isSearching: false,
        isSearchOwn: false,
        isFetching: false,
        errorStatus: null,
        result: true,
        data: [padData],
        searchParams: {
          type: 'title',
          inputed: '',
          usersId: []
        },
        searchResult: [padData]
      }
    )
  })
});
