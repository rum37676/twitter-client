import TwitterService from '../../services/twitter-service';
import {inject} from 'aurelia-framework';

@inject(TwitterService)
export class Logout {

  constructor(ts) {
    this.twitterService = ts;
  }

  logout() {
    console.log('logging out');
    this.twitterService.logout();
  }
}
