/**
 * User: nucleus
 * Date: 30/05/2013
 *
 */

d3.layouts.actualSize = function(attributes) {

    //console.log('using actual size layout');

    var layout = {};
    layout.__proto__ = d3.layouts.baseLayout(attributes);

    var date_format = attributes.date_format;
    var x_scale = attributes.x_scale;
    var h_buffer = attributes.h_buffer || 15;

    layout.x_end_pos = function x_end_pos(d) {
        return layout.x_pos(d.enddate);
    }

    layout.y_pos = function y_pos(currentLane, event, lanes) {

        var end_pos = lanes[currentLane];

        if ( !end_pos ) {
            lanes[currentLane] = event.end_pos;
            return currentLane;
        }

        if ( ( end_pos + h_buffer ) > layout.x_pos(event.startdate)) {
            return y_pos(++currentLane, event, lanes);
        }

        lanes[currentLane] = event.end_pos;

        return currentLane;
    }

    return layout;
}