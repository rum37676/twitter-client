import {inject, Aurelia} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LoginStatus, OwnUserUpdate, TweetUpdate, UserUpdate} from './services/messages';
import TwitterService from './services/twitter-service';

@inject(TwitterService, Aurelia, EventAggregator)
export class App {

  constructor(ts, au, ea) {
    this.au = au;
    this.twitterService = ts;
    this.ea = ea;
    this.ea.subscribe(LoginStatus, msg => {
      if (msg.status.changed === true) {
        this.router.navigate('/', { replace: true, trigger: false });
        this.router.reset();
        if (msg.status.success === true) {
          Promise.all([
            this.twitterService.updateData()
          ]).then(res => {
            this.au.setRoot('home').then(() => {
              this.router.navigateToRoute('globalTimeline');
            });
          }).catch(error => {
            console.error(error);
          });
        } else {
          au.setRoot('app');
        }
      }
    });
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' },
      { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }
    ]);
    this.router = router;
  }

  attached() {
    this.twitterService.isAuthenticated();
  }
}
