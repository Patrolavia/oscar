export * from './fetch';
export * from './edit';
export * from './delete';
export * from './create';

import request from 'superagent';

export const sendRequest = (
  type,
  actionTypes,
  dispatch,
  APIUrl,
  parameters
) => {
  const [ SUCCESS_TYPE, FAILURE_TYPE, REQUIRE_TYPE ] = actionTypes;
  if (REQUIRE_TYPE) {
    dispatch({
      type: REQUIRE_TYPE,
      parameters
    });
  }

  return request(type, APIUrl)
    .send(parameters)
    .end((err, res) => {
      const json = res.body || {};
      if (err) {
        json.errorStatus = res.statusCode;
      }

      const currentType = (err) ? FAILURE_TYPE : SUCCESS_TYPE;
      dispatch({
        type: currentType,
        json
      });
    });
}
