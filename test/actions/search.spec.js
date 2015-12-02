import expect from 'expect';
import { mockStore } from './helper';
import {
  searchPad, searchCancel, searchOwn, searchAll,
  SEARCH_PADS_BY_TITLE, SEARCH_PADS_BY_USER, SEARCH_PADS_BY_TAG,
  SEARCH_CANCEL, SEARCH_OWN, SEARCH_ALL
} from 'actions/search';

describe('actions search', () => {

  it('creates SEARCH_PADS_BY_TITLE when search by title', (done) => {
    const expectedActions = [
      { type: SEARCH_PADS_BY_TITLE, params: { type: 'title', inputed: 'apple' } }
    ]
    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(searchPad({ type: 'title', inputed: 'apple' }));
  });

  it('creates SEARCH_PADS_BY_USER when search by user name', (done) => {
    const expectedActions = [
      { type: SEARCH_PADS_BY_USER, params: { type: 'user', inputed: 'abe' } }
    ]
    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(searchPad({ type: 'user', inputed: 'abe' }));
  });

  it('creates SEARCH_PADS_BY_TAG when search by tag', (done) => {
    const expectedActions = [
      { type: SEARCH_PADS_BY_TAG, params: { type: 'tag', inputed: 'travel' } }
    ]
    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(searchPad({ type: 'tag', inputed: 'travel' }));
  });

  it('creates SEARCH_CANCEL when input value is empty or search form has been close', (done) => {
    const expectedActions = [
      { type: SEARCH_CANCEL }
    ]
    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(searchCancel());
  });

  it('creates SEARCH_OWN when search own pad option is active', (done) => {
    const expectedActions = [
      { type: SEARCH_OWN }
    ]
    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(searchOwn());
  });

  it('creates SEARCH_ALL when search own pad option deactive', (done) => {
    const expectedActions = [
      { type: SEARCH_ALL }
    ]
    const store = mockStore({result: false}, expectedActions, done);
    store.dispatch(searchAll());
  });

});
