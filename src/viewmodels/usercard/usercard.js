import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class Usercard {
  userId = undefined;
  user = null;
  alreadyFollowing = undefined;

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ea = ea;
    this.ea.subscribe(UserUpdate, msg => {
      console.log('usercard subscribed: UserUpdate');
      this.updateUsers();
    });
  }

  activate(data) {
    this.userId = data;
    this.updateUsers();
  }

  updateUsers() {
    for (let user of this.twitterService.users) {
      if (user._id === this.userId) {
        this.user = user;
      }
    }
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

  hasProfilImage() {
    if (this.user.profilImage !== undefined) {
      return true;
    }
    else {
      return false;
    }
  }
}
