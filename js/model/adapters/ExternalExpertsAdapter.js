/**
 * Created with JetBrains WebStorm.
 * User: nucleus
 * Date: 12/04/2013
 * Time: 11:14
 * To change this template use File | Settings | File Templates.
 */
window.ExternalExpertsAdapter = function(){
    this.url = BASE_URL + "/ExternalExpert/All";
}

ExternalExpertsAdapter.prototype.adapt = function(data) {

    var adaptedData = {
        title: "External experts",
        placeholder: "Choose external experts",
        data: []
    };

    data.forEach(function(item) {

        var label = item.FirstName + ' ' + item.LastName +' ( ' + item.Country.Name + ' )';

        adaptedData.data.push({
            label: label,
            value: item.Id
        });
    });

    return adaptedData;
}

