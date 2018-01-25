import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class FollowerTimeline {

  users = [];
  tweets = [];

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ea = ea;
    this.updateUsers();
    this.ea.subscribe(UserUpdate, msg => {
      //console.log('followerTimeline subscribed');
      this.updateUsers();
    });
  }

  updateUsers() {
    this.users = [];
    this.users.push(this.twitterService.ownUser);
    for (let user of this.twitterService.users) {
      for (let follower of user.followers) {
        if (follower._id === this.twitterService.ownUser._id) {
          this.users.push(user);
        }
      }
    }
  }

  /*attached() {
    console.log('followerTimeline attached');
    console.log(this.tweets);
  }*/
}
