'use strict';

var BaseView = require('base/baseView');
var NavState = require('util/navState');
var TransEnd = require('util/transEnd');
// var SiteModel = require('modules/base/site/models/siteModel');


module.exports = BaseView.extend({


  showView: function(view) {
    $('#app').addClass('show_view');

    if (this.currentView) {
      this.currentView.dispose();
      console.log('disposing', this.currentView.el)
    }

    this.currentView = view;
    this.currentView.attach(); // Might want to swap render and attached
  },


  slideView: function(view) {
    // console.log('App.site',App.site)
    if (App.site.get('currentPage')) {
      App.site.set({'newPage': view.model.get('page')});
      App.site.set({'oldPage': App.site.get('currentPage')});
      App.site.set({'oldView': App.site.get('currView')});

      var incomingDirection = NavState.getSlideDir(App.site.get('currentPage'),App.site.get('newPage'));
      $('.'+App.site.get('newPage')+'_container').addClass(incomingDirection);

      this.listenToOnce(Backbone.pubSub, 'animEnd', this.animEnd);
      // this.listenToOnce(Backbone.pubSub, 'viewRendered', this.animateView);
      this.animateView();
      // view.render();

    } else {
      App.site.set({'currentPage': view.model.get('page')});
      $('.'+App.site.get('currentPage')+'_container').addClass('show');
      // view.render();

    }

    App.site.set({'currView': view});

  },

  animateView: function(payload) {
    var _this = this;
    var animEl = $('.'+App.site.get('newPage')+'_container');
    var transitionEvent = TransEnd.whichTransitionEvent();
    // App.site.set('isTransitioning', false);

    animEl.one(transitionEvent, function(event) {
      // console.log('transition END')
      Backbone.pubSub.trigger('animEnd', 'eeeeeennnnndddd');
    });

    setTimeout(function(){
      animEl.addClass('show');
      App.site.set('isTransitioning', true);
      // console.log('isTransitioning',App.site.get('isTransitioning'))
    }, 100);

    App.site.set({'currentPage': App.site.get('newPage')})
  },

  animEnd: function(payload) {
    App.site.set('isTransitioning', false);
    // console.log('isTransitioning',App.site.get('isTransitioning'))
    App.site.get('oldView').dispose();

  }


});












