window.LoginModalView = Backbone.ModalView.extend(
    {
        initialize:
            function()
            {
                var compiledTemplate = Handlebars.getTemplate('login-form');
                var renderedHTML = compiledTemplate();

                var that = this;

                this.model.bind('change', function(model,attr) {

                    if ( that.model.authenticated() )
                    {
                        that.hideModal();
                        $('.nav').show();
                    }
                    else {
                        alert('You have entered an incorrect username or password');
                    }

                });

                this.template = renderedHTML;
            },
        events:
        {
            "click #escape-route": "close",
            "click #submitButton": "submit"
        },
        close:
            function( event)
            {
                event.preventDefault();
                this.hideModal();
            },
        submit:
            function( event )
            {
                event.preventDefault();

                var user = $('#usernameField').val();
                var password = $('#passwordField').val();

//                if ( user, password ) {

                    this.model.login('vlopes','1234');
//                }
//                else {
//                    alert('Please enter a username and password');
//                }
            },
        render:
            function()
            {
                $(this.el).html( this.template );
                return this;
            }
    });
