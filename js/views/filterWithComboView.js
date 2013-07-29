/**
 * Created with JetBrains WebStorm.
 * User: nucleus
 * Date: 03/04/2013
 */
window.FilterWithComboModalView = Backbone.ModalView.extend(
    {
        initialize:
            function(attributes)
            {
                this.model = attributes.model;
                this.filterModel = attributes.filterModel;
                this.user = attributes.user;
                this.successHandler = attributes.successHandler;
                this.selectedParent = attributes.selectedParent;
                this.selectedItems = attributes.selectedItems;
            },
        events:
        {
            "click #escape-route": "close",
            "click #submitButton": "submit",
            "click #cancelButton": "close",
            "click #resetButton": "reset"
        },
        close:
            function( event)
            {
                event.preventDefault();

                this.hideModal();
            },
        reset :
            function ( event ) {
                event.preventDefault();

                $(".chzn-select option").each(function() {
                    this.selected = false;
                })

                $(".chzn-select").trigger("liszt:updated");
            },
        submit:
            function( event )
            {
                var results = {
                    types : $('#activityMulti').val() || [],
                    teams : $('#scientificEvidenceMulti').val() || [],
                    locations : $('#locationMulti').val() || [],
                    employees : $('#gskResponsibleMulti').val() || [],
                    externalExperts : $('#externalExpertsMulti').val() || [],
                    strategies : $('#strategiesMulti').val() || [],
                    opportunities : $('#opportunityCombo').val() || []
                }

                this.successHandler(results);

                event.preventDefault();
                this.hideModal();
            },
        render:
            function()
            {
                var that = this;

                var url = BASE_URL + '/TimelineFilters/All/' + this.user.get("Id");

                $.getJSON(url, function(data) {
                    var compiledTemplate = Handlebars.getTemplate('bigfilter');

                    that.filterDataProvider = data;

                    var renderedHTML = compiledTemplate(that.filterDataProvider);

                    $(that.el).html( renderedHTML );

                    _.defer(function() {

                        //turn Chosen on
                        $('.chzn-select').chosen();

                        //if we have previously selected items in the filtermodel
                        // restore the previous selection
                        that.restorePreviousSelection(data);

                        //event listener for top combo
                        $("#opportunityCombo").chosen().change( function(event) {

                            var selectedOpportunities = $(event.target).val();

                            if ( selectedOpportunities ) {

                                var keptStrategies = that.getKeepableStrategies(selectedOpportunities, data);
                                that.emptyStrategyCombo();
                                that.populateStrategyCombo(selectedOpportunities, data);

                                //reselect valid strategies after wiping combo
                                if ( keptStrategies ) {
                                    keptStrategies.forEach(function(item) {
                                        $('#strategiesMulti').find('option:[value='+item.Id+']').attr('selected', true);
                                    });
                                }

                                $("#strategiesMulti").trigger("liszt:updated");
                            }
                        });
                    });

                });

                return this;
            },

        //populate strategy combo from provider (see below)
        populateStrategyCombo:
            function(selectedOpportunities, data) {
                //create strategy dataprovider from selected opportunities
                var strategyDataProvider = this.createStrategyProvider(selectedOpportunities, data);

                strategyDataProvider.forEach(function(item) {
                    $('#strategiesMulti')
                        .append($('<option>', { value : item.Id })
                            .text(item.Name));

                });
            },

        //iterates through every opportunity and returns one unified dataprovider
        createStrategyProvider:
            function(selectedOpportunities,data) {

                var strategyDataProvider = [];
                var that = this;

                selectedOpportunities.forEach(function(id) {

                    var strategies = that.getStrategies(id, data.ActivityOpportunities);

                    //add each group of elements to main provider
                    strategyDataProvider = strategyDataProvider.concat(strategies);
                })

                return strategyDataProvider;
            },

        //retrieve the strategies for a given opportunity ID
        getStrategies:
            function(id, opportunities) {
                var returnStrategies = [];

                opportunities.forEach(function(item) {
                    if ( item.Id === id ) {
                        returnStrategies = returnStrategies.concat(item.Strategies);
                    }
                });

                return returnStrategies;
            },

        getKeepableStrategies:
            function(selectedOpportunities, data) {
                var currentlySelectedStrategies = $('#strategiesMulti').val();

                if ( currentlySelectedStrategies == null || currentlySelectedStrategies.length == 0 ) return;

                //compare selected strategy ids against selected opportunities
                //and return the matched items as an array
                var keptStrategies = [];

                var validStrategies = this.createStrategyProvider(selectedOpportunities, data);

                var strategyLength = validStrategies.length;

                $.each(currentlySelectedStrategies, function(index, item) {

                    for (var count=0; count<strategyLength; count++) {
                        var validStrategy = validStrategies[count];

                        if ( item === validStrategy.Id ) {
                            keptStrategies.push(validStrategy);
                        }
                    }
                })

                return keptStrategies;
            },

        restorePreviousSelection:
            function(data) {
                //external experts
                var externalExperts = this.filterModel.get("externalExperts");

                externalExperts.forEach(function(item) {
                    $('#externalExpertsMulti').find('option:[value='+item+']').attr('selected', true);
                });

                //locations
                var locations = this.filterModel.get("locations");

                locations.forEach(function(item) {
                    $('#locationMulti').find('option:[value='+item+']').attr('selected',    true);
                });

                //activities
                var types = this.filterModel.get("types");

                types.forEach(function(item) {
                    $('#activityMulti').find('option:[value='+item+']').attr('selected', true);
                });

                //teams
                var teams = this.filterModel.get("teams");

                teams.forEach(function(item) {
                    $('#scientificEvidenceMulti').find('option:[value='+item+']').attr('selected', true);
                });

                //employees
                var employees = this.filterModel.get("employees");

                employees.forEach(function(item) {
                    $('#gskResponsibleMulti').find('option:[value='+item+']').attr('selected', true);
                });

                //opportunities
                var opportunities = this.filterModel.get("opportunities");

                opportunities.forEach(function(item) {
                    $('#opportunityCombo').find('option:[value='+item+']').attr('selected', true);
                });

                //strategies
                if ( opportunities ) {
                    //repopulate the strategy combo before marking its selected elements
                    this.populateStrategyCombo(opportunities, data);

                    var strategies = this.filterModel.get("strategies");
                    strategies.forEach(function(item) {
                        $('#strategiesMulti').find('option:[value='+item+']').attr('selected', true);
                    })
                }
                $('.chzn-select').trigger("liszt:updated");
            },

        emptyStrategyCombo:
            function() {
                $('#strategiesMulti')
                    .find('option')
                    .remove()
                    .end()
            }
    });