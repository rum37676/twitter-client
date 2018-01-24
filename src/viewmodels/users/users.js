import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class Users {

  otherUsers = [];

  constructor(ts) {
    this.twitterService = ts;
    for (let user of this.twitterService.users) {
      if (user._id !== this.twitterService.ownUser._id) {
        this.otherUsers.push(user);
      }
    }
  }

  attached() {
    this.twitterService.updateData();
    console.log(this.twitterService.users);
    console.log('users attached');
  }
}
