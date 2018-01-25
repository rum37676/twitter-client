import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class Profil {

  username = '';
  name = '';
  email = '';
  password = '';

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ea = ea;
    //this.twitterService.viewSettings();
    this.updateUser();
    this.ea.subscribe(UserUpdate, msg => {
      console.log('profil subscribed');
      this.updateUser();
    });
  }

  updateUser() {
    this.username = this.twitterService.ownUser.username;
    this.name = this.twitterService.ownUser.name;
    this.email = this.twitterService.ownUser.email;
    this.password = this.twitterService.ownUser.password;
  }

  update(e) {
    this.twitterService.updateProfil(this.username, this.name, this.email, this.password);
  }

  deleteAllTweets(e) {
    this.twitterService.deleteAllTweetsForUser(this.twitterService.ownUser);
  }
}
