import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('static-form');
  this.route('compiled-form');
  this.route('designer-form');
});

export default Router;
