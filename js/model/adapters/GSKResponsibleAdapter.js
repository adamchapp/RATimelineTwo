/**
 * Created with JetBrains WebStorm.
 * User: nucleus
 * Date: 12/04/2013
 * Time: 11:14
 * To change this template use File | Settings | File Templates.
 */

window.GSKResponsibleAdapter = function(){
    this.url = BASE_URL + "/Employee/All";
}

GSKResponsibleAdapter.prototype.adapt = function(data) {

    var adaptedData = {
        title: "GSK Responsible",
        placeholder: "Choose GSK responsible",
        data: []
    };

    data.forEach(function(item) {

        var label = item.FirstName + ' ' + item.LastName + ' ( ' + item.Team.Name + ' )';

        adaptedData.data.push({
            label: label,
            value: item.Id
        });
    });

    return adaptedData;
}

