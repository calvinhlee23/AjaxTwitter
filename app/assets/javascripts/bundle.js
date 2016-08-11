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
	
	$(function () {
	  $("button.follow-toggle").each((i, btn) => new FollowToggle(btn, {}));
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map