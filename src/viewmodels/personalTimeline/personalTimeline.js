import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class PersonalTimeline {

  tweets = [];

  constructor(ts) {
    this.twitterService = ts;
    console.log('constructor');
    for (let tweet of this.twitterService.tweets) {
      if (tweet.tweeter._id === this.twitterService.ownUser._id) {
        this.tweets.push(tweet);
      }
    }
  }

  attached() {
    console.log('personalTimeline attached');
    console.log(this.tweets);
  }
}
