# twitter-client

## Description

This is the single-page-application (SPA) for the assignment that is part of the coursework for the [Building Modern Web Applications & Services](https://wit-oth-regensburg-2017-dmas.github.io/index.html) at OTH Regensburg in the winter semester 2017/18.

***Submission Details:***

* Student name: Matthias Rudingsdorfer
* Student ID: 3007899

This is a client application for [twitter-web](https://github.com/rum37676/twitter-client) that can be deployed as a static website.

An instance of twitter-client is currently hosted via [Heroku](https://heroku.com/) and accessible by using the following link: [Instance of twitter-client](https://safe-brushlands-98673.herokuapp.com/client/).

## Important Notes for assignment


This assignment was split into two independent components:
The first component is the web application itself (a simple web app & REST Backend, **twitter-web**), and the second component is a single page application with extended features (**twitter-client**).

| Project       | Description                         | Link to Repository      | Video Tour          | Deployed App        |         
|----------------------|------------------------------|-------------------------|---------------------|---------------------|
| **twitter-web**      | web app, based on hapi.js    |[twitter-web](https://github.com/rum37676/twitter-web)|  [Link to video tour](https://youtu.be/Q5cM2pLERxE) | [web-app](https://safe-brushlands-98673.herokuapp.com/) |
| **twitter-client**   | SPA, based on Aurelia	      |[twitter-client](https://github.com/rum37676/twitter-client)| [Link to video tour](https://youtu.be/Q5cM2pLERxE)| [single-page-app](https://safe-brushlands-98673.herokuapp.com/client/) |

New users can be created, but to test the administration features, the use of a dedicated admin user is required:

| Value     	  | Login Data   	          |
|---------------|-------------------------|
| User          | root@root.com	          |
| Password   	  | rootpassword		        |

If you log in with this account, a new configuration item called *Admin* will be available (this view is hidden for normal users)      

## Configuration

To build the application for use in a production environment, please clone the repository and run *au build -env prod* in the top-level folder.

To start the application in development mode, run *au run -watch* from the top-level folder.

Once the Aurelia application is started, it is accessible on port 9000.

Example of url for local deployment: [http://localhost:9000](http://localhost:9000/)

## Technical details

This application is using the API exposed by [twitter-web](https://github.com/rum37676/twitter-web) to provide means for users to interact with the web application. 

It is built on [Aurelia](http://aurelia.io/) with [twitter-web](https://github.com/rum37676/twitter-web) as a backend.  
