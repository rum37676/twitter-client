import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TweetUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class Timeline {
  users = [];
  tweets = [];

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ea = ea;
    this.ea.subscribe(TweetUpdate, msg => {
      this.updateTweets();
    });
  }

  deleteTweet(tweet) {
    this.twitterService.deleteTweet(tweet);
  }

  allowDelete(tweet) {
    if (this.twitterService.ownUser !== null && this.twitterService.ownUser !== undefined) {
      if (tweet.tweeter._id === this.twitterService.ownUser._id || this.twitterService.ownUser.role === 'admin') {
        return true;
      }
      else {
        return false;
      }
    }
  }

  activate(data) {
    this.users = data;
    this.updateTweets();
  }

  updateTweets() {
    this.tweets = [];
    for (let tweet of this.twitterService.tweets) {
      for (let user of this.users) {
        if (tweet.tweeter !== null && tweet.tweeter._id === user._id) {
          this.tweets.push(tweet);
        }
      }
    }
  }
}
