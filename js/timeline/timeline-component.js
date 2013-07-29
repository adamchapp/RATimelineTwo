/*
 Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>

 Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.

 This version of the GNU Lesser General Public License incorporates the terms and conditions of version 3 of the GNU General Public License, supplemented by the additional permissions listed below.

 0. Additional Definitions.
 As used herein, “this License” refers to version 3 of the GNU Lesser General Public License, and the “GNU GPL” refers to version 3 of the GNU General Public License.

 “The Library” refers to a covered work governed by this License, other than an Application or a Combined Work as defined below.

 An “Application” is any work that makes use of an interface provided by the Library, but which is not otherwise based on the Library. Defining a subclass of a class defined by the Library is deemed a mode of using an interface provided by the Library.

 A “Combined Work” is a work produced by combining or linking an Application with the Library. The particular version of the Library with which the Combined Work was made is also called the “Linked Version”.

 The “Minimal Corresponding Source” for a Combined Work means the Corresponding Source for the Combined Work, excluding any source code for portions of the Combined Work that, considered in isolation, are based on the Application, and not on the Linked Version.

 The “Corresponding Application Code” for a Combined Work means the object code and/or source code for the Application, including any data and utility programs needed for reproducing the Combined Work from the Application, but excluding the System Libraries of the Combined Work.

 1. Exception to Section 3 of the GNU GPL.
 You may convey a covered work under sections 3 and 4 of this License without being bound by section 3 of the GNU GPL.

 2. Conveying Modified Versions.
 If you modify a copy of the Library, and, in your modifications, a facility refers to a function or data to be supplied by an Application that uses the facility (other than as an argument passed when the facility is invoked), then you may convey a copy of the modified version:

 a) under this License, provided that you make a good faith effort to ensure that, in the event an Application does not supply the function or data, the facility still operates, and performs whatever part of its purpose remains meaningful, or
 b) under the GNU GPL, with none of the additional permissions of this License applicable to that copy.
 3. Object Code Incorporating Material from Library Header Files.
 The object code form of an Application may incorporate material from a header file that is part of the Library. You may convey such object code under terms of your choice, provided that, if the incorporated material is not limited to numerical parameters, data structure layouts and accessors, or small macros, inline functions and templates (ten or fewer lines in length), you do both of the following:

 a) Give prominent notice with each copy of the object code that the Library is used in it and that the Library and its use are covered by this License.
 b) Accompany the object code with a copy of the GNU GPL and this license document.
 4. Combined Works.
 You may convey a Combined Work under terms of your choice that, taken together, effectively do not restrict modification of the portions of the Library contained in the Combined Work and reverse engineering for debugging such modifications, if you also do each of the following:

 a) Give prominent notice with each copy of the Combined Work that the Library is used in it and that the Library and its use are covered by this License.
 b) Accompany the Combined Work with a copy of the GNU GPL and this license document.
 c) For a Combined Work that displays copyright notices during execution, include the copyright notice for the Library among these notices, as well as a reference directing the user to the copies of the GNU GPL and this license document.
 d) Do one of the following:
 0) Convey the Minimal Corresponding Source under the terms of this License, and the Corresponding Application Code in a form suitable for, and under terms that permit, the user to recombine or relink the Application with a modified version of the Linked Version to produce a modified Combined Work, in the manner specified by section 6 of the GNU GPL for conveying Corresponding Source.
 1) Use a suitable shared library mechanism for linking with the Library. A suitable mechanism is one that (a) uses at run time a copy of the Library already present on the user's computer system, and (b) will operate properly with a modified version of the Library that is interface-compatible with the Linked Version.
 e) Provide Installation Information, but only if you would otherwise be required to provide such information under section 6 of the GNU GPL, and only to the extent that such information is necessary to install and execute a modified version of the Combined Work produced by recombining or relinking the Application with a modified version of the Linked Version. (If you use option 4d0, the Installation Information must accompany the Minimal Corresponding Source and Corresponding Application Code. If you use option 4d1, you must provide the Installation Information in the manner specified by section 6 of the GNU GPL for conveying Corresponding Source.)
 5. Combined Libraries.
 You may place library facilities that are a work based on the Library side by side in a single library together with other library facilities that are not Applications and are not covered by this License, and convey such a combined library under terms of your choice, if you do both of the following:

 a) Accompany the combined library with a copy of the same work based on the Library, uncombined with any other library facilities, conveyed under the terms of this License.
 b) Give prominent notice with the combined library that part of it is a work based on the Library, and explaining where to find the accompanying uncombined form of the same work.
 6. Revised Versions of the GNU Lesser General Public License.
 The Free Software Foundation may publish revised and/or new versions of the GNU Lesser General Public License from time to time. Such new versions will be similar in spirit to the present version, but may differ in detail to address new problems or concerns.

 Each version is given a distinguishing version number. If the Library as you received it specifies that a certain numbered version of the GNU Lesser General Public License “or any later version” applies to it, you have the option of following the terms and conditions either of that published version or of any later version published by the Free Software Foundation. If the Library as you received it does not specify a version number of the GNU Lesser General Public License, you may choose any version of the GNU Lesser General Public License ever published by the Free Software Foundation.

 If the Library as you received it specifies that a proxy can decide whether future versions of the GNU Lesser General Public License shall apply, that proxy's public statement of acceptance of any version is permanent authorization for you to choose that version for the Library.
 */
