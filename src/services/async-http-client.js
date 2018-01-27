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
    if (localStorage.sessionTokenTwitter !== 'null' && typeof localStorage.sessionTokenTwitter !== 'undefined') {
      this.http.configure(http => {
        const auth = JSON.parse(localStorage.sessionTokenTwitter);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
      // Check if authentication token is valid
      return Promise.all([
        this.http.get('api/users/validate')
      ]).then(res => {
        // token is valid
        let status = {
          success: true,
          changed: true,
          message: 'user is authenticated'
        }
        console.log('publish: async-http-client: isAuthenticated1');
        this.ea.publish(new LoginStatus(status));
        return true;
      }).catch(error => {
        // token is not valid
        let status = {
          success: false,
          changed: true,
          message: 'user is not authenticated'
        }
        this.clearAuthentication();
        console.log('publish: async-http-client: isAuthenticated2');
        this.ea.publish(new LoginStatus(status));
      });
    }/* else {
      let status = {
        success: false,
        changed: false,
        message: 'user is not authenticated'
      }
      this.clearAuthentication();
      console.log('publish: async-http-client: isAuthenticated3');
      this.ea.publish(new LoginStatus(status));
    }*/
  }

  authenticate(url, user) {
    return this.http.post(url, user).then(response => {
      let status = response.content;
      if (status.success) {
        localStorage.sessionTokenTwitter = JSON.stringify(response.content);
        this.http.configure(configuration => {
          configuration.withHeader('Authorization', 'bearer ' + response.content.token);
        });
        console.log('authentication successful: logged in user: ' + user.email);
        this.ea.publish(new OwnUserUpdate(status.user));
        status.changed = true;
      } else {
        console.log('authentication failed: could not log in user: ' + user.email);
      }
      console.log('publish: async-http-client: authenticate1');
      this.ea.publish(new LoginStatus(status));
    }).catch(error => {
      const status = {
        success: false,
        message: 'service not available'
      };
      console.log('publish: async-http-client: authenticate2');
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
    return this.http.delete(url);
  }
}
