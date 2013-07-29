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

    initialize: function (attributes) {
        this.user = attributes.user;
        this.filterModel = attributes.filterModel;
    },

        events: {
        "click .ext_experts": "showExternalExperts",
        "click .location": "showExternalExperts",
        "click .scientific_engagement": "showExternalExperts",
        "click .scientific_evidence": "showExternalExperts",
        "click .gsk_responsible": "showExternalExperts",
        "click #loginOrOut": "showLogin",
        "click #invite": "showInvite"
    },

    showLogin: function() {

        $('.nav').hide();
//        $('#content').hide();

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

    showExternalExperts : function() {
        if ( this.externalExpertView ) this.externalExpertView.remove();

        var externalExpertView = new ExternalExpertView({
            user : this.user,
            filterModel : this.filterModel
        });

        externalExpertView.render().showModal();

        this.externalExpertView = externalExpertView;
    }
});
