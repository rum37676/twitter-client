import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {LoginStatus, TweetUpdate, UserUpdate} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import AsyncHttpClient from './async-http-client';
import { CompositionTransaction } from 'aurelia-framework';

@inject(Fixtures, EventAggregator, AsyncHttpClient, CompositionTransaction, FormData)
export default class TwitterService {

  ownUser = null;
  users = [];
  tweets = [];


  constructor(data, ea, ac, cT) {
    this.ea = ea;
    this.ac = ac;
    this.compositionTransaction = cT;
    this.compositionTransactionNotifier = null;

    this.ea.subscribe(LoginStatus, msg => {
      if (msg.status.success === true) {
        this.updateData();
      }
    });
  }

  updateData() {
    this.compositionTransactionNotifier = this.compositionTransaction.enlist();
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
      this.compositionTransactionNotifier.done();
    }).catch(error => {
      console.error(error);
    });
  }

  saveTweet(tweetText, tweetImage) {
    let formData = new FormData();
    formData.append('tweetText', tweetText);
    if (typeof tweetImage !== 'undefined') {
      formData.append('tweetImage', tweetImage);
    }

    this.ac.post('/api/tweets', formData).then(res => {
      /*this.tweets.unshift(res.content);
      this.ea.publish(new TweetUpdate());*/
      this.getTweets();
    });
  }

  deleteTweet(tweet) {
    console.log('twitterService: deleteTweet');
    this.ac.delete('/api/tweets/' + tweet._id).then(res => {
      /*const index = this.tweets.indexOf(tweet);
      if (index > -1) {
        this.tweets.splice(index, 1);
      }
      this.ea.publish(new TweetUpdate());*/
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
      this.ac.delete('/api/users/follow/' + user._id).then(res => {
        /*for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id === res.content._id) {
            this.users[i] = res.content;
          }
        }*/
        this.getUsers();
        console.log('twitter-service follow');
        console.log(this.users);
      });
    }
    else {
      this.ac.post('/api/users/follow/' + user._id).then(res => {
        /*for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id === res.content._id) {
            this.users[i] = res.content;
          }
        }*/
        this.getUsers();
        console.log('twitter-service unfollow');
        console.log(this.users);
      });
    }
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

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

  getUsers() {
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
      console.log(this.users);
      this.ea.publish(new UserUpdate());
    });
  }

  getMe() {
    this.ac.get('/api/users/me').then(res => {
      this.ownUser = res.content;
      console.log(this.ownUser);
      this.ea.publish(new UserUpdate());
    });
  }

  getTweets() {
    this.ac.get('/api/tweets').then(res => {
      this.tweets = res.content;
      console.log(this.tweets);
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
      message: ''
    };
    this.ac.clearAuthentication();
    this.ea.publish(new LoginStatus(status));
  }
}
