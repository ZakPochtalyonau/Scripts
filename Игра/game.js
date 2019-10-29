let cvs =document.getElementById("canvas");
let ctv = cvs.getContext("2d");

let bird= new Image();
let bg = new Image();
let fg = new Image();
let pipeUp =new Image();
let pipeBottom = new Image();

bird.src="pic/flappy_bird_bird.png";
bg.src="pic/flappy_bird_bg.png"
fg.src = "pic/flappy_bird_fg.png";
pipeUp.src = "pic/flappy_bird_pipeUp.png";
pipeBottom.src = "pic/flappy_bird_pipeBottom.png";
// Aodio
let fly=new Audio();
let score_audio=new Audio();

fly.src="audio/fly.mp3";
score_audio.src="audio/score.mp3"

let gap=90;
//Pos bird
let xPos=10;
let yPos=150;
let grav=1;
//Счет
let score = 0;

//Nagatie na probel
document.addEventListener("keydown",moveUp);
function moveUp(){
    yPos-=25;
    fly.play();
}
//Создание блоков
let pipe=[];
pipe[0]={
    x: cvs.width,
    y: 0 
}

function draw(){
    ctv.drawImage(bg,0,0);
    for(let i=0;i<pipe.length;i++){
        ctv.drawImage(pipeUp,pipe[i].x,pipe[i].y);
        ctv.drawImage(pipeBottom,pipe[i].x,pipe[i].y+pipeUp.height+gap);
        pipe[i].x--;
        if(pipe[i].x==100){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random()*pipeUp.height)-pipeUp.height
            });
        }
        if(xPos+bird.width>=pipe[i].x
            && xPos<=pipe[i].x+pipeUp.width
            && (yPos<=pipe[i].y+pipeUp.height
            || yPos+bird.height>=pipe[i].y+pipeUp.height+
            gap||yPos+bird.height>=cvs.height-fg.height)){
                location.reload();
            }
        if(pipe[i].x==5){
            score++;
            score_audio.play();
        }
    }
    
    ctv.drawImage(fg,0,cvs.height-fg.height);
    ctv.drawImage(bird,xPos,yPos);

    yPos+=grav;
    
    ctv.fillStyle="#000";
    ctv.font="24px Veroana";
    ctv.fillText("Счет: "+ score,10,cvs.height-20);
     requestAnimationFrame(draw);
    
}

pipeBottom.onload =draw;
