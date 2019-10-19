// надо создать поле
let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');
let romal_im = document.createElement('div');
document.body.appendChild(romal_im);
romal_im.classList.add('romal');

for(let i=1; i<65;i++){
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel =document.getElementsByClassName('excel');
let x=1, y=8;
for(let i=0;i<excel.length;i++){
    if(x>8){
        x=1;
        y--;
    }
    excel[i].setAttribute('posX',x);
    excel[i].setAttribute('posY',y);
    x++;
    if((x+y)%2==0){
        excel[i].style.backgroundColor="rgb(255,248,220)";
    }else{
        excel[i].style.backgroundColor="brown";  
    }
}

// постановка коня
let random= Math.round(Math.random()*63);
excel[random].classList.add('current');
excel[random].classList.add('set');
// а вдруг цыгане
let flag_romal=0;

let step=1;
excel[random].innerHTML = step;

let currentX= excel[random].getAttribute('posX');
let currentY= excel[random].getAttribute('posY');

function nextStep(){
    let vars=[document.querySelector('[posX="'+(+currentX+1)+'"][posY="'+(+currentY+2)+'"]'), 
   document.querySelector('[posX="'+(+currentX+2)+'"][posY="'+(+currentY+1)+'"]'),
   document.querySelector('[posX="'+(+currentX+2)+'"][posY="'+(+currentY-1)+'"]'),
   document.querySelector('[posX="'+(+currentX+1)+'"][posY="'+(+currentY-2)+'"]'),
   document.querySelector('[posX="'+(+currentX-1)+'"][posY="'+(+currentY-2)+'"]'),
   document.querySelector('[posX="'+(+currentX-2)+'"][posY="'+(+currentY-1)+'"]'),
   document.querySelector('[posX="'+(+currentX-2)+'"][posY="'+(+currentY+1)+'"]'),
   document.querySelector('[posX="'+(+currentX-1)+'"][posY="'+(+currentY+2)+'"]')];
   
   for(let i=vars.length-1;i>=0;i--){
       if(!vars[i]||vars[i].classList.contains('set')){
           vars.splice(i,1);
       }
   }

   let nextArr=[];
   function whatToDoNext(){
       for(let i=0;i<vars.length;i++){
           let nextX=vars[i].getAttribute('posX');
           let nextY=vars[i].getAttribute('posY');
           let nextVars =[document.querySelector('[posX="'+(nextX+1)+'"][posY="'+(+nextY+2)+'"]'), 
           document.querySelector('[posX="'+(+nextX+2)+'"][posY="'+(+nextY+1)+'"]'),
           document.querySelector('[posX="'+(+nextX+2)+'"][posY="'+(+nextY-1)+'"]'),
           document.querySelector('[posX="'+(+nextX+1)+'"][posY="'+(+nextY-2)+'"]'),
           document.querySelector('[posX="'+(+nextX-1)+'"][posY="'+(+nextY-2)+'"]'),
           document.querySelector('[posX="'+(+nextX-2)+'"][posY="'+(+nextY-1)+'"]'),
           document.querySelector('[posX="'+(+nextX-2)+'"][posY="'+(+nextY+1)+'"]'),
           document.querySelector('[posX="'+(+nextX-1)+'"][posY="'+(+nextY+2)+'"]')];           
          
                    
           for(let i=nextVars.length-1;i>=0;i--){
            if(!nextVars[i]||nextVars[i].classList.contains('set')){
                nextVars.splice(i,1);
            }
           }
         nextArr.push(nextVars.length)
        }
        return nextArr;
   }
  whatToDoNext();
   
  let k=nextArr.length;
  let min=nextArr[0];
  var index=0;
  while(k--){
    if(nextArr[k]<min){
        min=nextArr[k]
        index=k;
    }
  }
  //console.log(index);
  step++;
  
  let random_move=Math.round(Math.random()*1000);
  
  if(random_move%20==0){
      ROMAL();
      flag_romal=1;
      
     // alert("Ай На Нэ!!");
  }

  document.querySelector('.current').classList.remove('current');

  vars[index].classList.add('current');
  vars[index].classList.add('set');
  vars[index].innerHTML=step;
  currentX=vars[index].getAttribute('posX');
  currentY=vars[index].getAttribute('posY');
 
  if(step==64){
      clearInterval(interval);
      setTimeout(()=>{
            if(!flag_romal){alert("Доскакал");}
            
            document.location.reload(true);
      },500);
  }
}
let interval=setInterval(()=>{
    nextStep();
}, 200);

function ROMAL(){
    step=64;
    romal_im.style.setProperty('display','block');
    alert("АЙНАНЭ!");
}