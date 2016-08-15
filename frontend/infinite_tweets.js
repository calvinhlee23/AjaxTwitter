function InfiniteTweets(div) {
  this.$el = $(div);
  this.$ul = $("div ul");
  this.$more = $("a.fetch-more");

  this.maxCreatedAt = null;

  this.$more.on("click", this.fetchTweets.bind(this));
  this.$el.on("insert-tweet", this.insertTweet.bind(this));
}

InfiniteTweets.prototype.fetchTweets = function (event) {
  const infiniteTweets = this;
  if (this.maxCreatedAt !== null) {
    $.ajax({
      method: "GET",
      url: "/feed",
      dataType: "json",
      data: {max_created_at: `${this.maxCreatedAt}`},
      success(data) {
        infiniteTweets.insertTweet(event, data);
      }
    });
  } else {
    $.ajax({
      method: "GET",
      url: "/feed",
      dataType: "json",
      success(data) {
        infiniteTweets.insertTweet(event, data);
      }
    });
  }
};

InfiniteTweets.prototype.insertTweet = function (event, tweets) {
  if (tweets.length === 0 || $('ul#feed li').length >=20) {
    this.$more.replaceWith('<b> no more tweets <b>');
    return;
  }

  if (tweets.length) {
    this.maxCreatedAt = tweets[0].created_at;
    let $li = $('<li>').text(JSON.stringify(tweets[0].content));
    this.$ul.append($li);
  }
  else {
    this.maxCreatedAt = tweets.created_at;
    console.log(this.maxCreatedAt);
    let $li = $('<li>').text(JSON.stringify(tweets.content));
    this.$ul.append($li);
  }

};

module.exports = InfiniteTweets;
