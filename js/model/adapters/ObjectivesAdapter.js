/**
 * Created with JetBrains WebStorm.
 * User: nucleus
 * Date: 12/04/2013
 * Time: 11:14
 * To change this template use File | Settings | File Templates.
 */

window.ObjectivesAdapter = function(){
    this.url = BASE_URL + "/Opportunities/All";
}

ObjectivesAdapter.prototype.adapt = function(data) {

    var adaptedData = {
        title: "Opportunites",
        placeholder: "Choose an opportunity",
        data: []
    };

    data.forEach(function(item) {
        adaptedData.data.push({
            label: item.Name,
            value: item.Id
        });
    });

    return adaptedData;
}

