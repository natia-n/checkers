const dragDrop = document.getElementById('drag-drop');
const arr1 = [0, 1, 2, 3, 4, 5, 6, 7];
const arr2 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const arrCheckers = [];
let startArrIndex = null;
let startIndex = null;
let stopArrIndex = null;
let stopIndex1 = null;
let stopIndex2 = null;
let stopKill1 = null;
let stopKill2 = null;

console.log(dragDrop);

arr1.forEach(function(element) {
    const arr = [];
    arr2.forEach(function(el) {
        arr.push(el + '-' + element);
    });
    arrCheckers.push(arr);
});

console.log(arrCheckers);

dragDrop.addEventListener('dragstart', e => {  
    if(e.target.classList.contains('figure')){
        let startID = document.getElementById(e.target.id).parentElement.id;
        console.log(startID);
        console.log(e.target.id);
        
        arrCheckers.find(function(el, ind){    
            el.find(function(element, index){
                if(element == startID){
                    startArrIndex = ind;
                    startIndex = index;                     
                }
            })
        })
        e.dataTransfer.setData('id', e.target.id); 
      
        if(e.target.classList.contains('figure-black')){
            if(stopArrIndex >= 0 && stopArrIndex < arrCheckers.length){
                stopArrIndex = startArrIndex + 1; 
                stopIndex(); 
            }                     
        } 

        if(e.target.classList.contains('figure-white')){
            if(stopArrIndex >= 0 && stopArrIndex < arrCheckers.length){
                stopArrIndex = startArrIndex - 1; 
                stopIndex(); 
            }          
        }

        if(e.target.classList.contains('figure-black')){
            if(stopArrIndex >= 0 && stopArrIndex < arrCheckers.length){
                stopArrIndex = startArrIndex + 2; 
                kill(stopArrIndex, startIndex);       
            }                  
        }  
        
        if(e.target.classList.contains('figure-white')){
            if(stopArrIndex >= 0 && stopArrIndex < arrCheckers.length){
                stopArrIndex = startArrIndex - 2; 
                kill(stopArrIndex, startIndex);       
            }                  
        }    
    }   
});

dragDrop.addEventListener("dragend", () => {
    remove();
})

function stopIndex(){   
    stopIndex1 = startIndex + 1;
    stopIndex2 = startIndex - 1;  
    if(stopIndex1 >= 0 && stopIndex1 < arrCheckers[0].length && !(document.getElementById(arrCheckers[stopArrIndex][stopIndex1]).children.length)){
        console.log(document.getElementById(arrCheckers[stopArrIndex][stopIndex1]).classList.contains('figure'));
        document.getElementById(arrCheckers[stopArrIndex][stopIndex1]).classList.add('active');
    }
    if(stopIndex2 >= 0 && stopIndex2 < arrCheckers[0].length && !(document.getElementById(arrCheckers[stopArrIndex][stopIndex2]).children.length)){
        document.getElementById(arrCheckers[stopArrIndex][stopIndex2]).classList.add('active');
    }
}

dragDrop.addEventListener("dragover", e => {  
    if(e.target.classList.contains('tile')){
        e.preventDefault(); 
    }                     
});


dragDrop.addEventListener('drop', e => {
    if(e.target.classList.contains('tile')){
        const id = e.dataTransfer.getData("id");
        console.log(id);
        const currentFigure = document.getElementById(id);
        if(currentFigure && e.target.classList.contains('black') && e.target.classList.contains('active')){
            stopID = e.target.id;
            e.target.appendChild(currentFigure); 
            remove();
        }
    }    
})

function remove(){
    document.querySelectorAll('.active').forEach(el => {
        el.classList.remove('active');
    });
    stopArrIndex = null;
    stopIndex1 = null;
    stopIndex2 = null;
    startArrIndex = null;
    startIndex = null;
}    

function  kill(stopArrIndex, startIndex){
    console.log('kill');
    stopKill1 = startIndex + 2;
    stopKill2 = startIndex - 2;    
    if(stopKill1 >= 0 && stopKill1 < arrCheckers[0].length && !(document.getElementById(arrCheckers[stopArrIndex][stopKill1]).children.length)){
        document.getElementById(arrCheckers[stopArrIndex][stopKill1]).classList.add('active');
        
    }
    if(stopKill2 >= 0 && stopKill2 < arrCheckers[0].length && !(document.getElementById(arrCheckers[stopArrIndex][stopKill2]).children.length)){
        document.getElementById(arrCheckers[stopArrIndex][stopKill2]).classList.add('active');       
    }
}