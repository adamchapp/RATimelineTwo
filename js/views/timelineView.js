window.TimelineView = Backbone.View.extend({

    el: '#graph',

    timeline: {},

    loadingModal : {},

    detailModal : {},

    model : new TimelineModel(),

    initialize: function (attributes) {
        this.user = attributes.user;
        this.filterModel = attributes.filterModel;

        var that = this;

        //Event listeners for the user and filter models.
        //Any change triggers the timeline to reload
        this.user.bind('change:Id', function(model,attr) {
           that.model.url = that.model.urlRoot + '/' + this.get('Id');
//           that.getDataForTimeline();
        });

        this.filterModel.bind('change:filters', function(model,attr){
            that.getDataForTimeline(this.toJSON());
        });
    },

    render:function () {
        console.log('creating clickhandler');

        var that = this;

        that.timeline = d3.custom.timelineDisplay();
        that.timeline.click(function(d){
            that.detailView = new DetailModalView();
            that.detailView.data = d;
            that.detailView.render().showModal({"css":{
               "width":"900px"
            }});

            that.detailView.recentre();
        })
        return this;
    },

    getDataForTimeline: function(data) {

        //show div if hidden
        var that = this;

        that.loadingModal = new LoadingModalView();
        that.loadingModal.render().showModal();

        $.ajax({
            type: "POST",
            url: that.model.url,
            data: JSON.stringify(data),
            success: function(model, response) {
                $(".timeglider-loading").fadeOut(500);
                that.populateTimeline(model);
                //TODO This doesn't just auto close here!
//                this.loadingModal.close();
            },
            failure: function(model, response) {
                alert('Could not get timeline data please try again')
                this.loadingModal.hideModal();
            },
            contentType: "application/json",
            dataType: 'json'
        });
    },

    populateTimeline: function(data) {
        //the response is wrapped in an object with the key "GetResult"

        this.loadingModal.hideModal();

        var events = data["GetResult"][0].events;

        events = events.filter(function(d) { return d.enddate && d.enddate >= d.startdate; })

        d3.select('#graph').datum(events).call(this.timeline);
    },

    reload: function(data) {
        if ( this.timeline ) {
           // this.timeline.refresh();
        }
    },

    unload: function() {
        if ( this.timeline ) {
            this.timeline.loadTimeline('', function() {

            })
        } else {

        }
    }
})