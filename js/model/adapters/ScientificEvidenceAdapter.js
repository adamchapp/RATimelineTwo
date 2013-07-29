/**
 * Created with JetBrains WebStorm.
 * User: nucleus
 * Date: 12/04/2013
 * Time: 11:14
 * To change this template use File | Settings | File Templates.
 */

window.ScientificEvidenceAdapter = function(){
    this.url = BASE_URL + "/Team/All";
}

ScientificEvidenceAdapter.prototype.adapt = function(data) {

    var adaptedData = {
        title: "Scientific Evidence",
        placeholder: "Choose scientific evidence",
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

