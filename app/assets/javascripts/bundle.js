/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
	const UserSearch = __webpack_require__(2);
	$(function () {
	  $("button.follow-toggle").each((i, btn) => new FollowToggle(btn, {}));
	  $("nav.user-search").each((i, nav) => new UserSearch(nav));
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map