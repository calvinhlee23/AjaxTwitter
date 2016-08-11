const FollowToggle = require('./follow_toggle');
function UserSearch (nav) {
  this.$el = $(nav);
  this.$inp = $('nav.user-search input');
  this.$ul = $('ul.user');

  this.$inp.on('input', this.handleInput.bind(this));
}

UserSearch.prototype.handleInput = function (event) {
  let $inp = this.$inp;
  let $ul = this.$ul;

  $.ajax({
    url: `/users/search`,
    data: {query: $inp.val()},
    dataType: 'json',
    success: this.renderResult.bind(this)
  });
};

UserSearch.prototype.renderResult = function (users) {
  this.$ul.empty();
  for (var i = 0; i < users.length; i++) {
    let $a = $('<a>');
    let user = users[i];
    $a.text(user.username);
    $a.attr("href", `users/${user.id}`);

    let $li = $("<li>");
    $li.append($a);

    let $button = $("<button>");
    let toggle = new FollowToggle($button, {
      userId: user.id,
      initialFollowState: user.followed ? "followed" : "unfollowed"
    });
    $button.append(toggle);
    $li.append($button);

    this.$ul.append($li);
  }
};

module.exports = UserSearch;
