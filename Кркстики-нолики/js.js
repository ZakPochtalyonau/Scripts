let n=0;
let win=1;
while(+n<+win){
    n=prompt('Размер поля',20);
    win=prompt('Условие победы',5);
    if(+n<+win){
        alert("Размеры поля меньше числа последовательных элементов для победы. Повторите ввод");
    }
}
let N=n*n;
let length = 0;
if(window.screen.width>1000){
    length = n*50;
}
if(window.screen.width<1000){
    length = n*25;
}
// document.getElementById('game').style.width=length+"px";
// document.getElementById('game').style.height=length+"px";
let hod=0;
DivHod(hod);
for(let i=0;i<n;i++){
    document.getElementById('game').innerHTML+=`<div id="${i}" class="row w-100 ml-0 mr-0"></div>`;
    for(let j=0;j<n;j++){
        document.getElementById(`${i}`).innerHTML+=`<div  class="block col p-0 border border-primary w-100 h-100 text-justify" ></div>`;    
    }
}
let block =document.getElementsByClassName('block');
let x=1, y=n;
for(let i=0;i<block.length;i++){
    if(x>n){
        x=1;
        y--;
    }
    block[i].setAttribute('posX',x);
    block[i].setAttribute('posY',y);
    block[i].setAttribute('stat',0);
    x++;
}
document.getElementById('game').onclick=function(event){
    
    if(event.target.classList.contains('block') &&  event.target.getAttribute('stat') =='0'){
        if(hod%2==0){
            event.target.setAttribute('stat','X');
            event.target.classList.add('cross');

        }else{
            event.target.setAttribute('stat','O');
            event.target.classList.add('round');
        }
        DivHod(hod-1);
        try{
        checkWinnerYline(hod-1,event.target.getAttribute('posX'));
        checkWinnerXline(hod-1,event.target.getAttribute('posY'));
        checkWinnerDiagLeft(hod-1,event.target.getAttribute('posX'),event.target.getAttribute('posY'));
        checkWinnerDiagRight(hod-1,event.target.getAttribute('posX'),event.target.getAttribute('posY'))
        }catch(err){
            //alert(err.massage);
        }
        
      hod++;     
    }
}
function DivHod(NumHod){
    if(NumHod%2==0){
       let X = document.getElementById('X');
       let O = document.getElementById('O');
       X.classList.add('btn-success');
       O.classList.remove('btn-success');
       X.classList.remove('btn-secondary');
       O.classList.add('btn-secondary');
    }else{
        let X = document.getElementById('X');
        let O = document.getElementById('O');
        O.classList.add('btn-success');
        X.classList.remove('btn-success');
        O.classList.remove('btn-secondary');
        X.classList.add('btn-secondary');
    }
}
function checkWinnerYline(NumHod,posX){
    let allblock =[];
    let count=1;
    
    for(let i=1;i<+n+1;i++){
        allblock.push(document.querySelector('[posX="'+posX+'"][posY="'+i+'"]'));
    }
  for(let i=0;i<+n-1;i++){
      if(allblock[i].getAttribute('stat') !='0'){
          if(allblock[i].getAttribute('stat') ==allblock[i+1].getAttribute('stat') ){
            count++;
            if(count==win){
                WhoWiner(NumHod);
            }
          }else{
              count=1;
          }
      }
  }
   
}
function checkWinnerXline(NumHod,posY){
    let allblock =[];
    let count=1;
    
    for(let i=1;i<+n+1;i++){
        allblock.push(document.querySelector('[posX="'+i+'"][posY="'+posY+'"]'));
    }
  for(let i=0;i<+n-1;i++){
      if(allblock[i].getAttribute('stat') !='0'){
          if(allblock[i].getAttribute('stat') ==allblock[i+1].getAttribute('stat') ){
            count++;
            if(count==win){
                WhoWiner(NumHod);
            }
          }else{
              count=1;
          }
      }
  }  
}
function checkWinnerDiagLeft(NumHod,posX,posY){
    let allblock =[];
    let count=1;
    
    while(posX!=1 && posY!=n)
    {
        posX--;
        posY++;
    }

    while(posX!=+n+1 && posY!=0)
    {
        allblock.push(document.querySelector('[posX="'+posX+'"][posY="'+posY+'"]'));
        posX++;
        posY--;
    }

  for(let i=0;i<allblock.length-1;i++){
      if(allblock[i].getAttribute('stat')  !='0'){
          if(allblock[i].getAttribute('stat') ==allblock[i+1].getAttribute('stat') ){
            count++;
            if(count==win){
                WhoWiner(NumHod);
            }
          }else{
              count=1;
          }
      }
  }  
}
function checkWinnerDiagRight(NumHod,posX,posY){
    let allblock =[];
    let count=1;
    
    while(posX!=n && posY!=n)
    {
        posX++;
        posY++;
    }

    while(posX!=0 && posY!=0)
    {
        allblock.push(document.querySelector('[posX="'+posX+'"][posY="'+posY+'"]'));
        posX--;
        posY--;
    }

  for(let i=0;i<allblock.length-1;i++){
      if(allblock[i].getAttribute('stat') !='0'){
          if(allblock[i].getAttribute('stat')==allblock[i+1].getAttribute('stat')){
            count++;
            if(count==win){
                WhoWiner(NumHod);
            }
          }else{
              count=1;
          }
      }
  }  
}

function WhoWiner(NumHod){
    if(NumHod%2==1){
        
        setTimeout(()=>{
            alert('Победили Х');
        },10);   
    }else{
        setTimeout(()=>{
            alert('Победили О');
        },10);  
    }
    location.reload();
}
