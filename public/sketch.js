let socket = io();
let eraseme = false;
let drawingStroke = 2;
let eraserStroke = 10;
let strokeColor = "black";
let backgroundColor = "white";


function setup() {
    createCanvas(displayWidth, displayHeight);
    background(backgroundColor);
    strokeWeight(drawingStroke);
    stroke(strokeColor);

    //socket = io.connect('http://localhost:3000');
    //socket = io.connect('https://collaborative-drawingboard.vercel.app/');
    socket.on('mouse',(data) => {
        if(data.era){
            erase(255,255);
            strokeWeight(eraserStroke);
            line(data.x, data.y, data.px, data.py);
            noErase();
        }
        else{
            strokeWeight(data.drawingStroke);
            stroke(data.strokeColor);
            line(data.x, data.y, data.px, data.py);
        }
    });
      
}

function touchMoved() {
    if(eraseme){
        erase(255,255);
        strokeWeight(eraserStroke);
        line(mouseX, mouseY, pmouseX, pmouseY);
        noErase();
    }
    else{
        strokeWeight(drawingStroke);
        stroke(strokeColor);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
    
    const data = {
        x : mouseX,
        y : mouseY,
        px : pmouseX,
        py : pmouseY,
        era: eraseme,
        drawingStroke: drawingStroke,
        strokeColor: strokeColor
    }
    
    socket.emit('mouse',data);
    return false;
    
}

const colorButtons = document.querySelectorAll('.color-button');
const penStrengthSlider = document.getElementById('pen-strength');
const eraserStrengthSlider = document.getElementById('eraser-strength');


colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Handle color button click, you can use the button's background color
        strokeColor = String(button.style.backgroundColor);
        console.log('Selected color:', button.style.backgroundColor);
    });
});

penStrengthSlider.addEventListener('input', () => {
// Handle pen strength slider change
    drawingStroke = penStrengthSlider.value;
    eraseme = false;
    console.log('Pen Strength:', penStrengthSlider.value);
});

eraserStrengthSlider.addEventListener('input', () => {
// Handle eraser strength slider change
    eraseme = true;
    eraserStroke = eraserStrengthSlider.value;
    console.log('Eraser Strength:', eraserStrengthSlider.value);
});
