import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class Profil {

  ownUser = null;
  profilImage = null;
  username = '';
  name = '';
  email = '';
  password = '';

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ea = ea;
    this.updateUser();
    this.ea.subscribe(UserUpdate, msg => {
      this.updateUser();
    });
  }

  updateUser() {
    this.ownUser = this.twitterService.ownUser;
    this.username = this.ownUser.username;
    this.name = this.ownUser.name;
    this.email = this.ownUser.email;
    this.password = this.ownUser.password;
  }

  update() {
    this.twitterService.updateProfil(this.username, this.name, this.email, this.password);
  }

  deleteAllTweets() {
    this.twitterService.deleteAllTweetsForUser(this.ownUser);
  }

  uploadProfilImage() {
    this.twitterService.uploadProfilImage(this.profilImage[0]);
  }
}
