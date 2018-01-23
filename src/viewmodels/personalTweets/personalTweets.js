import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class PersonalTweet {

  tweets = [];
  tweetText = '';
  imageList = [];
  selectedFiles = null;


  constructor(ts) {
    this.twitterService = ts;
    this.tweets = ts.tweets;
  }

  createTweet() {
    console.log(this.imageList[0]);
    this.twitterService.saveTweet(this.tweetText, this.imageList[0]);
    this.tweetText = '';
    this.tweetImage = undefined;
    this.selectedFiles = null;
    this.imageList = [];
  }

  test() {
    this.twitterService.test();
  }

  test2() {
    this.twitterService.test2();
  }

  addPicturesToArray() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.imageList.push(this.selectedFiles.item(i));
    }
  }

  attached() {
    this.tweets = this.twitterService.tweets;
    console.log('personalTweets attached');
    console.log(this.tweets);
  }
}
