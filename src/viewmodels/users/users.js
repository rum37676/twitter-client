import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class Users {

  otherUsers = [];

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ea = ea;
    this.updateUsers();
    this.ea.subscribe(UserUpdate, msg => {
      console.log('users subscribed');
      this.updateUsers();
    });
  }

  updateUsers() {
    this.otherUsers = [];
    for (let user of this.twitterService.users) {
      if (user._id !== this.twitterService.ownUser._id) {
        this.otherUsers.push(user);
      }
    }
  }
}
