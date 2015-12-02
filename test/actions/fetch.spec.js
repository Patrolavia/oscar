import expect from 'expect';
import { mockStore, fakeServerSuccessRespond, fakeServerFailureRespond } from './helper';
import {
  fetchPads, FETCH_PADS_REQUEST, FETCH_PADS_SUCCESS, FETCH_PADS_FAILURE,
  fetchPad, FETCH_PAD_REQUEST, FETCH_PAD_SUCCESS, FETCH_PAD_FAILURE,
  initToc, INIT_TOC,
  resetPadState, PAD_RESET,

  fetchUsers, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
  fetchUser, FETCH_USER_SUCCESS, FETCH_USER_FAILURE,
  fetchMe, FETCH_ME_SUCCESS, FETCH_ME_FAILURE,

  fetchPaths, FETCH_PATHS_SUCCESS, FETCH_PATHS_FAILURE
} from 'actions/fetch';

describe('actions fetch', () => {

  it('creates FETCH_PADS_SUCCESS when request successfully', (done) => {
    const successResponse = fakeServerSuccessRespond();
    const expectedActions = [
      { type: FETCH_PADS_REQUEST, parameters: undefined },
      { type: FETCH_PADS_SUCCESS, json: successResponse }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(fetchPads());
  });

  it('creates FETCH_PADS_FAILURE when server response error', (done) => {
    fakeServerFailureRespond();
    const expectedActions = [
      { type: FETCH_PADS_REQUEST, parameters: undefined },
      { type: FETCH_PADS_FAILURE, json: { errorStatus: 400 } }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(fetchPads());
  });

  it('creates FETCH_PAD_SUCCESS when request successfully', (done) => {
    const successResponse = fakeServerSuccessRespond();
    const expectedActions = [
      { type: FETCH_PAD_REQUEST, parameters: undefined },
      { type: FETCH_PAD_SUCCESS, json: successResponse }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(fetchPad({ pid: 0 }));
  });

  it('creates FETCH_PAD_FAILURE when server response error', (done) => {
    fakeServerFailureRespond();
    const expectedActions = [
      { type: FETCH_PAD_REQUEST, parameters: undefined },
      { type: FETCH_PAD_FAILURE, json: { errorStatus: 400 } }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(fetchPad({ pid: 0 }));
  });

  it('creates INIT_TOC when pad has been fetched successfully.', (done) => {
    const expectedActions = [
      { type: INIT_TOC, param: { test: 'run the test' } }
    ]
    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(initToc({ test: 'run the test' }));
  });

  it('creates PAD_RESET when leave the current pad page.', (done) => {
    const expectedActions = [
      { type: PAD_RESET }
    ]
    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(resetPadState());
  });

  it('creates FETCH_USERS_SUCCESS when request successfully', (done) => {
    const successResponse = fakeServerSuccessRespond();
    const expectedActions = [
      { type: FETCH_USERS_SUCCESS, json: successResponse }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(fetchUsers());
  });

  it('creates FETCH_USERS_FAILURE when server response error', (done) => {
    fakeServerFailureRespond();
    const expectedActions = [
      { type: FETCH_USERS_FAILURE, json: { errorStatus: 400 } }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(fetchUsers());
  });

  it('creates FETCH_USER_SUCCESS when request successfully', (done) => {
    const successResponse = fakeServerSuccessRespond();
    const expectedActions = [
      { type: FETCH_USER_SUCCESS, json: successResponse }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(fetchUser({useridArray: [1]}));
  });

  it('creates FETCH_USER_FAILURE when server response error', (done) => {
    fakeServerFailureRespond();
    const expectedActions = [
      { type: FETCH_USER_FAILURE, json: { errorStatus: 400 } }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(fetchUser({useridArray: [1]}));
  });

  it('creates FETCH_ME_SUCCESS when request successfully', (done) => {
    const successResponse = fakeServerSuccessRespond();
    const expectedActions = [
      { type: FETCH_ME_SUCCESS, json: successResponse }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(fetchMe());
  });

  it('creates FETCH_ME_FAILURE when server response error', (done) => {
    fakeServerFailureRespond();
    const expectedActions = [
      { type: FETCH_ME_FAILURE, json: { errorStatus: 400 } }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(fetchMe());
  });

  it('creates FETCH_PATHS_SUCCESS when request successfully', (done) => {
    const successResponse = fakeServerSuccessRespond();
    const expectedActions = [
      { type: FETCH_PATHS_SUCCESS, json: successResponse }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(fetchPaths());
  });

  it('creates FETCH_PATHS_FAILURE when server response error', (done) => {
    fakeServerFailureRespond();
    const expectedActions = [
      { type: FETCH_PATHS_FAILURE, json: { errorStatus: 400 } }
    ]

    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(fetchPaths());
  });

});
