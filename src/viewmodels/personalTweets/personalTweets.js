import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class Donate {

  tweets = [];
  tweetText = '';

  constructor(ts) {
    this.twitterService = ts;
    this.tweets = ts.tweets;
  }

  createTweet() {
    console.log('personalTweets: ' + this.tweetText);
    this.twitterService.saveTweet(this.tweetText);
  }

  attached() {
    //this.donationService.updateData();
    console.log(this.tweets);
  }
}
