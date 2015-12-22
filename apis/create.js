const message = [
  "Success, pad id is return via id field.",
  "Not logged in.",
  "Failed to save into database.",
  "Not permit to create pad."
];

module.exports = (statusCode) => {
  return {
    "result": (statusCode === 0) ? true : false,
    "message": message[statusCode],
    "data": {
      "code": statusCode,
      "id": 1
    }
  }
}
