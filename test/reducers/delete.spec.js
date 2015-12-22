import expect from 'expect';
import reducer from 'reducers/delete';
import {
  DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE,
  DELETE_INIT, DELETE_CANCEL
} from 'actions/delete';

const initialState = {
  isRequesting: false,
  isActive: false
};

const stateAfterRequest = {
  isRequesting: true,
  isActive: false,
  result: false
};

describe('delete reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {type: '@@init'})
    ).toEqual(initialState)
  })

  it('should handle DELETE_INIT', () => {
    expect(
      reducer(initialState, {
        type: DELETE_INIT,
        params: 'Run the test'
      })
    ).toEqual(
      {
        isRequesting: false,
        isActive: true,
        padInfo: 'Run the test'
      }
    )
  })

  it('should handle DELETE_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: DELETE_REQUEST
      })
    ).toEqual(stateAfterRequest)
  })

  it('should handle DELETE_SUCCESS', () => {
    expect(
      reducer(stateAfterRequest, {
        type: DELETE_SUCCESS,
        json: {
          result: true
        }
      })
    ).toEqual(
      {
        errorStatus: null,
        result: true,
        isRequesting: false,
        isActive: false
      }
    )
  })

  it('should handle DELETE_FAILURE', () => {
    expect(
      reducer(stateAfterRequest, {
        type: DELETE_FAILURE,
        json: {
          errorStatus: 400
        }
      })
    ).toEqual(
      {
        result: false,
        isRequesting: false,
        isActive: false,
        errorStatus: 400
      }
    )
  })

  it('should handle DELETE_CANCEL', () => {
    expect(
      reducer(stateAfterRequest, {
        type: DELETE_CANCEL
      })
    ).toEqual(initialState)
  })
});
