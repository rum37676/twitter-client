import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class Tweet {

  tweetText = '';
  imageList = [];
  selectedFiles = null;

  constructor(ts) {
    this.twitterService = ts;
  }

  createTweet() {
    console.log(this.imageList[0]);
    this.twitterService.saveTweet(this.tweetText, this.imageList[0]);
    this.tweetText = '';
    this.selectedFiles = null;
    this.imageList = [];
  }

  addPicturesToArray() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.imageList.push(this.selectedFiles.item(i));
    }
  }
}
