import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class GlobalTimeline {

  tweets = [];

  constructor(ts) {
    this.twitterService = ts;
    this.tweets = ts.tweets;
  }

  attached() {
    this.tweets = this.twitterService.tweets;
    console.log('globalTimeline attached');
    console.log(this.tweets);
  }
}
