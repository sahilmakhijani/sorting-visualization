var generate_btn = document.getElementById("block-btn");
var sorting_btn = document.getElementById("srt");

var block = document.getElementById("blocks");
var speed = document.getElementById("speed");
var options = document.getElementById("inputGroupSelect");

var isSorting = false;


function getelements(){
    let blockVal = parseInt(block.value);

    if (!(2 <= blockVal && blockVal <= 64) || blockVal == NaN) {
        alert("Enter valid number of blocks (Between 2 and 64)");
        return;
    }

    arrayElements = [];

    for(let i=0;i<blockVal;i++){
        let a = Math.floor(Math.random() * 100) + 1;
        arrayElements.push(a);
    }
    
    generateSortingData();
    draw(sortingData);
}


async function sorting(){
    if (isSorting) {
        alert("Please wait, sorting in progress!");
        return;
    }

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
