import expect from 'expect';
import reducer from 'reducers/users';
import {
  FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
  FETCH_USER_SUCCESS
} from 'actions/fetch';

const initialState = {
  data: []
};

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {type: '@@init'})
    ).toEqual(initialState)
  })

  it('should handle FETCH_USER_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: FETCH_USER_SUCCESS,
        json: {
          data: [
            {
              id: 1
            }
          ]
        }
      })
    ).toEqual({
      data: [
        {
          id: 1
        }
      ]
    })
  })

  it('should handle FETCH_USERS_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: FETCH_USER_SUCCESS,
        json: {
          data: [
            {
              id: 1
            }
          ]
        }
      })
    ).toEqual({
      data: [
        {
          id: 1
        }
      ]
    })
  })

  it('should handle FETCH_USERS_FAILURE', () => {
    expect(
      reducer(initialState, {
        type: FETCH_USERS_FAILURE,
        json: {
          errorStatus: 400
        }
      })
    ).toEqual({
      errorStatus: 400,
      data: []
    })
  })
});
