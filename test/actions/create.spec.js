import expect from 'expect';
import { mockStore, fakeServerSuccessRespond, fakeServerFailureRespond } from './helper';
import {
  createPad,
  CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE
} from 'actions/create';

describe('actions create', () => {
  it('creates CREATE_SUCCESS when request successfully', (done) => {
    const successResponse = fakeServerSuccessRespond();
    const expectedActions = [
      { type: CREATE_REQUEST, parameters: { title: 'run the test' } },
      { type: CREATE_SUCCESS, json: successResponse }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(createPad({ title: 'run the test' }));
  });

  it('creates CREATE_FAILURE when server response error', (done) => {
    fakeServerFailureRespond();
    const expectedActions = [
      { type: CREATE_REQUEST, parameters: { title: 'run the test' } },
      { type: CREATE_FAILURE, json: { errorStatus: 400 } }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(createPad({ title: 'run the test' }));
  });
});
