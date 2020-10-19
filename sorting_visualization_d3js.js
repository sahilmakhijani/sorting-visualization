
// Value should be between 0 to 100;
arrayElements = [50, 20, 70, 90, 21, 10, 40, 80, 21, 30, 13, 37, 56, 75, 90, 99, 17, 35, 47, 89, 93, 97, 61, 30, 34];

sortingData = [];

duration = 100;

function generateSortingData() {
    sortingData = [];
    arrayElements.forEach((elem, idx) => {
        sortingData.push({
            "position": idx,
            "value": elem,
            "color": "blue"
        });
    });
}

async function delay(duration) {
    return new Promise(resolve =>
        setTimeout(() => {
            resolve();
        }, duration)
    );
}

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
        .attr("x", function (d, i) { return ((1000 * d.position + 500) / initialData.length) - 10; })
        .attr("y", function (d) { return (100 - d.value) - 10; })
        .text(function (d) { return d.value; });

}

function redraw(newData) {
    sortingSVG = d3.select("#visual-container")

    var bars = sortingSVG.selectAll("g")
        .data(newData)
        .transition()
        .duration(duration)

    var rectAttrs = bars.select("rect")
        .attr("x", function (d, i) { return (d.position * 1000 / newData.length) + 1; })
        .attr("y", function (d) { return 100 - d.value; })
        .attr("width", function (d) { return parseInt(1000 / newData.length) - 2; })
        .attr("height", function (d) { return d.value; })
        .style("fill", function (d) { return d.color; });

    var lableAttrs = bars.select("text")
        .attr("x", function (d, i) { return ((1000 * d.position + 500) / newData.length) - 10; })
        .attr("y", function (d) { return (100 - d.value) - 10; })
        .text(function (d) { return d.value; });

}

async function bubbleSort() {
    for (let i = 0; i < arrayElements.length - 1; i++) {
        for (let j = 0; j < arrayElements.length - i - 1; j++) {
            changeColor(j, "red");
            changeColor(j + 1, "red");

            await delay(duration);

            if (arrayElements[j] > arrayElements[j + 1]) {
                swapElementsAtIndex(j, j + 1);
            }

            changeColor(j, "blue");
            changeColor(j + 1, "blue");
        }

        changeColor(arrayElements.length - i - 1, "green");
    }
    changeColor(0, "green");

    return arrayElements;
}

async function selectionSort() {
    for (let i = 0; i < arrayElements.length - 1; i++) {

        var minIdx = i;
        changeColor(minIdx, "yellow");

        for (let j = i + 1; j < arrayElements.length; j++) {
            if (i != minIdx) changeColor(i, "red");
            if (j != minIdx) changeColor(j, "red");

            await delay(duration);

            if (arrayElements[minIdx] > arrayElements[j]) {
                changeColor(minIdx, (minIdx == i || minIdx == j) ? "red" : "blue");
                minIdx = j;
                changeColor(minIdx, "yellow");
            }

            if (i != minIdx) changeColor(i, "blue");
            if (j != minIdx) changeColor(j, "blue");
        }

        if (minIdx != i) {
            swapElementsAtIndex(i, minIdx);
        }

        changeColor(i, "green");
    }
    changeColor((arrayElements.length - 1), "green");

    return arrayElements;
}

async function insertionSort() {
    changeColor(0, "green");
    for (let i = 1; i < arrayElements.length; i++) {
        for (let j = i; j > 0; j--) {
            if (arrayElements[j - 1] > arrayElements[j]) {
                changeColor(j - 1, "red");
                changeColor(j, "yellow");

                await delay(duration);

                swapElementsAtIndex(j - 1, j);

                changeColor(j - 1, "green");
                changeColor(j, "green");
            }
        }
        changeColor(i, "green")
    }

    return arrayElements;
}

generateSortingData();
draw(sortingData);
