function TweetCompose (form) {
  this.$el = $(form);
  let $textArea = $("<textarea name = tweet[content]>");
  this.$el.append($textArea);
  this.$textarea = $('textarea');

  let $submit = $("<button>");
  $submit.text('submit');
  this.$el.append($submit);
  this.$submit = $submit;

  let $counter = $("<strong class = 'chars-left'>");
  this.$el.append($counter);
  this.$counter = $counter;

  this.$textarea.on('input', this.counter.bind(this));
  this.$submit.on("click", this.submit.bind(this));
}

TweetCompose.prototype.counter = function (event) {
  let inLength = this.$textarea.val().length;
  $('.chars-left').text(`${140-inLength} left`);
};

TweetCompose.prototype.submit = function (event) {
  event.preventDefault();
  let formData = this.$el.serializeJSON();
  this.$el.find(':input').prop('disabled', true);
  console.log(formData);
  $.ajax({
    method: "POST",
    url: "/tweets",
    dataType: "json",
    data: formData,
    success: this.handleSuccess.bind(this)
  });
};

TweetCompose.prototype.handleSuccess = function (data) {
  const $tweetsUl = $("ul#feed");
  let $li = $('<li>').text(JSON.stringify(data.content));

  console.log($li.text());
  $tweetsUl.append($li);
  this.clearInput();
};

TweetCompose.prototype.clearInput = function () {
  this.$textarea.val("");
  this.$el.find(":input").prop('disabled', false);
  this.$counter.empty();
};
module.exports = TweetCompose;
