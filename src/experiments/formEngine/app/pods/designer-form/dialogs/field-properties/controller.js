import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        close: function(flag) {
            if (flag) {
                let caller = this.get('model.support.caller');
                let callBack = this.get('model.support.callBack');
                let callParams = this.get('model.support.callParams');
                if (caller && callBack) {
                    callParams.results = flag;
                    callParams.def = this.get('model.def');
                    caller.send(callBack, callParams);
                }
            }
            this.set('started', false);
            this.send('closeDialog');
        }
    }
});