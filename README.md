# Would You Rather Project

This app is the final assessment project for Udacity's React & Redux course and is based on the starter code which can be found in [this repo](https://github.com/udacity/reactnd-project-would-you-rather-starter). Submitted code is deployed on Heroku as a [live demo](https://reactnd-wyr.herokuapp.com/).

## Acknowledgements

The only substantial part of code borrowed from the starter repo is `_DATA.js` which was modified slightly to switch one of the the avatar images only (Sorry, John Doe). `_DATA.js` mimics the server-side API communications that a React-Redux would typically make with other web-based services.

In addition, [Create React App](https://github.com/facebook/create-react-app) boilerplate was used to bootstrap other build tools and dependencies for React development.

## Starting the App

You will need to have Node 8.10.0 or higher as specified in the version of `create-react-app` [requirements](https://github.com/facebook/create-react-app/blob/master/README.md#creating-an-app). The app can be started with the following commands:

```
npm install
npm start
```

The app can be opened via http://localhost:3000/.

## Functionality

### Sign-in

All views require a "sign-in like" action which simply persists the selected user's id in the Redux Store as "authenticated".
(_To Do: create a real authentication/sign-in as well as sign-up flow._)

### Views

There are four main views:

- Home
- New Question
- Leaderboard
- Login / Profile

`Home` view shows the list of questions sorted by created timestamp in descending order.

Click `New Question` to add a new "Would You Rather" question as the signed-in user ("`authedUser`").

The list of all users and their scorecards can be found in `Leaderboard` page, which can be sorted by different criteria (# of questions, # of answers, or the sum of the two) in descending order. The ranking doesn't have any tiebreaking mechanism (_To do?_).

Lastly, the `Profile` page (appears as `Login` when the `authedUser` is not chosen) shows the `authedUser`'s scorecard as well as a list of their authored questions and answered questions, sorted by timestamp in descending order.

### Voting

Each of the questions has a "View" button which allows three things:

- Allows `authedUser` to vote, if the question is unanswered; or
- View the current result of the poll, if the `authedUser` has voted; or
- Edit the existing answer

## To Do's

1. Create a real authentication method
1. Introduce tiebreaking rules
1. More fluid navigation ('Back' buttons, breadcrumbs, etc.)

## Contributing and Licensing

Any comment or pull request will be greatly appreciated. Licensed under the MIT License and extends [the copyright and the license notices of Facebook](https://github.com/facebook/create-react-app/blob/master/LICENSE).
