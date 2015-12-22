import expect from 'expect';
import reducer from 'reducers/pageTitle';
import {
  FETCH_PAD_REQUEST, FETCH_PAD_SUCCESS, FETCH_PAD_FAILURE,
  FETCH_PADS_FAILURE
} from 'actions/fetch';

const initialState = {
  title: 'Loading ...'
};

const errorOccurred = {
  title: 'Error!'
};

describe('pageTitle reducer', () => {
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
    ).toEqual(initialState)
  })

  it('should handle FETCH_PAD_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: FETCH_PAD_SUCCESS,
        json: {
          result: true,
          data: {
            title: 'Run the test'
          }
        }
      })
    ).toEqual(
      {
        title: 'Run the test'
      }
    )
  })

  it('should display "No such pad." when current pad does not exist', () => {
    expect(
      reducer(initialState, {
        type: FETCH_PAD_SUCCESS,
        json: {
          result: false
        }
      })
    ).toEqual(
      {
        title: 'No such pad.'
      }
    )
  })

  it('should handle FETCH_PAD_FAILURE and FETCH_PADS_FAILURE', () => {
    expect(
      reducer(initialState, {
        type: FETCH_PAD_FAILURE,
        json: {
          errorStatus: 400
        }
      })
    ).toEqual(errorOccurred)

    expect(
      reducer(initialState, {
        type: FETCH_PADS_FAILURE,
        json: {
          errorStatus: 400
        }
      })
    ).toEqual(errorOccurred)
  })

})
