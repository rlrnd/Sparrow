import Ember from 'ember';

export default Ember.Helper.helper(function([scope, fn]) {
    let args = arguments[0].slice(2);
    let res = fn.apply(scope, args);
    return res;
});
