import expect from 'expect';
import {
  initDeleteForm, deletePad, deleteCancel,
  DELETE_INIT, DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE, DELETE_CANCEL
} from 'actions/delete';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('actions delete', () => {

  it('creates DELETE_INIT when form has been initial', (done) => {
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
    const server = sinon.fakeServer.create();
    const successResponse = {result: true};
    server.respondWith([
      200,
      { "Content-Type": "text/html", "Content-Length": 2 },
      JSON.stringify(successResponse)
    ]);
    server.autoRespond = true;

    const expectedActions = [
      { type: DELETE_REQUEST, parameters: undefined },
      { type: DELETE_SUCCESS, json: successResponse }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(deletePad({ padId: 1 }));
  });

  it('creates DELETE_FAILURE when server response error', (done) => {
    const server = sinon.fakeServer.create();
    server.respondWith([
      400,
      { "Content-Type": "text/html", "Content-Length": 2 },
      '{}'
    ]);
    server.autoRespond = true;

    const expectedActions = [
      { type: DELETE_REQUEST, parameters: undefined },
      { type: DELETE_FAILURE, json: { errorStatus: 400 } }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(deletePad({ padId: 1 }));
  });

  it('creates DELETE_CANCEL when form has been close', (done) => {
    const expectedActions = [
      { type: DELETE_CANCEL}
    ]
    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(deleteCancel({ type: DELETE_CANCEL }));
  });
});
