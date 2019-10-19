let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for(let i=1;i<101;i++){
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x=1;
let y=10;

for(let i=0;i<excel.length;i++){
    if(x>10){
        x=1;
        y--;
    }
    excel[i].setAttribute('posX',x);
    excel[i].setAttribute('posY',y);
    x++;
   
}

let coordinates = generateSnake();
let snakeBody=[document.querySelector('[posX="'+coordinates[0]+'"][posY="'+coordinates[1]+'"]')]; 
for (let i=1;i<snakeBody.length;i++){
    snakeBody[i].classList.add('snakebody');
}
snakeBody[0].classList.add('head');

let mouse;
createMouse();

let direction='right';
let steps= false;

let input= document.createElement('input');
document.body.appendChild(input);
input.style.cssText=`
    margin: auto;
    magin-top: 40px;
    font-size: 20px;
    display: block
`;
let score=0;
input.value=`Ваши очки: ${score}`;

let intervar =setInterval(move,300);

window.addEventListener('keydown',function(e){
    if(e.keyCode==37 && direction != 'right' && steps){
        direction= 'left';
        steps=false;
    }else if(e.keyCode==38&& direction != 'down' && steps){
        direction='up';
        steps=false;
    }else  if(e.keyCode==39&& direction != 'left' && steps){
        direction='right';
        steps=false;
    }else if(e.keyCode==40 && direction != 'up' && steps){
        direction='down';
        steps=false;
    }
});

function generateSnake(){
    let posx =Math.round(Math.random()*(10-1)+1)
    let posy =Math.round(Math.random()*(10-1)+1)
    return [posx,posy];
}

function createMouse(){
    function generateMouse(){
        let posx =Math.round(Math.random()*(10-1)+1);
        let posy =Math.round(Math.random()*(10-1)+1);
        return [posx,posy];
    }
    let mouseCoordinates = generateMouse();
    
    mouse=document.querySelector('[posX="'+mouseCoordinates[0]+'"][posY="'+mouseCoordinates[1]+'"]'); 
    

     while(mouse.classList.contains("snakebody")){
        let mouseCoordinates = generateMouse();
        mouse=document.querySelector('[posX="'+mouseCoordinates[0]+'"][posY="'+mouseCoordinates[1]+'"]'); 
    }   
    mouse.classList.add('mouse');
}

function move(){
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'),snakeBody[0].getAttribute('posY')];
    
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length-1].classList.remove('snakebody');
    snakeBody.pop();
    
    if(direction=='right'){
        if(snakeCoordinates[0]<10){
            snakeBody.unshift(document.querySelector('[posX="'+(+snakeCoordinates[0]+1)+'"][posY="'+snakeCoordinates[1]+'"]'));
        }else{
            snakeCoordinates[0]=0;
            snakeBody.unshift(document.querySelector('[posX="'+(+snakeCoordinates[0]+1)+'"][posY="'+snakeCoordinates[1]+'"]'));
        }  
        
    }else if(direction=='left'){
        if(snakeCoordinates[0]>1){
            snakeBody.unshift(document.querySelector('[posX="'+(+snakeCoordinates[0]-1)+'"][posY="'+snakeCoordinates[1]+'"]'));
        }else{
            snakeCoordinates[0]=10;
            snakeBody.unshift(document.querySelector('[posX="'+(+snakeCoordinates[0]-1)+'"][posY="'+snakeCoordinates[1]+'"]'));
        }  
        
    } else if(direction=='up'){
        if(snakeCoordinates[1]<10){
            snakeBody.unshift(document.querySelector('[posX="'+snakeCoordinates[0]+'"][posY="'+(+snakeCoordinates[1]+1)+'"]'));
        }else{
            snakeCoordinates[1]=0;
            snakeBody.unshift(document.querySelector('[posX="'+(+snakeCoordinates[0])+'"][posY="'+(+snakeCoordinates[1]+1)+'"]'));
        }  
        
    }else if(direction=='down'){
        if(snakeCoordinates[1]>1){
            snakeBody.unshift(document.querySelector('[posX="'+snakeCoordinates[0]+'"][posY="'+(+snakeCoordinates[1]-1)+'"]'));
        }else{
            snakeCoordinates[1]=10;
            snakeBody.unshift(document.querySelector('[posX="'+(+snakeCoordinates[0])+'"][posY="'+(+snakeCoordinates[1]-1)+'"]'));
        }  
        
    }
    
    if(snakeBody[0].getAttribute('posX')==mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY')==mouse.getAttribute('posY') ){
        mouse.classList.remove('mouse');
        let lastElemX=snakeBody[snakeBody.length-1].getAttribute('posX');
        let lastElemY=snakeBody[snakeBody.length-1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX="'+lastElemX+'"][posY="'+lastElemY+'"]'));
        createMouse();
        score++;
        input.value=`Ваши очки: ${score}`;
    }
     
    if(snakeBody[0].classList.contains('snakebody')){
        setTimeout(()=>{
            alert("Game Over");
        },200);
        clearInterval(intervar);
        snakeBody[0].style.background='red';
        
         
    }
    snakeBody[0].classList.add('head');
     for(let i=1;i<snakeBody.length;i++){
        snakeBody[i].classList.add('snakebody');
    }
    
    steps= true;
        
}
