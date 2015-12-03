import expect from 'expect';
import reducer from 'reducers/auth';
import {
  FETCH_ME_REQUEST, FETCH_ME_SUCCESS, FETCH_ME_FAILURE,
  FETCH_PATHS_REQUEST, FETCH_PATHS_SUCCESS, FETCH_PATHS_FAILURE
} from 'actions/fetch';

const initialState = {
  result: false,
  data: {
    name: 'Login'
  }
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {type: '@@init'})
    ).toEqual(initialState)
  })

  it('should handle FETCH_ME_REQUEST and FETCH_PATHS_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: FETCH_ME_REQUEST
      })
    ).toEqual(
      {
        result: false,
        data: {
          name: 'Login'
        }
      }
    )
  })

  it('should handle FETCH_ME_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: FETCH_ME_SUCCESS,
        json: {
          data: {
            name: 'Test User'
          }
        }
      })
    ).toEqual(
      {
        result: false,
        errorStatus: null,
        data: {
          name: 'Test User'
        }
      }
    )
  })

  it('should handle FETCH_PATHS_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: FETCH_PATHS_SUCCESS,
        json: ['google']
      })
    ).toEqual(
      {
        result: false,
        errorStatus: null,
        data: {
          name: 'Login'
        },
        paths: ['google']
      }
    )
  })

  it('should handle FETCH_ME_FAILURE and FETCH_PATHS_FAILURE', () => {
    expect(
      reducer(initialState, {
        type: FETCH_ME_FAILURE,
        json: {
          errorStatus: 400
        }
      })
    ).toEqual(
      {
        result: false,
        data: {
          name: 'Login'
        },
        errorStatus: 400
      }
    )
  })
});
