function InfiniteTweets(div) {
  this.$el = $(div);
  this.$ul = $("div ul");
  this.$more = $("a.fetch-more");

  this.maxCreatedAt = null;

  this.$more.on("click", this.fetchTweets.bind(this));
}

InfiniteTweets.prototype.fetchTweets = function (event) {
  if (this.maxCreatedAt !== null) {
    $.ajax({
      method: "GET",
      url: "/feed",
      dataType: "json",
      data: {max_created_at: `${this.maxCreatedAt}`},
      success: this.insertTweet.bind(this)
    });
  } else {
    $.ajax({
      method: "GET",
      url: "/feed",
      dataType: "json",
      success: this.insertTweet.bind(this)
    });
  }
};

InfiniteTweets.prototype.insertTweet = function (tweets) {

  if (tweets.length === 0 || tweets.length < 20) {
    this.$more.replaceWith('<b> no more tweets <b>');
  }

  this.maxCreatedAt = tweets[0].created_at;
  console.log(this.maxCreatedAt);

  let $li = $('<li>').text(JSON.stringify(tweets[0].content));
  this.$ul.append($li);
};

// InfiniteTweets.prototype. = function () {
//
// };
module.exports = InfiniteTweets;
