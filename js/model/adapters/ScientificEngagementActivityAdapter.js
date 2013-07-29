/**
 * Created with JetBrains WebStorm.
 * User: nucleus
 * Date: 12/04/2013
 * Time: 11:14
 * To change this template use File | Settings | File Templates.
 */

window.ScientificEngagementActivityAdapter = function(){
    this.url = BASE_URL + "/Type/All";
}

ScientificEngagementActivityAdapter.prototype.adapt = function(data) {

    var adaptedData = {
        title: "Scientific Engagement Activity",
        placeholder: "Choose scientific engagement",
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

