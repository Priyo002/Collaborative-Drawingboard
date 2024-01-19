let socket;
let eraseme = false;

function setup() {
    createCanvas(displayWidth, displayHeight);
    strokeWeight(3);
    stroke('black');

    socket = io.connect('http://localhost:3000');
    socket.on('mouse',(data) => {
        if(data.era){
            erase(255,255);
            line(data.x, data.y, data.px, data.py);
            noErase();
        }
        else{
            line(data.x, data.y, data.px, data.py);
        }

        
        

    });
      
}

function touchMoved() {
    if(eraseme){
        erase(255,255);
        line(mouseX, mouseY, pmouseX, pmouseY);
        noErase();
    }
    else{
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
    
    const data = {
        x : mouseX,
        y : mouseY,
        px : pmouseX,
        py : pmouseY,
        era: eraseme
    }
    
    socket.emit('mouse',data);
    return false;
    
}


const e = document.getElementById('eraser');
e.addEventListener('click',(event)=>{
    console.log('Clicked');
    console.log(eraseme);
    eraseme = !eraseme;
})
