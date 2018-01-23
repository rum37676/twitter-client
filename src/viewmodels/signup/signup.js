import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class Signup {

  username = 'margeSimpson';
  name = 'Margarete Simspon';
  email = 'marge@simpson.com';
  password = 'secret';

  constructor(ts) {
    this.twitterService = ts;
  }

  register(e) {
    this.twitterService.register(this.firstName, this.lastName, this.email, this.password);
    this.twitterService.login(this.email, this.password);
  }
}
