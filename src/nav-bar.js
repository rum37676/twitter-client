import {inject, bindable} from 'aurelia-framework';
import TwitterService from './services/twitter-service';

@inject(TwitterService)
export class NavBar {

  @bindable router;

  constructor(ts) {
    this.twitterService = ts;
  }

  showNav(navItem) {
    if (!navItem.config.role) {
      return true;
    }
    if (this.twitterService.ownUser !== null) {
      console.log('role: ' + this.twitterService.ownUser.role);
      if (typeof this.twitterService.ownUser.role !== "undefined") {
        return navItem.config.role === this.twitterService.ownUser.role.toLowerCase();
      }
    }
    else {
      // ownUser not updated yet
      console.log('ownUser data not initialized');
      return false;
    }
  }
}
