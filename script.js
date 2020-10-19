var generate_btn = document.getElementById("block-btn");
var sorting_btn = document.getElementById("srt");

var isSorting = false;


function getelements(){
    var block = document.getElementById("blocks");

    var blockVal = parseInt(block.value);

    if (!(1 < blockVal && blockVal <= 64) || blockVal == NaN) {
        alert("Enter valid number of blocks (Between 1 and 64)");
        return;
    }

    arrayElements = [];

    for(let i=0;i<blockVal;i++){
        let a = Math.round(Math.random()*100) + 1;
        arrayElements.push(a);
    }
    
    generateSortingData();
    draw(sortingData);
}


async function sorting(){
    if (isSorting) {
        alert("Sorting is already going on");
        return;
    }

    var speed = document.getElementById("speed");
    var options = document.getElementById("inputGroupSelect");

    let val = options.value;

    let speedVal = speed.value;
    if (speedVal == "") {
        speedVal = 1;
    }

    duration = 1 / speedVal * 400;

    isSorting = true;
    switch(val){
        case '1':
            await bubbleSort();
            break;
        case '2':
            await insertionSort();
            break;
        case '3':
            await selectionSort();
            break;
        
    }
    isSorting = false;
}


generate_btn.addEventListener("click",getelements);
sorting_btn.addEventListener("click",sorting);
