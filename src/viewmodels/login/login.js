import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LoginStatus} from '../../services/messages';

@inject(EventAggregator, TwitterService)
export class Login {

  email = '';
  password = '';
  rememberMe = false;
  error = false;

  constructor(ea, ts) {
    this.twitterService = ts;
    this.ea = ea;
    if (localStorage.emailTwitter !== 'null' && typeof localStorage.emailTwitter !== 'undefined') {
      let loginOptions = JSON.parse(localStorage.emailTwitter);
      this.email = loginOptions.email;
      this.rememberMe = loginOptions.rememberMe;
    }
    this.ea.subscribe(LoginStatus, msg => {
      if (msg.status.success !== true && msg.status.changed !== true) {
        this.error = true;
      }
    });
  }

  login() {
    // localStorage: save email and rememberMe
    if (this.rememberMe === true) {
      let loginOptions = {
        email: this.email,
        rememberMe: this.rememberMe
      };
      localStorage.emailTwitter = JSON.stringify(loginOptions);
    }
    if (this.rememberMe === false) {
      localStorage.emailTwitter = null;
    }
    console.log(`Trying to log in ${this.email}`);
    this.twitterService.login(this.email.trim(), this.password.trim());
  }
}
