import { inject, Aurelia } from 'aurelia-framework';
import TwitterService from 'services/twitter-service';

@inject(Aurelia, TwitterService)
export class Home {

  constructor(au, ts) {
    this.aurelia = au;
    this.twitterService = ts;
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'home'], name: 'startScreen', moduleId: 'viewmodels/startScreen/startScreen', nav: true, title: 'Start Screen' },
      { route: 'personalTweets', name: 'personalTweets', moduleId: 'viewmodels/personalTweets/personalTweets', nav: true, title: 'Personal Tweets' },
      { route: 'dashboard', name: 'dashboard', moduleId: 'viewmodels/dashboard/dashboard', nav: true, title: 'Dashboard' },
      { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }
    ]);
    this.router = router;

    config.mapUnknownRoutes(instruction => {
      return 'home';
    });
  }

  /*attached() {
    if (this.donationService.isAuthenticated()) {
      this.donationService.updateData();
      console.log('home attached!');
    }
  }*/
}
