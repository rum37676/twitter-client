# [twitter-client](https://github.com/rum37676/twitter-client)/[twitter-web](https://github.com/rum37676/twitter-web)

***Submission Details:***

* Student name: Matthias Rudingsdorfer
* Student ID: 3007899

## Description

My twitter application for the assignment that is part of the coursework for the [Building Modern Web Applications & Services](https://wit-oth-regensburg-2017-dmas.github.io/index.html) at OTH Regensburg in the winter semester 2017/18 consists of two projects: 

### [twitter-client](https://github.com/rum37676/twitter-client)

[twitter-client](https://github.com/rum37676/twitter-client) is a single-page-application (SPA). It is a client application for [twitter-web](https://github.com/rum37676/twitter-client) that can be deployed as a static website.
An instance of twitter-client is currently hosted via [Heroku](https://heroku.com/) and accessible by using the following link: [Instance of twitter-client](https://safe-brushlands-98673.herokuapp.com/client/).


### [twitter-web](https://github.com/rum37676/twitter-web)

[twitter-web](https://github.com/rum37676/twitter-web) is the web component of the application. It is a simple web app built on Node.js using [hapi](https://hapijs.com/), [handlebars](http://handlebarsjs.com/) and [mongoose](http://mongoosejs.com/) for data storage in a [MongoDB](https://www.mongodb.com/de) database (hosted via [mLab](https://mlab.com/).  
It has no frontend and is just a simple REST API interface for the data storage.


## Important Notes for assignment
(There is only one video for both applications)

| Project       | Description                         | Link to Repository      | Video Tour          | Deployed App        |         
|----------------------|------------------------------|-------------------------|---------------------|---------------------|
| **twitter-web**      | web app, based on hapi.js    |[twitter-web](https://github.com/rum37676/twitter-web)|| [web-app](https://safe-brushlands-98673.herokuapp.com/) |
| **twitter-client**   | SPA, based on Aurelia	      |[twitter-client](https://github.com/rum37676/twitter-client)| [Link to video tour](https://youtu.be/Q5cM2pLERxE)| [single-page-app](https://safe-brushlands-98673.herokuapp.com/client/) |

New users can be created, but to test the administration features, the use of a dedicated admin user is required:

| Value     	  | Login Data   	          |
|---------------|-------------------------|
| User          | root@root.com	          |
| Password   	  | rootpassword		        |

If you log in with this account, a new configuration item called *Admin* will be available (this view is hidden for normal users)      

## Non - technical description

My application is based on the model of twitter: 
User can registrate with a username, name, email and password.
Users can create and delete tweets of a maximum length of 140 chars (included pictures). They can read what other users have posted and follow their friends.  
They can modify their account data and upload a profil image. They can see statistics over their tweets and folowers and can also see the links between users in a diagramm.
Admins has extended rights: They can delete users and their tweets. Also they have a special statistics view.


## Special Note for API tests

The API tests will not work with the current deployed [twitter-web](https://safe-brushlands-98673.herokuapp.com/) instance. They will work, if you comment out following line of tweetapi.create:
payload: {
    //output: 'stream',   <--------------------
    allow: ['application/json', 'multipart/form-data'],
    maxBytes: '104857600',
    },
I could not find the bug, why this dont work with the apitests...





