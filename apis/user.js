var _ = require('lodash');

const users = [
  {
    'name': 'Foo',
    'image': 'https://avatars1.githubusercontent.com/u/7220804?v=3&u=0e1f06f58768c5dbae5adb02e2513526ca5c79d1&s=140',
    'id': 1
  },
  {
    'name': 'Bar',
    'image': 'https://avatars1.githubusercontent.com/u/7220804?v=3&u=0e1f06f58768c5dbae5adb02e2513526ca5c79d1&s=140',
    'id': 2
  },
  {
    'name': 'Baz',
    'image': 'https://avatars1.githubusercontent.com/u/7220804?v=3&u=0e1f06f58768c5dbae5adb02e2513526ca5c79d1&s=140',
    'id': 3
  }
];

module.exports = (data) => {
  const currentUserList = [];
  _.each(data.userid, (id) => {
    const currentUser = _.findWhere(users, { 'id': id });
    currentUserList.push(currentUser);
  })

  return {
    'result': true,
    'message': '',
    'test': 'test',
    'data': currentUserList
  }
}