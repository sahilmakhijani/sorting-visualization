
// Value should be between 0 to 100;
arrayElements = [5, 2, 7, 9, 20, 1, 4, 8, 21, 3, 13, 37];

sortingData = [
    { "position": 0, "value": 5, "color": "blue" },
    { "position": 1, "value": 2, "color": "blue" },
    { "position": 2, "value": 7, "color": "blue" },
    { "position": 3, "value": 9, "color": "blue" },
    { "position": 4, "value": 20, "color": "blue" },
    { "position": 5, "value": 1, "color": "blue" },
    { "position": 6, "value": 4, "color": "blue" },
    { "position": 7, "value": 8, "color": "blue" },
    { "position": 8, "value": 21, "color": "blue" },
    { "position": 9, "value": 3, "color": "blue" },
    { "position": 10, "value": 13, "color": "blue" },
    { "position": 11, "value": 37, "color": "blue" },
];

function swapElementsAtIndex(idx1, idx2) {
    var tempValue = arrayElements[idx1];
    arrayElements[idx1] = arrayElements[idx2];
    arrayElements[idx2] = tempValue;

    var index1 = sortingData.findIndex(x => x.position == idx1);
    var index2 = sortingData.findIndex(x => x.position == idx2);
    sortingData[index1].position = idx2;
    sortingData[index2].position = idx1;

    redraw(sortingData);
}

function changeColor(idx, color) {
    var index = sortingData.findIndex(x => x.position == idx);
    sortingData[index].color = color;

    redraw(sortingData);
}

function draw(initialData) {
    d3.select("#visual-container").html(null);

    sortingSVG = d3.select("#visual-container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "300px")
        .attr("id", "sortingSVG")
        .attr("viewBox", "0 0 1000 120");

    var bars = sortingSVG.selectAll("g")
        .data(initialData)
        .enter()
        .append("g")
        .attr("class", "gbar");

    var rects = bars.append("rect");

    var rectAttrs = rects
        .attr("x", function (d, i) { return (d.position * 1000 / initialData.length) + 1; })
        .attr("y", function (d) { return 100 - d.value; })
        .attr("width", function (d) { return parseInt(1000 / initialData.length) - 2; })
        .attr("height", function (d) { return d.value; })
        .style("fill", function (d) { return d.color; });

    var labels = bars.append("text");

    var lableAttrs = labels
        .attr("x", function (d, i) { return (1000 * d.position + 500) / initialData.length; })
        .attr("y", function (d) { return (100 - d.value) - 10; })
        .text(function (d) { return d.value; });

}

function redraw(newData, transitionDuration = 1000) {
    sortingSVG = d3.select("#visual-container")

    var bars = sortingSVG.selectAll("g")
        .data(newData)
        .transition()
        .duration(transitionDuration)

    var rectAttrs = bars.select("rect")
        .attr("x", function (d, i) { return (d.position * 1000 / newData.length) + 1; })
        .attr("y", function (d) { return 100 - d.value; })
        .attr("width", function (d) { return parseInt(1000 / newData.length) - 2; })
        .attr("height", function (d) { return d.value; })
        .style("fill", function (d) { return d.color; });

    var lableAttrs = bars.select("text")
        .attr("x", function (d, i) { return (1000 * d.position + 500) / newData.length; })
        .attr("y", function (d) { return (100 - d.value) - 10; })
        .text(function (d) { return d.value; });

}

async function bubbleSort(delay = 1000) {
    if (delay && typeof delay !== "number") {
        alert("sort: First argument must be a typeof Number");
        return;
    }

    for (let i = 0; i < arrayElements.length - 1; i += 1) {
        for (let j = 0; j < arrayElements.length - i - 1; j += 1) {
            changeColor(j, "red");
            changeColor(j + 1, "red");

            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            if (arrayElements[j] > arrayElements[j + 1]) {
                swapElementsAtIndex(j, j + 1);
            }

            changeColor(j, "blue");
            changeColor(j + 1, "blue");
        }

        changeColor(arrayElements.length - i - 1, "green");
    }
    changeColor(0, "green");
}


draw(sortingData);
bubbleSort();
