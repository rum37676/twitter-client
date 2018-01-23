import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class PersonalTweet {

  tweets = [];
  tweetText = '';
  selectedFiles = null;
  imageList = [];


  constructor(ts) {
    this.twitterService = ts;
    this.tweets = ts.tweets;
  }

  createTweet() {
    console.log('personalTweets: ' + this.tweetText);
    console.log(this.imageList);
    this.twitterService.saveTweet(this.tweetText, this.imageList);
    this.tweetText = '';
    //this.imageList = [];
  }

  test() {
    this.twitterService.test();
  }

  test2() {
    this.twitterService.test2();
  }

  addPicturesToArray(e) {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.imageList.push(this.selectedFiles.item(i));
    }
  }

  attached() {
    this.tweets = this.twitterService.tweets;
    //this.twitterService.updateData();
    console.log('personal attached');
    //console.log(this.tweets);
    console.log('This is a test tweet' + this.tweets[0]);
  }
}
