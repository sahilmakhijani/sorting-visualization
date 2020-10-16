sortingData = [
    { "position": 0, "value": 10, "color": "rgb(0,0,255)" },
    { "position": 1, "value": 20, "color": "rgb(0,0,255)" },
];

sortingSVG = d3.select("#visual-container")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "300px")
    .attr("id", "sortingSVG");

var bars = sortingSVG.selectAll("g")
    .data(sortingData)
    .enter()
    .append("g")
    .attr("class", "gbar");

var rects = sortingSVG.selectAll("g")
    .append("rect");

var rectAttrs = rects
    .attr("x", function (d, i) { return d.position * 25; })
    .attr("y", function (d, i) { return 150 - d.value * 3; })
    .attr("width", 20)
    .attr("height", function (d, i) { return d.value * 3; })
    .style("fill", function (d) { return d.color; });

var labels = sortingSVG.selectAll("g")
    .append("text");

var lableAttrs = labels
    .attr("x", function (d, i) { return d.position * 25; })
    .attr("y", function (d) { return 145 - d.value * 3;; })
    .text(function (d) { return d.value; });


function redraw(newData, transitionDuration = 1000) {
    var bars = sortingSVG.selectAll("g")
        .data(newData)
        .transition()
        .duration(transitionDuration)

    var rectAttrs = bars.select("rect")
        .attr("x", function (d, i) { return d.position * 25; })
        .attr("y", function (d, i) { return 150 - d.value * 3; })
        .attr("width", 20)
        .attr("height", function (d, i) { return d.value * 3; })
        .style("fill", function (d) { return d.color; });

    var lableAttrs = bars.select("text")
        .attr("x", function (d, i) { return d.position * 25; })
        .attr("y", function (d) { return 145 - d.value * 3;; })
        .text(function (d) { return d.value; });

}



redraw([
    { "position": 1, "value": 10, "color": "rgb(0,0,255)" },
    { "position": 0, "value": 20, "color": "rgb(0,0,255)" },
]);
