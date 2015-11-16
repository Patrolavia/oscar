import expect from 'expect';
import { createPad, CREATE_SUCCESS, CREATE_FAILURE, CREATE_REQUEST } from 'actions/create';

import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middlewares = [thunk];

/**
 * Creates a mock of Redux store with middleware.
 */
function mockStore(getState, expectedActions, done) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.');
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.');
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState;
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift();
        try {
          expect(action).toEqual(expectedAction);
          if (done && !expectedActions.length) {
            done();
          }
          return action;
        } catch (e) {
          done(e);
        }
      }
    }
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
}

let store;

describe('actions create', () => {

  before(function(done){
    const parameters = {
      props: 'Run the test'
    }
    const expectedActions = [
      { type: CREATE_REQUEST, parameters: undefined },
      { type: CREATE_SUCCESS, parameters },
      { type: CREATE_FAILURE, parameters }
    ]
    store = mockStore({result: false}, expectedActions, done);
    done();
  }),

  it('should create createPad action', () => {
    const server = sinon.fakeServer.create();
    server.respondWith = ['POST', '/api/create', [200, { "Content-Type": "application/json" }, {result: true}]];
    store.dispatch(createPad());
  });
});
