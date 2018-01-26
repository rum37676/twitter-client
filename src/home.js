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
      { route: 'socialGraph', name: 'socialGraph', moduleId: 'viewmodels/socialGraph/socialGraph', nav: true, title: 'Network'},
      { route: 'followerTimeline', name: 'followerTimeline', moduleId: 'viewmodels/followerTimeline/followerTimeline', nav: true, title: 'Follower Timeline' },
      { route: ['', 'home'], name: 'globalTimeline', moduleId: 'viewmodels/globalTimeline/globalTimeline', nav: true, title: 'Global Timeline' },
      { route: 'users', name: 'users', moduleId: 'viewmodels/users/users', nav: true, title: 'Users'},
      { route: 'profil', name: 'profil', moduleId: 'viewmodels/profil/profil', nav: true, title: 'Profil' },
      { route: 'admin', name: 'admin', moduleId: 'viewmodels/admin/admin', nav: true, title: 'Admin', role: 'admin' },
      { route: 'userTimeline/:id', name: 'userTimeline', moduleId: 'viewmodels/userTimeline/userTimeline', nav: false, title: 'userTimeline' },
      { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }
    ]);
    this.router = router;

    config.mapUnknownRoutes(instruction => {
      return 'home';
    });
  }

  attached() {
    if (this.twitterService.isAuthenticated()) {
      this.twitterService.updateData();
    }
  }
}
