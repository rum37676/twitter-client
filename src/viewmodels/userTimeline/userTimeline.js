import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class UserTimeline {

  userId = null;
  user = null;

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ea = ea;
    this.ea.subscribe(UserUpdate, msg => {
      this.updateUsers();
    });
  }

  activate(params) {
    this.userId = params.id;
    this.updateUsers();
  }

  updateUsers() {
    for (let user of this.twitterService.users) {
      if (user._id === this.userId) {
        this.user = user;
      }
    }
  }
}
