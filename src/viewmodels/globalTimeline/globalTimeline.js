import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class GlobalTimeline {

  users = [];

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ea = ea;
    this.updateUsers();
    this.ea.subscribe(UserUpdate, msg => {
      //console.log('globalTimeline subscribed');
      this.updateUsers();
    });
  }

  updateUsers() {
    this.users = this.twitterService.users;
  }

  /*attached() {
    this.tweets = this.twitterService.tweets;
    console.log('globalTimeline attached');
  }*/
}
