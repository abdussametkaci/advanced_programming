"use strict"
let steps = [] // moving steps
let n = 4 // number of disk
let colum = { "A": n, "B": 0, "C": 0 } // default
// disk objects
let disks = [
    {
        "disk": 1,
        "color": "yellow",
        "destinations": {
            "A": [70, 210, 40, 10],
            "B": [200, 210, 40, 10],
            "C": [330, 210, 40, 10]
        }
    },
    {
        "disk": 2,
        "color": "red",
        "destinations": {
            "A": [60, 210, 60, 10],
            "B": [190, 210, 60, 10],
            "C": [320, 210, 60, 10]
        }
    },
    {
        "disk": 3,
        "color": "blue",
        "destinations": {
            "A": [50, 210, 80, 10],
            "B": [180, 210, 80, 10],
            "C": [310, 210, 80, 10]
        }
    },
    {
        "disk": 4,
        "color": "green",
        "destinations": {
            "A": [40, 210, 100, 10],
            "B": [170, 210, 100, 10],
            "C": [300, 210, 100, 10]
        }
    }

]

// hanoi algorithm
function hanoi(n, source, auxiliary, destination) {
    if (n == 1) {
        console.log("Move disk:", n, "from", source, "to", destination)
        steps.push({ "disk": n, "from": source, "destination": destination })
    }
    else {
        hanoi(n - 1, source, destination, auxiliary);
        console.log("Move disk:", n, "from", source, "to", destination);
        steps.push({ "disk": n, "from": source, "destination": destination })
        hanoi(n - 1, auxiliary, source, destination);
    }
}

// draw columns and floors
function drawRect() {
    let canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = "black";
        //Draw a border
        ctx.strokeRect(3, 20, 450, 300);
        //Draw A column
        ctx.fillRect(85, 120, 10, 100);
        ctx.fillRect(30, 220, 120, 13);
        ctx.font = "30px Arial";
        ctx.fillText("A", 80, 100);
        //Draw B column
        ctx.fillRect(215, 120, 10, 100);
        ctx.fillRect(160, 220, 120, 13);
        ctx.fillText("B", 210, 100);
        //Draw C column
        ctx.fillRect(345, 120, 10, 100);
        ctx.fillRect(290, 220, 120, 13);
        ctx.fillText("C", 340, 100);

    }
}

// dwrawing disk object for wanting color
function drawObj(x, y, width, height, color) {
    let canvas = document.getElementById(color);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
}

// move disk from source to destination
function move(d, from, to) {
    let disk = disks[(4 - n) + (d - 1)] // select disk
    let color = disk["color"]
    clear(color) // delete that disk
    //drawObj(...disk["destinations"][to], color)
    let a = [...disk["destinations"][to]] // get disk destinations
    a[1] -= colum[to] * 10 // axis y (a[1]) decrease 10px
    drawObj(...a, color) // drwing disk for new coordinates
    colum[from]-- // decrease number of disk in source
    colum[to]++ // increase number of disk in destination
}

// clear canvas object
function clear(disk) {
    let canvas = document.getElementById(disk);
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.clearRect(3, 20, 450, 300);
        ctx.fillStyle = "white";
    }
}

function clearAll() {
    clear("canvas")
    for (let disk of disks) clear(disk["color"])
}

let i = 0 // index for nth step
let simulation // reference to simulation
function nextStep() {
    if (i == steps.length - 1) { // if simulation or steps is done
        stop(simulation)    // stop simulation
        popup_message() // and show message
        return
    }
    // otherwise continue to moving disk
    move(steps[i]["disk"], steps[i]["from"], steps[i]["destination"])
    i++
}

// reset according to number of disk
function reset() {
    btn_simulate.innerHTML = "Simulate"
    clearAll()
    drawRect()
    drawObj(70, 180, 40, 10, "yellow")
    drawObj(60, 190, 60, 10, "red")
    drawObj(50, 200, 80, 10, "blue")
    drawObj(40, 210, 100, 10, "green")
    stop(simulation)
    i = 0
    colum = { "A": n, "B": 0, "C": 0 }
    steps = []
    hanoi(n, 'A', 'B', 'C')
    console.log("array of steps")
    console.log(steps)
    // show disk
    for (let index = 1; index <= 4; index++) {
        let canvas = document.getElementById(disks[index - 1]["color"])
        canvas.style.display = "inline"
    }

    // not show disk
    for (let index = 1; index <= 4 - n; index++) {
        let canvas = document.getElementById(disks[index - 1]["color"])
        canvas.style.display = "none"
    }
}

function simulate() {
    simulation = setInterval(nextStep, 1000)
}

function stop(simulation) {
    clearInterval(simulation)
}

// run the simulation
function run() {
    if (btn_simulate.innerHTML == 'Simulate') {
        btn_simulate.innerHTML = "Stop"
        simulate()
    } else {
        btn_simulate.innerHTML = "Simulate"
        stop(simulation)
    }
}

// get number of disk
function numberOfDisk() {
    n = Number(document.getElementById("mySelect").value)
    reset()
}

// show message
function popup_message() {
    message_score.innerText = "Number of Moves: " + (Math.pow(2, n) - 1)
    popup()
}

var popup = () => message_box.style.display = "block";

closebtn.onclick = () => {
    message_box.style.display = 'none'
    reset()
}

mySelect.onchange = () => numberOfDisk()

btn_reset.onclick = () => reset()

btn_next.onclick = () => nextStep()

btn_simulate.onclick = () => run()

reset()
