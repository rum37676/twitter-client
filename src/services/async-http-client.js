import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import Fixtures from './fixtures';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LoginStatus, OwnUserUpdate} from './messages';

@inject(HttpClient, Fixtures, EventAggregator )
export default class AsyncHttpClient {

  constructor(httpClient, fixtures, ea) {
    this.http = httpClient;
    this.http.configure(http => {
      http.withBaseUrl(fixtures.baseUrlOnline);
    });
    this.ea = ea;
  }

  isAuthenticated() {
    let authenticated = false;
    if (localStorage.sessionTokenTwitter !== 'null' && typeof localStorage.sessionTokenTwitter !== 'undefined') {
      authenticated = true;
      this.http.configure(http => {
        const auth = JSON.parse(localStorage.sessionTokenTwitter);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
    }
    return authenticated;
  }

  authenticate(url, user) {
    //console.log('authentication');
    this.http.post(url, user).then(response => {
      const status = response.content;
      if (status.success) {
        localStorage.sessionTokenTwitter = JSON.stringify(response.content);
        this.http.configure(configuration => {
          configuration.withHeader('Authorization', 'bearer ' + response.content.token);
        });
        console.log('authentication successful: logged in user: ' + user.email);
        this.ea.publish(new OwnUserUpdate(status.user));
      } else {
        console.log('authentication failed: could not log in user: ' + user.email);
      }
      this.ea.publish(new LoginStatus(status));
    }).catch(error => {
      const status = {
        success: false,
        message: 'service not available'
      };
      this.ea.publish(new LoginStatus(status));
    });
  }

  clearAuthentication() {
    localStorage.sessionTokenTwitter = null;
    this.http.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
  }

  get(url) {
    return this.http.get(url);
  }

  post(url, obj) {
    return this.http.post(url, obj);
  }

  delete(url) {
    console.log('http-client delete');
    return this.http.delete(url);
  }
}
