import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class Usercard {
  user = null;
  alreadyFollowing = false;

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ea = ea;
    this.ea.subscribe(UserUpdate, msg => {
      console.log('usercard subscribed');
      this.updateUsers();
    });
  }

  activate(data) {
    this.user = data;
    this.updateUsers();
    console.log('usercard activate');
  }

  updateUsers() {
    for (let follower of this.user.followers) {
      if (follower._id === this.twitterService.ownUser._id) {
        this.alreadyFollowing = true;
      }
    }
  }

  follow() {
    this.twitterService.follow(this.user, this.alreadyFollowing);
    this.alreadyFollowing = !this.alreadyFollowing;
  }
}
