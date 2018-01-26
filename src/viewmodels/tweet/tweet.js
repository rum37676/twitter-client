import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class Tweet {

  tweetText = '';
  imageList = [];
  selectedFiles = null;
  error = false;

  constructor(ts) {
    this.twitterService = ts;
  }

  createTweet() {
    if (this.tweetText === '' && this.imageList.length === 0) {
      this.error = true;
    } else {
      this.twitterService.saveTweet(this.tweetText, this.imageList[0]);
      this.tweetText = '';
      this.selectedFiles = null;
      this.imageList = [];
    }
  }

  addPicturesToArray() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.imageList.push(this.selectedFiles.item(i));
    }
  }
}
