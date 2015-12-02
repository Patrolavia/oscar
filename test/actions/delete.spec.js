import expect from 'expect';
import { mockStore, fakeServerSuccessRespond, fakeServerFailureRespond } from './helper';
import {
  initDeleteForm, deletePad, deleteCancel,
  DELETE_INIT, DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE, DELETE_CANCEL
} from 'actions/delete';

describe('actions delete', () => {

  it('creates DELETE_INIT when delete form has been initial', (done) => {
    const params = {
      test: 'Run the test'
    };
    const expectedActions = [
      { type: DELETE_INIT, params: params }
    ]
    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(initDeleteForm(params));
  });

  it('creates DELETE_SUCCESS when request successfully', (done) => {
    const successResponse = fakeServerSuccessRespond();
    const expectedActions = [
      { type: DELETE_REQUEST, parameters: undefined },
      { type: DELETE_SUCCESS, json: successResponse }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(deletePad({ padId: 1 }));
  });

  it('creates DELETE_FAILURE when server response error', (done) => {
    fakeServerFailureRespond();
    const expectedActions = [
      { type: DELETE_REQUEST, parameters: undefined },
      { type: DELETE_FAILURE, json: { errorStatus: 400 } }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(deletePad({ padId: 1 }));
  });

  it('creates DELETE_CANCEL when delete form has been close', (done) => {
    const expectedActions = [
      { type: DELETE_CANCEL}
    ]
    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(deleteCancel());
  });
});
