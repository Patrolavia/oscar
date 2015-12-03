import expect from 'expect';
import { mockStore, fakeServerSuccessRespond, fakeServerFailureRespond } from './helper';
import {
  editPad, resetEditState,
  EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE, EDIT_RESET
} from 'actions/edit';

describe('actions edit', () => {
  it('creates EDIT_SUCCESS when request successfully', (done) => {
    const successResponse = fakeServerSuccessRespond();
    const expectedActions = [
      { type: EDIT_REQUEST, parameters: { title: 'run the test' } },
      { type: EDIT_SUCCESS, json: successResponse }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(editPad({ pid: 1, parameter: { title: 'run the test' }} ));
  });

  it('creates EDIT_FAILURE when server response error', (done) => {
    fakeServerFailureRespond();
    const expectedActions = [
      { type: EDIT_REQUEST, parameters: { title: 'run the test' } },
      { type: EDIT_FAILURE, json: { errorStatus: 400 } }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(editPad({ pid: 1, parameter: { title: 'run the test' }} ));
  });

  it('creates EDIT_RESET when leave the current editor page', (done) => {
    const expectedActions = [
      { type: EDIT_RESET }
    ]
    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(resetEditState());
  });
});
