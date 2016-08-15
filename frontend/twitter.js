const FollowToggle = require('./follow_toggle');
const UserSearch = require('./user_search');
const TweetCompose = require('./tweet_compose');
const InfiniteTweets = require('./infinite_tweets');

$(function () {
  $("button.follow-toggle").each((i, btn) => new FollowToggle(btn, {}));
  $("nav.user-search").each((i, nav) => new UserSearch(nav));
  $("form.tweet-compose").each((i, form) => new TweetCompose(form));
  $("div.infinite-tweets").each((i, div) => new InfiniteTweets(div));
});
