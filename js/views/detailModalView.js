window.DetailModalView = Backbone.ModalView2.extend(
    {
        data : {},

        initialize:
            function()
            {

            },
        events:
        {
            "click #escape-route": "close"
        },
        close:
            function( event)
            {
                event.preventDefault();
                this.hideModal();
            },
        render:
            function()
            {
                var compiledTemplate = Handlebars.getTemplate('detail-view');

                var renderedHTML = compiledTemplate(this.data);

                this.template = renderedHTML;

                $(this.el).html( this.template );

//                this.recentre();

                return this;
            }
    });
