import expect from 'expect';
import reducer from 'reducers/editor';
import {
  EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE, EDIT_RESET,
  CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE
} from 'actions/edit';
var json = require('locales/en-us/editor.json');

const initialState = {
  isRequesting: false,
  data: {}
};

const parameters = JSON.stringify({content: 'Run the test'});

const stateAfterRequest = {
  isRequesting: true,
  result: false,
  requestData: parameters,
  data: {}
};

describe('editor reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {type: '@@init'})
    ).toEqual(initialState)
  })

  it('should handle EDIT_REQUEST and CREATE_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: EDIT_REQUEST,
        parameters: parameters
      })
    ).toEqual(stateAfterRequest)
  })

  it('should handle EDIT_SUCCESS and CREATE_SUCCESS', () => {
    expect(
      reducer(stateAfterRequest, {
        type: EDIT_SUCCESS,
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
        isRequesting: false,
        result: true,
        data: {
          code: 0
        },
        requestData: parameters
      }
    )
  })

  it('should handle EDIT_FAILURE and CREATE_FAILURE', () => {
    expect(
      reducer(stateAfterRequest, {
        type: EDIT_FAILURE,
        json: {
          errorStatus: 400
        }
      })
    ).toEqual(
      {
        result: false,
        isRequesting: false,
        errorStatus: 400,
        data: {},
        requestData: parameters
      }
    )
  })

  it('should handle EDIT_RESET', () => {
    expect(
      reducer({
        isRequesting: false,
        result: true,
        data: {
          code: 0
        },
        requestData: parameters
      }, {
        type: EDIT_RESET
      })
    ).toEqual(initialState)
  })
});
