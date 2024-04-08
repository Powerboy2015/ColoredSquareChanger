// This is the code used to create the random squares. 
// I have kept my square generation seperate as it is not really part of the exercise.

const body = document.querySelector('div.alg');


function randomNUm(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

// making the cells and colors random.
const cellList = [];
for(i=0; i !=6; i++) {
    for(j=0; j!=6; j++) {
        let cell = document.createElement('div');
        let num = randomNUm(1,3);
        cell.classList.add('cell');
        cell.classList.add('col-' + num);
        body.appendChild(cell);   
    }
}