export default class Fixtures {

  baseUrl = 'http://localhost:4000';
  users = [
    {
      username: 'user1',
      name: 'user eins',
      email: 'user1@1.com',
      password: 'secret1'
    },
    {
      username: 'user2',
      name: 'user zwei',
      email: 'user2@2.com',
      password: 'secret2'
    }
  ];

  tweets = [
    {
      text: 'Test tweet 1',
      tweeter: this.users[0]
    },
    {
      text: 'Test tweet 2',
      tweeter: this.users[1]
    }
  ];
}
