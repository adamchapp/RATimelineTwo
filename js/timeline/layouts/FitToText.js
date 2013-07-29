/**
 * User: nucleus
 * Date: 30/05/2013
 *
 */

d3.layouts.fitToText = function(attributes) {

    var date_format = attributes.date_format;
    var x_scale = attributes.x_scale;
    var h_buffer = attributes.h_buffer || 15;

    var layout = {};
    //layout.prototype = d3.layouts.baseLayout(attributes);

    layout.x_pos = function x_pos(date) {
        return x_scale(date_format.parse(date));
    }

    layout.stringWidth = function measureStringWidth(string, aclass) {

        var svg = d3.select("svg");

        var text = svg.append("text")
            .classed(aclass,true)
            .attr("x", 0)
            .attr("y", 0)
            .style('font-size', 18)
            .style("opacity", 0)
            .text(string);

        var length = text.node().getComputedTextLength();

        //nb make sure to remove the measured text item
        text.remove();

        return length;
    }


    layout.x_end_pos = function x_end_pos(d) {
        var end_pos = layout.x_pos(d.startdate) + layout.stringWidth(d.title, ".label");
        return end_pos;
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