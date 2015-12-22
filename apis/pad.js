const data = [
  {
    'title': 'Pad 1 title',
    'content': '# PadContent 1',
    'html': '<h1>PadContent 1</h1>',
    'user': 1,
    'cooperator': [],
    'tags': [],
    'version': 0,
    'id': 1
  },
  {
    'title': 'Pad 2 title',
    'content': '# PadContent 2',
    'html': '<h1>PadContent 2</h1>',
    'user': 2,
    'cooperator': [1],
    'tags': ['Tag'],
    'version': 0,
    'id': 2
  },
  {
    'title': 'Pad 3 title',
    'content': '# PadContent 3',
    'html': '<h1>PadContent 3</h1>',
    'user': 3,
    'cooperator': [],
    'tags': ['No authority'],
    'version': 0,
    'id': 3
  }
]

module.exports = (padId) => {
  const isValid = (padId < 5 && padId > 0);
  const message = (isValid) ? '' : 'Cannot load pad#' + padId + ' from database.';
  const ret = {
    'result': isValid,
    'message': message
  }
  if (isValid) ret.data = data[padId - 1];

  return ret;
};
