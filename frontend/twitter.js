const FollowToggle = require('./follow_toggle');
const UserSearch = require('./user_search');
$(function () {
  $("button.follow-toggle").each((i, btn) => new FollowToggle(btn, {}));
  $("nav.user-search").each((i, nav) => new UserSearch(nav));
});
