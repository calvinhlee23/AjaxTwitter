function FollowToggle(btn) {
  console.log('hi from FollowToggle')
  this.$el = $(btn);
  this.userId = this.$el.data("userId");
  // if true, currentuser is already following him/her
  if (this.$el.data("followstate") === true) {
    this.followState = "followed";
  } else {
    this.followState = "unfollowed";
  }
  this.render();
}

FollowToggle.prototype.render = function () {
  if (this.followState === 'unfollowed') {
    this.$el.html("Follow!");
  } else {
    this.$el.html("Unfollow!");
  }
};

FollowToggle.prototype.handleClick = function () {

};
module.exports = FollowToggle;
