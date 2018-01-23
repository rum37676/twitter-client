import {inject, Aurelia} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LoginStatus} from './services/messages';
import TwitterService from './services/twitter-service';

@inject(TwitterService, Aurelia, EventAggregator)
export class App {

  constructor(ts, au, ea) {
    this.au = au;
    this.ts = ts;
    ea.subscribe(LoginStatus, msg => {
      this.router.navigate('/', { replace: true, trigger: false });
      this.router.reset();
      if (msg.status.success === true) {
        au.setRoot('home');
      } else {
        au.setRoot('app');
      }
    });
  }

  attached() {
    if (this.ts.isAuthenticated()) {
      this.au.setRoot('home').then(() => {
        this.router.navigateToRoute('dashboard');
      });
    }
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' },
      { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }
    ]);
    this.router = router;
  }
}