d3.custom.timelineDisplay = function module() {

    var that = this;

    var icon_buffer = 20
    ,     icon_width = 19
    ,     icon_height = 58
    ,     icon_path = 'img/pngs/icons_timeline/';

    var isiPad = navigator.userAgent.match(/iPad/i) != null;

    var margin = {top: 0, right: 2, bottom: 50, left: 2},
        containerWidth = 1000,
        containerHeight = 600,
        date_format = d3.time.format("%Y-%m-%d %X"),
        gap = 15,
        bar_height = 35,
        dispatch = function(d) {},

        filter_function = function(d) { return true; },
        clickHandler = function(d) {},
        mouseOverHandler = function(d) {},
        mouseOutHandler = function(d) {}

    var svg;

    function exports(_selection) {
        _selection.each(function(data) {

            var width = containerWidth - margin.left - margin.right,
                height = containerHeight - margin.top - margin.bottom;

            //create container and position
            if ( !svg ) {

                svg = d3.select(this)
                    .append('svg')
                    .classed('chart', true);

                svg.append("svg:rect")
                    .attr({
                        width: containerWidth,
                        height: containerHeight,
                        transform: "translate(0," + height + ")"
                    })
                    .classed("axisbackground", true);

                //set up sub groups
                var container = svg.append('g').classed('container-group', true);
                container.append("g").classed('grid', true);
                container.append('g').classed('month axis', true);
                container.append('g').classed('year axis', true);
                container.append('g').classed('chart-group', true);
            }

            //alert('new data has length : ' + data.length);

            data = data.sort(function(a, b) { return d3.ascending(a.startdate, b.startdate)});

            if ( data.length > 1 ) {
                var min = date_format.parse(data[0].startdate);
                var max = date_format.parse(data[data.length-1].enddate);

                exports.min = min;
                exports.max = max;
            } else {
                //alert('no new data, using old time constraints');
                min = exports.min;
                max = exports.max;
            }


            //console.log('range from ' + min + ' to ' + max);

            var x_scale = d3.time.scale()
                                 .domain([min, max])
                                 .range([0, width]);

            var layout = d3.layouts.fitToText({
                x_scale : x_scale,
                date_format : date_format,
                h_buffer : gap
            })

            //sort and map data
            var lanes = [];

           // if ( !data ) { data = exports.data; }

            //if ( data.length < 1 ) alert('data is null');

            exports.data = data;

            data = data.filter(filter_function);

            //create dataprovider (including x and y pos)
            data.map(function(d) {
                d.start_pos = layout.x_pos(d.startdate);
                d.end_pos = layout.x_end_pos(d);
                d.lane = layout.y_pos(0, d, lanes);
            })

            svg
               .transition()
               .attr({width: containerWidth, height: containerHeight});

            var totalBarHeight = (bar_height + gap) * lanes.length;
            var allowedLanes = height/(bar_height + gap);

            //y-scale
            var y_scale = d3.scale.linear()
                                  .domain([0, allowedLanes])
                                  .range([height-(bar_height+gap), 0]);

            var zoom = d3.behavior.zoom().x(x_scale).scaleExtent([1, 1000]).on("zoom", zoom)
            ,   x_axis = d3.svg.axis().scale(x_scale).orient("bottom").tickFormat(d3.time.format('%b')).ticks(10, 1).tickSize(9, 6, 0).tickSubdivide(9)
            ,   sub_axis = d3.svg.axis().scale(x_scale).orient("bottom").ticks(2).tickFormat(d3.time.format('%Y'))
            ,   grid_axis = d3.svg.axis().scale(x_scale).orient("bottom").tickFormat("").tickSize(-height, 0, 0);

            //AXES
            //----------

            svg.select('.month.axis')
                .transition()
                .attr({transform: 'translate(0,' + height + ')'})
                .call(x_axis);

            //draw the grid lines
            svg.select(".grid")
                .attr("transform", "translate(0," + height + ")")
                .call(grid_axis);

            svg.select(".year")
                .attr("transform", "translate(0," + (height + 20) + ")")
                .call(sub_axis);

            svg.select('.container-group')
                .attr({
                    transform: 'translate(' + margin.left + ',' + margin.top + ')',
                    width: width,
                    height: height
                })

            var bars = svg.select('.chart-group')
                .selectAll('.bar')
                .data(data);

            //BARS ENTER SELECTION
            //---------------

            var barEnter = bars.enter().append('g').classed('bar', true);

            //event
            barEnter.append('rect')
                .classed('event', true)
                .on("mouseover", function(d) { d3.select(this).classed("active", true) })
                .on("mouseout", function(d) { d3.select(this).classed("active", false) })
                .on("click", clickHandler);

            //icon
            barEnter.append('image')
                    .classed('icon', true)

            //foreign object label
            barEnter.append('text')
                    .classed('label', true)

            //BARS UPDATE SELECTION
            //----------------

            bars.select('.event').transition()
                .attr({
                    x: function(d) { return layout.x_pos(d.startdate) + (icon_buffer/2) },
                    y: function(d) { return y_scale(d.lane) },
                    fill : function(d) { return d.color },
                    width: function(d) { return layout.x_end_pos(d) + (icon_buffer/2) - layout.x_pos(d.startdate); },
                    height: function(d) { return bar_height } //y_scale.rangeBand() }
                });

            bars.select('.icon').transition()
                .attr({
                    "xlink:href": function(d) { return icon_path + d.icon },
                    x: function(d) { return layout.x_pos(d.startdate) - (icon_buffer/2) },
                    y: function(d) { return y_scale(d.lane) },
                    width: function(d) { return icon_width; },
                    height: function(d) { return icon_height }  //y_scale.rangeBand() }
                });

            bars.select('.label').transition()
                .attr({
                    x: function(d) { return layout.x_pos(d.startdate) + (icon_buffer/2) },
                    y: function(d) { return y_scale(d.lane) },
                    dy: '1.2em',
                    dx: ".2em",
                    width: function(d) { return layout.x_end_pos(d) - layout.x_pos(d.startdate); },
                    height: function(d) { return bar_height }, //y_scale.rangeBand() }
                    "pointer-events": "none"

                })
                .text(function(d) { return d.title });

            //BARS EXIT SELECTION
            //----------------
            bars.exit().remove();

            svg.call(zoom);

            function zoom(e) {

                bars.exit().remove();

                svg.select(".month").call(x_axis);
                svg.select(".year").call(sub_axis);
                svg.select(".grid").call(grid_axis);

                var zoombars = svg.select('.chart-group')
                    .selectAll('.bar')
                    .data(data);

                zoombars.selectAll('.label')
                    .attr({
                        x : function(d) { return layout.x_pos(d.startdate) + (icon_buffer/2); }
                   //     width : function(d) { return layout.x_end_pos(d) - layout.x_pos(d.startdate) }
                    })


                zoombars.selectAll('.event')
                    .attr({
                        x: function(d) { return layout.x_pos(d.startdate) + (icon_buffer/2); }
                   //     width : function(d) { return layout.x_end_pos(d) - layout.x_pos(d.startdate) }
                    })

                zoombars.selectAll('.icon')
                    .attr("x", function(d) { return layout.x_pos(d.startdate) - (icon_buffer/2) })

            }
        })
    }

    exports.dispatch = function(_x) {
        if ( !arguments.length) return dispatch;
        return this;
    }

    exports.filter = function(_x) {
        if (!arguments.length) return filter_function;
        filter_function = _x;
        return this;
    }

    exports.row_height = function(_x) {
        if (!arguments.length) return bar_height;
        bar_height = parseFloat(_x);
        return this;
    }

    exports.width = function(_x ) {
        if (!arguments.length) return containerWidth;
        containerWidth = parseInt(_x);
        return this;
    };
    exports.height = function(_x) {
        if (!arguments.length) return containerHeight;
        containerHeight = parseInt(_x);
        return this;
    };
    exports.gap = function(_x) {
        if (!arguments.length) return gap;
        gap = parseFloat(_x);
        return this;
    };
    exports.click = function(_x) {
        if (!arguments.length) return clickHandler;
        clickHandler = _x;
        return this;
    }
    exports.mouseover = function(_x) {
        if (!arguments.length) return mouseOverHandler;
        mouseOverHandler = _x;
        return this;
    }
    exports.mouseout = function(_x) {
        if (!arguments.length) return mouseOutHandler;
        mouseOutHandler = _x;
        return this;
    }

    return exports;
}