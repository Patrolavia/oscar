const message = [
  'Success.',
  'Not logged in.',
  'No such pad.',
  'Not cooperator.',
  'Failed to save pad.',
  'Version not match'
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
