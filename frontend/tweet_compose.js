function TweetCompose (form) {
  this.$el = $(form);
  let $textArea = $("<textarea>");
  this.$el.append($textArea);
  let $submit = $("<button>");
  $submit.text('submit');
  this.$el.append($submit);
  this.$submit = $submit;


  // this.$submit.on("click", this.submit.bind(this));
}

TweetCompose.prototype.submit = function (event) {
  event.preventDefault();

};

module.exports = TweetCompose;
