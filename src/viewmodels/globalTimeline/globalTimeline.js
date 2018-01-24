import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TweetUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class GlobalTimeline {

  tweets = [];

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ea = ea;
    this.updateTweets();
    this.ea.subscribe(TweetUpdate, msg => {
      console.log('globalTimeline subscribed');
      this.updateTweets();
    });
  }

  updateTweets() {
    this.tweets = this.twitterService.tweets;
  }

  attached() {
    this.tweets = this.twitterService.tweets;
    console.log('globalTimeline attached');
  }
}
