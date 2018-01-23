import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class UserTimeline {

  tweets = [];
  user = null;

  constructor(ts) {
    this.twitterService = ts;
    console.log('constructor');
  }

  activate(data) {
    this.user = data;
    for (let tweet of this.twitterService.tweets) {
      if (tweet.tweeter._id === this.user._id) {
        this.tweets.push(tweet);
      }
    }
  }

  attached() {
    console.log('personalTimeline attached');
    console.log(this.tweets);
  }
}
