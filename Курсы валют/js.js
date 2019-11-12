let Valuta1=[];
let Valuta2=[];
let Curse;
let Scale;
let OfficialRate;

$(document).ready(function(){
    
    $(".selector_fist").change(function(e){
    Valuta1.push(e.target.options[e.target.selectedIndex].value);
  });
    $(".selector_second").change(function(e){
      Valuta2.push(e.target.options[e.target.selectedIndex].value);
    });
    //ajaxRecuest(test);
    ajaxRecuest();
    //AddOption();
});

function ajaxRecuest(){
    $.ajax({
        url: "http://www.nbrb.by/API/ExRates/Rates?Periodicity=0", // адрес, на который будет отправлен запрос        
        success: function(e){ // если запрос успешен вызываем функци           
         Curse= e; // добавлем текстовое содержимое в элемент с классом .myClass
         console.log(e);
         AddOption();
        }
      });
}
function ConvertValue(){
  let sel = document.getElementsByClassName('selectors'); 
  let inp = document.getElementsByClassName('input'); 
  for(let i = 0;i<sel.length;i=i+4){
    if(sel[i].value=="BY"){
      for(let j=i+1;j<i+4;j++){
        if(sel[j].value!="BY"&&sel[j].value!="0"){
          SeachCurs(sel[j].value);
          let TempCur=inp[i].value/OfficialRate*Scale;
          inp[j].value=TempCur;
        }else{
          if(sel[j].value!="0"){
            inp[j].value=inp[i].value;
          }
          
        }
      }
    }else{
      SeachCurs(sel[i].value);
      let TempCur1=inp[i].value/Scale*OfficialRate;
      console.log(TempCur1);
      for(let j=i+1;j<i+4;j++){
        if(sel[j].value=="BY"&&sel[j].value!="0"){
          SeachCurs(sel[i].value);
          let TempCur=inp[i].value/Scale*OfficialRate;
          inp[j].value=TempCur;
        }else{
          if(sel[j].value!="0"){
          SeachCurs(sel[j].value);
          let TempCur=TempCur1/OfficialRate*Scale;
          inp[j].value=TempCur;
          }
        }
    }
  }
}
}
function SeachCurs(CursName){
  for(let i=0;i<Curse.length;i++){
    if(Curse[i].Cur_Abbreviation==CursName){
      Scale=Curse[i].Cur_Scale;
      OfficialRate=Curse[i].Cur_OfficialRate;
    }
  }
}
function AddOption(){
  let sel = document.getElementsByClassName('selectors'); 
    console.log(sel);
  for(let i=0;i<sel.length;i++){
    for(let j=0;j<Curse.length;j++){
      let op = new Option(Curse[j].Cur_Name, Curse[j].Cur_Abbreviation);
      sel[i].append(op);
    }
  } 
}
function AddInput(){
  let case_for_case= document.getElementById("case_for_case");
  let div = document.getElementById("first_input_case");
  let div2=div.cloneNode(true);
  case_for_case.append(div2);
  console.log("aaa");
}
