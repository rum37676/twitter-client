import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class Signup {

  username = '';
  name = '';
  email = '';
  password = '';
  error = false;
  errorText = null;

  constructor(ts) {
    this.twitterService = ts;
  }

  register(e) {
    return Promise.all([
      this.twitterService.register(this.username.trim(), this.name.trim(), this.email.trim(), this.password.trim())
    ]).then(res => {
      this.errorText = null;
      this.twitterService.login(this.email, this.password);
    }).catch(error => {
      this.errorText = error.response;
      //console.error(error);
    });
  }
}
