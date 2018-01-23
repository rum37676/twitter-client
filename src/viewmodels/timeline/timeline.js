import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class Timeline {
  tweets = [];

  constructor(ts) {
    this.twitterService = ts;
  }

  activate(data) {
    this.tweets = data;
    console.log(this.tweets);
  }
}
