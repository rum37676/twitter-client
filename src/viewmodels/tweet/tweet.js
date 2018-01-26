import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TweetUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class Tweet {

  tweetText = '';
  imageList = [];
  selectedFiles = null;
  error = false;
  uploading = false;

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ea = ea;
    this.ea.subscribe(TweetUpdate, msg => {
      this.uploading = false;
    });
  }

  createTweet() {
    if (this.tweetText === '' && this.imageList.length === 0) {
      this.error = true;
    } else {
      this.uploading = true;
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
