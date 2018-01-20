/*  constructor(data, ea, ac, compositionTransaction) {
    this.methods = data.methods;
    this.ea = ea;
    this.ac = ac;
    this.compositionTransaction = compositionTransaction;
    this.compositionTransactionNotifier = null
    ea.subscribe(LoginStatus, status => {
      console.log('donation-service subscribe');
      console.log(status);
      if (status.info.success === true) {
        console.log('im IF');
        this.updateData();
      }
    });
  }

  updateData() {
    console.log('donations');
    console.log(this.donations);


    this.compositionTransactionNotifier = this.compositionTransaction.enlist();

    return Promise.all([
      this.ac.get('/api/candidates'),
      this.ac.get('/api/users'),
      this.ac.get('/api/donations')
    ]).then(res => {
      this.candidates = res[0].content;
      this.users = res[1].content;
      this.donations = res[2].content;
      this.compositionTransactionNotifier.done();
      console.log('donations in Promise');
      console.log(this.donations);
    }).catch(error => {
      console.error(error);
    });

    this.total = 0;
    for (let donation of this.donations) {
      this.total = this.total + donation.amount;
    }
    console.log(this.donations);
    console.log('updatedData, total: ' + this.total);
    this.ea.publish(new TotalUpdate(this.total));
  }*/


import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {LoginStatus} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import AsyncHttpClient from './async-http-client';

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export default class TwitterService {

  users = [];
  tweets = [];

  constructor(data, ea, ac) {
    this.tweets = data.tweets;
    this.ea = ea;
    this.ac = ac;
    ea.subscribe(LoginStatus, msg => {
      console.log('twitter-service subscribe');
      console.log(msg);
      if (msg.status.success === true) {
        console.log('im IF');
        this.updateData();
      }
    });
  }


  saveTweet(text) {
    console.log('saveTweet');
    const tweet = {
      tweeter: {
        username: 'test tweeter',
        name: 'test tweeter',
        email: 'test tweeter',
        password: 'test tweeter'
      },
      text: text
    };
    this.tweets.push(tweet);
    console.log(this.tweets);
    /*this.ac.post('/api/tweets', tweet).then(res => {
      this.tweets.push(res.content);
    });*/
  }

  updateData() {
    console.log('updateData');
    console.log(this.users);
    this.getUsers();
    console.log(this.users);
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

  getUsers() {
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
    });
  }

  register(firstName, lastName, email, password) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.ac.post('/api/users', newUser).then(res => {
      this.getUsers();
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
