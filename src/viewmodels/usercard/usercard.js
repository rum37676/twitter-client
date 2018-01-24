import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class Usercard {
  user = null;
  alreadyFollowing = false;

  constructor(ts) {
    this.twitterService = ts;
  }

  activate(data) {
    this.user = data;
    for (let follower of this.user.followers) {
      if (follower._id === this.twitterService.ownUser._id) {
        this.alreadyFollowing = true;
      }
    }
    //console.log(this.user);
    //console.log(this.user._id);
  }

  follow() {
    //console.log('follow/unfollow(' + this.user.username + ', ' + this.alreadyFollowing + ')');
    this.twitterService.follow(this.user, this.alreadyFollowing);
    this.alreadyFollowing = !this.alreadyFollowing;
  }
}
