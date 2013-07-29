//http://staging.n24i.com/BDMTM014_RA_DataService_Dev/

window.TimelineModel = Backbone.Model.extend({
    urlRoot: BASE_URL + '/Timeline',

    dataType: 'JSON'

});

window.User = Backbone.Model.extend({
    defaults : {
        Id: null,
        UserId: null
    },

    urlRoot: BASE_URL + '/User/Login',

    dataType: 'JSON',

    login : function(username, password) {
        this.url = this.urlRoot + '/' + username + '/' + password;

        this.fetch({ success: function() {
            if (!arguments[0].authenticated()) {
                 alert('Could not log in. Please check your username and password.');
            }

        }, error: function(e) {
            alert('There was an error logging in, please try again: ' + e.error);
        }});
    },

    authenticated : function() {
        return Boolean(this.get('Id'));
    }
});

window.FilterModel = Backbone.Model.extend({

    defaults: function () {
        return {
            types : new Array(),
            teams : new Array(),
            employees : new Array(),
            locations : new Array(),
            externalExperts: new Array(),
            opportunities : new Array(),
            strategies: new Array()
        }
    },

    callUpdate: function() {
        this.trigger('change:filters');
    }
});

window.FilterDataProvider = Backbone.Model.extend({
    urlRoot: BASE_URL + '/TimelineFilters/All',

    dataType: 'JSON',

    contentType: "application/json"
})

