import expect from 'expect';
import reducer from 'reducers/pad';
import {
  FETCH_PAD_REQUEST, FETCH_PAD_SUCCESS, FETCH_PAD_FAILURE,
  INIT_TOC, PAD_RESET
} from 'actions/fetch';

const initialState = {
  isFetching: false,
  result: false,
  data: {},
  toc: {}
};

const stateAfterRequest = {
  isFetching: true,
  result: false,
  data: {},
  toc: {}
};

describe('pad reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {type: '@@init'})
    ).toEqual(initialState)
  })

  it('should handle FETCH_PAD_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: FETCH_PAD_REQUEST
      })
    ).toEqual(stateAfterRequest)
  })

  it('should handle FETCH_PAD_SUCCESS', () => {
    expect(
      reducer(stateAfterRequest, {
        type: FETCH_PAD_SUCCESS,
        json: {
          result: true,
          data: {
            code: 0
          }
        }
      })
    ).toEqual(
      {
        errorStatus: null,
        isFetching: false,
        result: true,
        data: {
          code: 0
        },
        toc: {}
      }
    )
  })

  it('should handle FETCH_PAD_FAILURE', () => {
    expect(
      reducer(stateAfterRequest, {
        type: FETCH_PAD_FAILURE,
        json: {
          errorStatus: 400
        }
      })
    ).toEqual(
      {
        isFetching: false,
        result: false,
        data: {},
        toc: {},
        errorStatus: 400
      }
    )
  })

  it('should handle INIT_TOC', () => {
    expect(
      reducer(initialState, {
        type: INIT_TOC,
        param: {
          headings: {1: 'h1#heading1'}
        }
      })
    ).toEqual(
      {
        isFetching: false,
        result: false,
        data: {},
        toc: {1: 'h1#heading1'}
      }
    )
  })

  it('should handle PAD_RESET', () => {
    expect(
      reducer({
        errorStatus: null,
        isFetching: false,
        result: true,
        data: {
          code: 0
        },
        toc: {1: 'h1#heading1'}
      }, {
        type: PAD_RESET
      })
    ).toEqual(initialState)
  })
});
