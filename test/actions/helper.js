import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const middlewares = [thunk];
export const mockStore = configureStore(middlewares);

export const fakeServerSuccessRespond = () => {
  const server = sinon.fakeServer.create();
  const successResponse = {result: true};
  server.autoRespond = true;
  server.respondWith([
    200,
    { "Content-Type": "text/html", "Content-Length": 1 },
    JSON.stringify(successResponse)
  ]);
  return successResponse;
}

export const fakeServerFailureRespond = () => {
  const server = sinon.fakeServer.create();
    const successResponse = {result: false};
    server.autoRespond = true;
    server.respondWith([
      400,
      { "Content-Type": "text/html", "Content-Length": 1 },
      '{}'
    ]);
  return;
}
