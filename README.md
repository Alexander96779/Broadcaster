[![Build Status](https://travis-ci.org/Alexander96779/Broadcaster.svg?branch=develop)](https://travis-ci.org/Alexander96779/Broadcaster) [![Coverage Status](https://coveralls.io/repos/github/Alexander96779/Broadcaster/badge.svg?branch=bg-eslintconfig-170002851)](https://coveralls.io/github/Alexander96779/Broadcaster?branch=bg-eslintconfig-170002851) [![Maintainability](https://api.codeclimate.com/v1/badges/8b53731a45e4dee5b10c/maintainability)](https://codeclimate.com/github/Alexander96779/Broadcaster/maintainability)

# Broadcaster
 Broadcaster enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that need government intervention

# Application Criteria
The system should have:
- Homepage
- Sign up page
- Sign in page
### User dashboard:
- Create red flag record page
- Create intervention record page
- View all records page
- View specific record page
- User profile page
### Admin:
- View all red flag records page.
- View all intervention records page.
- Accept or reject record page

### Frontend tools
- HTML
- CSS
- JavaScript
# API Endpoints
| Request Routes                         | Methods   | Description 
| ---------------------                  | --------- | ------------------
| /api/v1/auth/signup                    |   POST    | allows users to sign up
| /api/v1/auth/signin                    |   POST    | allows users to sign in
| /api/v1/auth/redflags                  |   GET     | view all red flags records
| /api/v1/auth/redflags/red-flag-id      |   GET     | view specific red flag
| /api/v1/auth/redflag                   |   POST    | create red flag
| /api/v1/auth/redflag/redflagid/Location|   PATCH   | update location
| /api/v1/auth/redflag/redflagid/comment |   PATCH   | update comment on red flag
| /api/v1/auth/redflag/red-flag-id/Accept|   PATCH   | admin can accept entry
| /api/v1/auth/redflag/red-flag-id/Reject|   PATCH   | admin can reject entry
| /api/v1/auth/redflag/red-flag-id       |   DELETE  | delete red flag record

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
[Here](https://documenter.getpostman.com/view/9618463/SW7gTPzs?version=latest)
### Author
- [Niyigena Alexander Prince](https://github.com/Alexander96779)
