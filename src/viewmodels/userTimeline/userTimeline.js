import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TweetUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class UserTimeline {

  tweets = [];
  userId = null;
  user = null;

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ownUser = ts.ownUser;
    this.ea = ea;
    this.ea.subscribe(TweetUpdate, msg => {
      console.log('userTimeline subscribed');
      this.updateTweets();
    });
  }

  activate(params) {
    this.userId = params.id;
    this.updateTweets();
    console.log('userTimeline activate');
  }

  updateTweets() {
    for (let user of this.twitterService.users) {
      if (user._id === this.userId) {
        this.user = user;
      }
    }
    for (let tweet of this.twitterService.tweets) {
      if (tweet.tweeter._id === this.userId) {
        this.tweets.push(tweet);
      }
    }
  }
}
