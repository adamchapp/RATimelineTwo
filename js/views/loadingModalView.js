/**
 * Created with JetBrains WebStorm.
 * User: adamchapp
 * Date: 30/03/2013
 * Time: 00:09
 * To change this template use File | Settings | File Templates.
 */
window.LoadingModalView = Backbone.ModalView3.extend(
    {
        initialize:
            function()
            {
                var compiledTemplate = Handlebars.getTemplate('loading');
                var renderedHTML = compiledTemplate();

                this.template = renderedHTML;
            },
        events:
        {
            "click #exit": "close",
            "click #submitButton" : "submit"
        },
        submit:
            function( event )
            {
                event.preventDefault();
                this.hideModal();
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
                $(this.el).html( this.template );
                return this;
            }
    });
