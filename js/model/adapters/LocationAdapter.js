/**
 * Created with JetBrains WebStorm.
 * User: nucleus
 * Date: 12/04/2013
 * Time: 11:14
 * To change this template use File | Settings | File Templates.
 */

window.LocationAdapter = function(){
    this.url = BASE_URL + "/Location/All";
}

LocationAdapter.prototype.adapt = function(data) {

    var adaptedData = {
        title: "Location",
        placeholder: "Choose a location",
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

