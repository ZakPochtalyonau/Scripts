let isDnDTypesSupported =true;
let 
dragStart =function (e) {
    let index=$(e.target).index();
    index+='';
    try{
        e.dataTransfer.setData('text/plain',index);
    }catch(ex){
        e.dataTransfer.setData('Text',index);
        isDnDTypesSupported=false;
    }

},
dropped=function (e) {
    cancel(e);

    let oldIndex;

    if(isDnDTypesSupported){
        oldIndex=
            e.dataTransfer.getData('text/plain');
    }else{
        oldIndex=
        e.dataTransfer.getData('Text');
    }
    let
        target=$(e.target),
        newIndex = target.index(),
        dropped=$(this)
                    .parent()
                    .children()
                    .eq(oldIndex);
        dropped.remove();
        if(newIndex<oldIndex){
            target.befor(dropped);
        }else{
            target.after(dropped); 
        }
},
cancel=function (e) {
    if(e.preventDefault){
        
    }
}
let items =document.querySelectorAll("#items-list>li");
items.forEach(items){
    $(item).prop('draggable',true);
    item.addEventListener('dragstart',dragStart,false);
    item.addEventListener('drop',dropped,false);
    item.addEventListener('dragenter',cancel,false);
    item.addEventListener('dragover',cancel,false);

}