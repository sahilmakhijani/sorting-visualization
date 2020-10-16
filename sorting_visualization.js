const visualContainer = document.querySelector("#visual-container");

function generateBlocks(num = 20) {
    if (num && typeof num !== "number") {
        alert("First argument must be a typeof Number");
        return;
    }
    for (let i = 0; i < num; i += 1) {
        const value = Math.floor(Math.random() * 100);

        const block = document.createElement("div");
        block.classList.add("block");
        block.classList.add("block-unsorted");
        block.style.height = `${value * 3}px`;
        block.style.width = `calc((70% / ${num}) - 20px)`;
        block.style.transform = `translateX(${i * 30}px)`;

        const blockLabel = document.createElement("label");
        blockLabel.classList.add("block__id");
        blockLabel.innerHTML = value;

        block.appendChild(blockLabel);
        visualContainer.appendChild(block);
    }
}

function swap(el1, el2) {
    return new Promise(resolve => {
        const style1 = window.getComputedStyle(el1);
        const style2 = window.getComputedStyle(el2);

        const transform1 = style1.getPropertyValue("transform");
        const transform2 = style2.getPropertyValue("transform");

        el1.style.transform = transform2;
        el2.style.transform = transform1;

        // Wait for the transition to end!
        window.requestAnimationFrame(function () {
            setTimeout(() => {
                visualContainer.insertBefore(el2, el1);
                resolve();
            }, 250);
        });
    });
}

async function bubbleSort(delay = 100) {
    if (delay && typeof delay !== "number") {
        alert("sort: First argument must be a typeof Number");
        return;
    }
    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length - 1; i += 1) {
        for (let j = 0; j < blocks.length - i - 1; j += 1) {
            blocks[j].classList.remove('block-unsorted');
            blocks[j].classList.add('block-comparing');
            blocks[j + 1].classList.remove('block-unsorted');
            blocks[j + 1].classList.add('block-comparing');

            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            const value1 = Number(blocks[j].childNodes[0].innerHTML);
            const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }

            blocks[j].classList.remove('block-comparing');
            blocks[j].classList.add('block-unsorted');
            blocks[j + 1].classList.remove('block-comparing');
            blocks[j + 1].classList.add('block-unsorted');
        }

        blocks[blocks.length - i - 1].classList.remove('block-unsorted');
        blocks[blocks.length - i - 1].classList.add('block-sorted');
    }
    blocks[0].classList.remove('block-unsorted');
    blocks[0].classList.add('block-sorted');
}

async function selectionSort(delay = 100) {
    if (delay && typeof delay !== "number") {
        alert("sort: First argument must be a typeof Number");
        return;
    }
    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length - 1; i += 1) {
        let minIdx = i;
        for (let j = i + 1; j < blocks.length; j += 1) {
            blocks[minIdx].classList.remove('block-unsorted');
            blocks[minIdx].classList.add('block-comparing');
            blocks[j].classList.add('block-comparing');
            blocks[j].classList.remove('block-unsorted');

            await new Promise(resolve =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            const value1 = Number(blocks[minIdx].childNodes[0].innerHTML);
            const value2 = Number(blocks[j].childNodes[0].innerHTML);

            if (value1 > value2) {
                minIdx = j
            }

            blocks[minIdx].classList.remove('block-comparing');
            blocks[minIdx].classList.add('block-unsorted');
            blocks[j].classList.remove('block-comparing');
            blocks[j].classList.add('block-unsorted');
        }

        if (minIdx != i) {
            await swap(blocks[i], blocks[minIdx]);
            blocks = document.querySelectorAll(".block");
        }

        blocks[i].classList.remove('block-unsorted');
        blocks[i].classList.add('block-sorted');
    }
    blocks[blocks.length - 1].classList.remove('block-unsorted');
    blocks[blocks.length - 1].classList.add('block-sorted');
}

generateBlocks();
bubbleSort();
