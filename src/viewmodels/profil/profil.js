import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserUpdate} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class Profil {

  ownUser = null;
  profilImage = null;
  uploading = false;
  username = '';
  name = '';
  email = '';
  password = '';

  constructor(ts, ea) {
    this.twitterService = ts;
    this.ea = ea;
    this.updateUser();
    this.ea.subscribe(UserUpdate, msg => {
      this.updateUser();
    });
  }

  updateUser() {
    this.ownUser = this.twitterService.ownUser;
    this.username = this.ownUser.username;
    this.name = this.ownUser.name;
    this.email = this.ownUser.email;
    this.password = this.ownUser.password;
    this.profilImage = null;
    this.uploading = false;
  }

  update() {
    this.twitterService.updateProfil(this.username, this.name, this.email, this.password);
  }

  deleteAllTweets() {
    this.twitterService.deleteAllTweetsForUser(this.ownUser);
  }

  uploadProfilImage() {
    if (this.profilImage !== null && this.profilImage.length > 0) {
      this.uploading = true;
      this.twitterService.uploadProfilImage(this.profilImage[0]);
      this.profilImage = null;
    }
  }

  getNumberOfFollowedUsers() {
    let number = 0;
    for (let user of this.twitterService.users) {
      for (let follower of user.followers) {
        if (follower._id === this.ownUser._id) {
          number++;
        }
      }
    }
    return number;
  }

  getNumberOfTweets() {
    let number = 0;
    for (let tweet of this.twitterService.tweets) {
      if (tweet.tweeter._id === this.ownUser._id) {
        number++;
      }
    }
    return number;
  }
}
