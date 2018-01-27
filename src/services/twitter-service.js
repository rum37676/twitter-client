import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {LoginStatus, OwnUserUpdate, TweetUpdate, UserUpdate} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import AsyncHttpClient from './async-http-client';

@inject(Fixtures, EventAggregator, AsyncHttpClient, FormData)
export default class TwitterService {

  ownUser = null;
  users = [];
  tweets = [];


  constructor(data, ea, ac) {
    this.ea = ea;
    this.ac = ac;

    this.ea.subscribe(OwnUserUpdate, msg => {
      this.ownUser = msg.user;
    });
    this.ea.subscribe(LoginStatus, msg => {
      if (msg.status.success === true) {
        console.log('twitter-service: updateData');
        this.updateData();
      } else {
        this.ac.clearAuthentication();
      }
    });
  }

  updateData() {
    return Promise.all([
      this.ac.get('/api/tweets'),
      this.ac.get('/api/users'),
      this.ac.get('/api/users/me')
    ]).then(res => {
      this.tweets = res[0].content;
      this.users = res[1].content;
      this.ownUser = res[2].content;

      this.ea.publish(new TweetUpdate());
      this.ea.publish(new UserUpdate());
      this.ea.publish(new OwnUserUpdate(this.ownUser));
    }).catch(error => {
      console.error(error);
    });
  }

  saveTweet(tweetText, tweetImage) {
    let formData = new FormData();
    formData.append('text', tweetText);
    if (typeof tweetImage !== 'undefined') {
      formData.append('tweetImage', tweetImage);
    }

    this.ac.post('/api/tweets', formData).then(res => {
      this.getTweets();
    });
  }

  deleteTweet(tweet) {
    console.log('twitterService: deleteTweet');
    this.ac.delete('/api/tweets/' + tweet._id).then(res => {
      this.getTweets();
    });
  }

  deleteAllTweetsForUser(user) {
    console.log('twitterService: deleteAllTweetsForUser');
    this.ac.delete('/api/users/' + user._id + '/tweets').then(res => {
      this.getTweets();
    });
  }

  follow(user, bool) {
    if (bool) {
      // unfollow
      this.ac.delete('/api/users/follow/' + user._id).then(res => {
        this.getUsers();
      });
    } else {
      // follow
      this.ac.post('/api/users/follow/' + user._id).then(res => {
        this.getUsers();
      });
    }
  }

  deleteUser(user) {
    this.ac.delete('/api/users/' + user._id).then(res => {
      this.getUsers();
      this.getTweets();
    });
  }

  deleteAllUsers() {
    this.ac.delete('/api/users').then(res => {
      this.logout();
    });
  }

  deleteTweetsForUser(user) {
    this.ac.delete('/api/users/' + user._id + '/tweets').then(res => {
      this.getTweets();
    });
  }

  updateProfil(username, name, email, password) {
    let user = {
      username: username,
      name: name,
      email: email,
      password: password
    };
    this.ac.post('/api/users/me', user).then(res => {
      this.getUsers();
      this.getMe();
      this.getTweets();
    });
  }

  uploadProfilImage(profilIimage) {
    if (profilIimage !== null || profilIimage !== undefined) {
      let formData = new FormData();
      formData.append('info', 'This is a profilImage.');
      formData.append('profilImage', profilIimage);

      this.ac.post('/api/users/image', formData).then(res => {
        this.getMe();
      });
    }
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

  getUsers() {
    return this.ac.get('/api/users').then(res => {
      this.users = res.content;
      this.ea.publish(new UserUpdate());
    });
  }

  getMe() {
    return this.ac.get('/api/users/me').then(res => {
      this.ownUser = res.content;
      this.ea.publish(new UserUpdate());
    });
  }

  getTweets() {
    return this.ac.get('/api/tweets').then(res => {
      this.tweets = res.content;
      this.ea.publish(new TweetUpdate());
    });
  }

  register(username, name, email, password) {
    const newUser = {
      username: username,
      name: name,
      email: email,
      password: password
    };
    return this.ac.post('/api/users', newUser);
  }

  login(email, password) {
    const user = {
      email: email,
      password: password
    };
    return this.ac.authenticate('/api/users/authenticate', user);
  }

  logout() {
    const status = {
      success: false,
      message: 'Logout',
      changed: true
    };
    this.ac.clearAuthentication();
    console.log('publish: twitter-service: logout');
    this.ea.publish(new LoginStatus(status));
  }
}
