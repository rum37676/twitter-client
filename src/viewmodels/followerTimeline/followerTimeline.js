import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TweetUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class FollowerTimeline {

  tweets = [];
  followedUsers = [];

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ea = ea;
    this.updateTweets();
    this.ea.subscribe(TweetUpdate, msg => {
      console.log('followerTimeline subscribed');
      this.updateTweets();
    });
  }

  updateTweets() {
    this.followedUsers = [];
    this.tweets = [];
    for (let user of this.twitterService.users){
      for (let follower of user.followers) {
        if (follower._id === this.twitterService.ownUser._id) {
          this.followedUsers.push(user);
        }
      }
    }
    for (let tweet of this.twitterService.tweets) {
      if (tweet.tweeter._id === this.twitterService.ownUser._id) {
        this.tweets.push(tweet);
      }
      else {
        for (let user of this.followedUsers) {
          if (tweet.tweeter._id === user._id) {
            this.tweets.push(tweet);
          }
        }
      }
    }
  }

  attached() {
    console.log('followerTimeline attached');
    console.log(this.tweets);
  }
}
