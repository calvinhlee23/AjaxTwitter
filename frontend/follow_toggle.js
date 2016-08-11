function FollowToggle(btn, options = {}) {
  this.$el = $(btn);
  this.userId = this.$el.data("userId") ?
                this.$el.data("userID") : options.userId;
  // if true, currentuser is already following him/her
  this.followState = this.$el.data('initialFollowState') ?
                     this.$el.data('initialFollowState') : options.initialFollowState;
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
