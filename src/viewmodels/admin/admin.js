import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {UserUpdate} from '../../services/messages';

@inject(TwitterService)
export class Admin {

  adminView = true;
  username = '';
  name = '';
  email = '';
  password = '';
  error = false;
  errorText = null;

  constructor(ts) {
    this.twitterService = ts;
  }

  addUser() {
    return Promise.all([
      this.twitterService.register(this.username, this.name, this.email, this.password)
    ]).then(res => {
      this.twitterService.getUsers();
      this.errorText = null;
    }).catch(error => {
      this.errorText = error.response;
      //console.error(error);
    });
  }

  deleteUser(user) {
    this.twitterService.deleteUser(user);
  }

  deleteTweetsForUser(user) {
    this.twitterService.deleteTweetsForUser(user);
  }

  deleteAllUsers() {
    this.twitterService.deleteAllUsers();
  }
}

