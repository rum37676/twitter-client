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

  test() {
    console.log(this.users);
  }

  updateData() {
    this.compositionTransactionNotifier = this.compositionTransaction.enlist();
    //console.log(this.tweets);
    return Promise.all([
      this.ac.get('/api/tweets'),
      this.ac.get('/api/users'),
      this.ac.get('/api/users/me')
    ]).then(res => {
      this.tweets = res[0].content;
      console.log(this.tweets);
      this.users = res[1].content;
      this.ownUser = res[2].content;

      //console.log(this.ownUser);
      this.compositionTransactionNotifier.done();
    }).catch(error => {
      console.error(error);
    });
  }

  saveTweet(text, imageList) {
    console.log('saveTweet');
    console.log(imageList);
    let formData = new FormData();
    formData.append('text', text);
    formData.append('imageList', imageList);
    /*const tweet = {
      text: text,
      imgages: formData
    };*/
    console.log(formData);
    this.ac.post('/api/tweets', formData).then(res => {
      this.tweets.unshift(res.content);
    });
    console.log(this.tweets);
  }

  follow(user) {
    console.log(user._id);
    this.ac.post('/api/users/follow/' + user._id).then(res => {
      this.users = res.content;
      console.log('newUsers: ');
      console.log(this.users);
    });
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
