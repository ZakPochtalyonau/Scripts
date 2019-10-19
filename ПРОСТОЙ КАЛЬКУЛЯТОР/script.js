 function insert(num){
    let value =document.querySelector('.textview');                
    value.value=value.value+num;
    console.log(value.value);
}
function equal(){
    let exp =document.querySelector('.textview');
    if(exp.value){
        exp.value=eval(exp.value);
    }
    
}
function remove(){    
    let exp = document.querySelector('.textview');
    if(exp.value){
        exp.value="";
        //document.form.texrview.value=0;
        console.log(exp.value);
    }
}
function del(){
    let exp =document.querySelector('.textview');
    let value=exp.value;
   console.log(value);
    if(value){
        value=value.substring(0,value.length-1);
        console.log(value);
    }
    exp.value=value;
}

window.addEventListener('keydown',function(e){
    if(e.keyCode==13){
        equal();
    } 
});