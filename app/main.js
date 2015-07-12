
var Router = require('./router');
var router = new Router();
var SiteModel = require('modules/base/site/models/siteModel');

App = window.App || {};
App = {
  models: {},
  collections: {},
  views: {},
  routers: router,
  init: function() {
  	this.site = new SiteModel();
    Backbone.history.start();
  }
};

// create pub-sub functionality
Backbone.pubSub = _.extend({}, Backbone.Events);

$(document).ready(function () {
	App.init();
});
