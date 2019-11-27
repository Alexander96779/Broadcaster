[![Build Status](https://travis-ci.org/Alexander96779/Broadcaster.svg?branch=develop)](https://travis-ci.org/Alexander96779/Broadcaster)

[![Coverage Status](https://coveralls.io/repos/github/Alexander96779/Broadcaster/badge.svg?branch=develop)](https://coveralls.io/github/Alexander96779/Broadcaster?branch=develop)

[![Maintainability](https://api.codeclimate.com/v1/badges/8b53731a45e4dee5b10c/maintainability)](https://codeclimate.com/github/Alexander96779/Broadcaster/maintainability)

# Broadcaster
 Broadcaster enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that need government intervention

# Application Criteria
The system should have:
-Homepage
-Sign up page
-Sign in page
User dashboard:
-Create red flag record page
-Create intervention record page
-View all records page
-View specific record page
-User profile page
Admin:
-View all red flag records page.
-View all intervention records page.
-Accept or reject record page

# API Endpoints
POST /auth/signup
POST /auth/signin
GET /redflags
GET /redflags/red-flag-id
POST /auth/redflag
PATCH /auth/redflag/red-flag-id/Location
PATCH /auth/redflag/red-flag-id/comment
PATCH /auth/redflag/red-flag-id/Accept
PATCH /auth/redflag/red-flag-id/Reject
DELETE /auth/redflag/red-flag-id

# Getting started
1. Clone this repo to your local machine if you are using windows, get it [here](https://github.com/Alexander96779/Broadcaster)
2. Install dependencies using npm install
3. Run the app using npm start
4. Run test using npm test

## Tools
- Server side: [ExpressJS](http://expressjs.com/)
- IDE: [VSCode](https://code.visualstudio.com)
- Programming language: [JavaScript(ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)
- API Testing environment: [Postman](https://www.getpostman.com)
- Intergration: [Travis-Ci](travis-ci.org)
- Test coverage: [Coveralls](coveralls.io)

# Deployments
- User Interface template: https://alexander96779.github.io/Broadcaster/UI/
- Restful API on heroku: https://broadcaster123.herokuapp.com

### Documentation
[Here] (https://documenter.getpostman.com/view/9618463/SW7gTPzs?version=latest)
### Author
- [Niyigena Alexander Prince](https://github.com/Alexander96779)
