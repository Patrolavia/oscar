const message = [
  'Success.',
  'Not logged in.',
  'No such pad.',
  'Not owner.',
  'Unknown error.'
];

module.exports = (statusCode) => {
  return {
    'result': (statusCode === 0) ? true : false,
    'message': message[statusCode],
    'data': {
      'code': statusCode
    }
  }
}
