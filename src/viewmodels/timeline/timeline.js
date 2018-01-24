import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class Timeline {
  tweets = [];

  constructor(ts) {
    this.twitterService = ts;
  }

  deleteTweet(tweet) {
    console.log('timeline: delete Tweet');
    this.twitterService.deleteTweet(tweet);
  }

  allowDelete(tweet) {
    if (tweet.tweeter._id === this.twitterService.ownUser._id) {
      return true;
    }
    else {
      return false;
    }
  }

  activate(data) {
    this.tweets = data;
    console.log('timeline activate');
    console.log(this.tweets);
  }
}
