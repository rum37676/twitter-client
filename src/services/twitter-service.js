import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {LoginStatus, TweetUpdate} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import AsyncHttpClient from './async-http-client';
import { CompositionTransaction } from 'aurelia-framework';

@inject(Fixtures, EventAggregator, AsyncHttpClient, CompositionTransaction, FormData)
export default class TwitterService {

  ownUser = null;
  ownTweets = [];
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

      this.ea.publish(new TweetUpdate(this.tweets));
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
      this.tweets.unshift(res.content);
      this.ea.publish(new TweetUpdate());
    });
  }

  deleteTweet(tweet) {
    console.log(this.tweets);
    this.ac.delete('/api/tweets/' + tweet._id).then(res => {
      const index = this.tweets.indexOf(tweet);
      if (index > -1) {
        this.tweets.splice(index, 1);
        console.log('Tweet deleted');
        console.log(this.tweets);
      }
      this.ea.publish(new TweetUpdate());
    });
  }

  follow(user, bool) {
    if (bool) {
      console.log('unfollow');
      this.ac.delete('/api/users/follow/' + user._id).then(res => {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id === res.content._id) {
            this.users[i] = res.content;
          }
        }
      });
    }
    else {
      console.log('follow');
      this.ac.post('/api/users/follow/' + user._id).then(res => {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]._id === res.content._id) {
            this.users[i] = res.content;
          }
        }
      });
    }
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

  getUsers() {
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
    });
  }

  getTweets() {
    this.ac.get('/api/tweets').then(res => {
      this.users = res.content;
    });
  }

  register(username, name, email, password) {
    const newUser = {
      username: username,
      name: name,
      email: email,
      password: password
    };
    return this.ac.post('/api/users', newUser).then(res => {
      return this.getUsers();
    });
  }

  login(email, password) {
    const user = {
      email: email,
      password: password
    };
    this.ac.authenticate('/api/users/authenticate', user);
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
