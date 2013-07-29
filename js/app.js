(function($) {

    var App = function() {

       this.user = new User();
       this.filterModel = new FilterModel();

       var that = this;

       //inject models into header and router
       this.headerView = new HeaderView({
           user : this.user,
           filterModel : this.filterModel
       });

       this.headerView.bind('reload', function() {
           that.router.reloadTimelineData();
       });

       this.headerView.bind('clear', function() {
           that.filterModel.clear();
           that.router.reloadTimelineData()
       });

       this.router = new Router({
           user : this.user,
           filterModel : this.filterModel
       });

       this.init();

       return this;
    };

    App.prototype.init = function() {

        Backbone.history.start();

        this.login();
    }

    App.prototype.login = function() {
        this.router.showLogin();
    }

    var Router = Backbone.Router.extend({

        initialize : function(attributes) {
            this.user = attributes.user;
            this.filterModel = attributes.filterModel;
        },

        routes: {
            "" : "createTimelineView",
            "login" : "showLogin"
        },

        createTimelineView: function() {

            if ( !this.timelineView ) {
                this.timelineView = new TimelineView({
                    user : this.user,
                    filterModel : this.filterModel
                });
            }

            this.timelineView.render();

            if ( this.timelineView.onShow ) {
                this.timelineView.onShow();
            }
        },

        updateFilters: function( event ) {
            console.log('updating filters');
            this.timelineView.updateFilters(event);
        },

        reloadTimelineData : function() {
            if ( this.timelineView ) {
                this.timelineView.reload();
            }
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

        unload: function() {

            $('.nav').hide();

            if ( this.timelineView ) {
                this.timelineView.unload();
            }
        }
    });

    if(typeof window.app == "undefined") {
        window.app = new App();
    }
    else {
        log('XXXXXXXXXX Error : we should only ever have one instance of app in the DOM XXXXXXXXXXXXXXXXX');
    }
})(jQuery);