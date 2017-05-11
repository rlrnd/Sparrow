import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        openDialog(modalName, model, controller) {
            this.render(modalName, {
                into: 'application',
                outlet: 'dialog',
                model: model,
                controller: controller
            });
        },
        closeDialog() {
            this.disconnectOutlet({
                outlet: 'dialog',
                parentView: 'application'
            });
        },
    }
});
