import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class UserTimeline {

  tweets = [];
  userId = null;
  user = null;

  constructor(ts) {
    this.twitterService = ts;
    this.ownUser = ts.ownUser;
  }

  activate(params) {
    this.userId = params.id;
    for (let user of this.twitterService.users) {
      if (user._id === this.userId) {
        this.user = user;
      }
    }
    for (let tweet of this.twitterService.tweets) {
      if (tweet.tweeter._id === this.userId) {
        this.tweets.push(tweet);
      }
    }
    console.log('userTimeline activate')
    console.log(this.tweets);
  }

  attached() {
    console.log('userTimeline attached');
    console.log(this.tweets);
  }
}
