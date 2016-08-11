function FollowToggle(btn) {
  console.log('hi from FollowToggle')
  this.$el = $(btn);
  this.userId = this.$el.data("userId");
  // if true, currentuser is already following him/her
  this.followState = this.$el.data('initialFollowState');
  this.render();
  this.$el.on("click", this.handleClick.bind(this));
}

FollowToggle.prototype.render = function () {
  if (this.followState === 'unfollowed') {
    this.$el.html("Follow!");
  } else {
    this.$el.html("Unfollow!");
  }
};

FollowToggle.prototype.handleClick = function(event) {
  event.preventDefault();
  console.log('hello from handle click')
  const FT = this;

  if (this.followState === "unfollowed") {

    $.ajax({
        method: "POST",
        dataType: "json",
        url: `/users/${this.userId}/follow`,
        success() {
          FT.followState = "followed";
          FT.render();
        }
      });
    } else {
     $.ajax({
       method: "DELETE",
       dataType: "json",
       url: `/users/${this.userId}/follow`,
       success() {
         FT.followState = "unfollowed"
         FT.render();
       }
     });
   }
};

module.exports = FollowToggle;
