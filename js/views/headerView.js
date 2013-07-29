/**
 * Created with JetBrains WebStorm.
 * User: adamchapp
 * Date: 11/04/2013
 * Time: 01:29
 *
 * Handles navigation. Deals with the popups whilst the app router
 * deals with the #content div.
 *
 */
window.HeaderView = Backbone.View.extend({
    el: '#top_bar',

    filterDataProvider: new FilterDataProvider(),

    initialize: function (attributes) {

        this.user = attributes.user;
        this.filterModel = attributes.filterModel;
        this.successfulUpdateHandler = attributes.successfulUpdateHandler;

        var that = this;

        this.user.bind('change:Id', function(model, attr) {
            that.showFilters();
        });
    },

        events: {
        "click #filter_btn": "showFilters",
        "click #reset_btn": "clear"
    },

    showLogin: function() {

        $('.nav').hide();

        if ( this.loginModalView ) this.loginModalView.remove();

        var loginModalView = new LoginModalView({
            slideFromBelow: true,
            permanentlyVisible: true,
            model:this.user
        });

        loginModalView.render().showModal();

        this.loginModalView = loginModalView;
    },

    showInvite: function() {

        if ( this.inviteModalView ) this.inviteModalView.remove();

        var inviteModalView = new InviteModalView();
        inviteModalView.render().showModal();

        this.inviteModalView = inviteModalView;
    },

    showFilters : function() {

        if ( !this.user ) { return; }

        if ( this.objectivesView ) this.objectivesView.remove();

        var that = this;

        var successfulUpdateHandler = function(results) {
            that.filterModel.set(results);
            that.filterModel.callUpdate();
        }

        var objectivesView = new FilterWithComboModalView({
            model : this.filterDataProvider,
            filterModel : this.filterModel,
            user : this.user,
            successHandler : successfulUpdateHandler
        });

        objectivesView.render().showModal();

        this.objectivesView = objectivesView;
    },

    reload : function() {
        this.filterModel.clear();
        this.filterModel.callUpdate();
    },

    clear : function() {
        this.trigger("clear");
    }
});
