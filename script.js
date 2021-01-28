const dragDrop = document.getElementById('drag-drop');
const arr1 = [8, 7, 6, 5, 4, 3, 2, 1];
const arr2 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const arrCheckers = [];
console.log(dragDrop);

arr1.forEach(function(element) {
    arr2.forEach(function(el) {
        arrCheckers.push(el + '-' + element);
    });
});

console.log(arrCheckers);

dragDrop.addEventListener('dragstart', e => {  
    if(e.target.tagName==='IMG'){
        e.dataTransfer.setData('id', e.target.id); 
    }   
});

dragDrop.addEventListener("dragover", e => {  
    if(e.target.tagName==='DIV'){
        e.preventDefault(); 
    }                     
});

dragDrop.addEventListener('drop', e => {
    if(e.target.tagName==='DIV'){
        const id = e.dataTransfer.getData("id");
        if(document.getElementById(id) !=null){
            e.target.appendChild(document.getElementById(id)); 
        }
    }    
})
