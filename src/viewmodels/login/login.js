import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
//import {LoginStatus} from '../../services/messages';

@inject(EventAggregator, TwitterService)
export class Login {

  email = 'marge@simpson.com ';
  password = 'secret';
  rememberMe = false;

  constructor(ea, ts) {
    this.twitterService = ts;
    this.prompt = '';
  }

  login() {
    console.log(`Trying to log in ${this.email}`);
    this.twitterService.login(this.email.trim(), this.password.trim());
  }
}
