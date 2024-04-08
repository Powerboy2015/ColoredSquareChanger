const cells = document.querySelectorAll('.alg *');
let colors = 'col-3';

// A new grid is formed in the form of a 2d list. There is nothing special about it except it being columnized and index in a 6x6 format.
function FormGrid(length,width,list) {
    let newGrid = []

    // the length and width of the grid are mentioned at the creation of the grid and will be used to determine amount of rows and row length.
    for (let i=0; i < length; i++) {
        // between loops a empty array is created to fill with the elements gathered in the second loop.
        let row = []
        for (let j=0; j < width; j++) {

            // Currently, all elements range from a value 0 tot 35. Meaning that there is no 2D array yet.
            // To create this we reverse engineer the position of the element we want according to the loop position.
            // In this instance, I stands for the Y coordinate, and J is the X coordinate.
            // we multiply i by the width of the row so that it will start looking with an offset of 6 on forward, 
            // after the first outer loop has fishined.
            let pos = (i*width)+j;
            let element = list[pos];
            // The element is added to the row.
            row.push(element);
            // And click eventListener is added as to bind the ChangeColor function to it.
            element.addEventListener('click', () =>{
                // The ChangeColor function is given the 2Darray Y and X coordinate(i and j) and the currently selected color upon clicking. 
                ChangeColor(i,j,colors);
            });
        }
        // Once the inner loop is finished and our row Array is filled, we push it to the newgrid array.
        // and the outer loop adds +1.
        newGrid.push(row);
    }
    // Finalizing the last outer loop, we return the newGrid variable made before.
    return newGrid;
}

// I don't think async is required, but added regardless.
// from ChangeColor we are given 3 parameters. The Y and X coordinate from the array, 
// and which color to change to.
async function ChangeColor(y,x,toColor) {
    // if the element in the selected coordinate already has the correct color, it will basically return and stop the function.
    if(grid[y][x].classList.contains(toColor)) {
        return true;
    }
    // An thisColor variable is created outside the if statement scope.
    let thisColor = '';

    // Inside the if statements we check which color is currently in the element and give that color a variabel thisColor.
    if (grid[y][x].classList.contains('col-1')) {
        thisColor = 'col-1';
    } else if (grid[y][x].classList.contains('col-2')) {
        thisColor = 'col-2';
    } else {
        thisColor = 'col-3';
    }
    // The second class specifically is removed(This is the class that gives the element it's color)
    grid[y][x].classList.remove(grid[y][x].classList[1]);   
    // The color it needs to change to is added.
    grid[y][x].classList.add(toColor);

   
    // A small timeout is set to observe the spread properly.
    setTimeout(()=>{
        // the CheckSides function is called for the recently changed element.
        // with the function the following parameters are given: the Y and X coordinate of the element, The color it has changed to and the old color.
       CheckSides(y,x,toColor,thisColor);
   },100)

}
// This function checks every adjecent element from the Y and X coordinate. 
// if the color is the same as the YX element's old color, It will change their color.
function CheckSides(y,x,toColor,fromColor) {
    // A quick directions array is added to iterate through.
    let directions = ['left','right','up','down'];
    // Inside the foreach loop, a newY and newX coordinate is created. 
    // These are then offset based on the direction. 
    directions.forEach((direction, key ) => {
        let newX=x;
        let newY=y;
        switch(direction) {

            case 'left':
                newX++;
                break;

            case 'right':
                newX--;
                break;

            case 'up':
                newY++;
                break;

            case 'down':
                newY--;
                break;
        }
        // The reason this if statement is capsulated in a try catch is because of the possibility of the newY or newX being out of bounds.
        // It is only there for that reason.
        try{
            // If the element is found in the 2D array and has the color the element before it had, It's color will change.
            if (grid[newY][newX] != undefined && grid[newY][newX].classList.contains(fromColor) ) {
                ChangeColor(newY,newX,toColor);
            }
        } catch {
        }
    })
}
// For most functions present, a grid variable is established. 
// This grid variable is established here and must be established before executing the code.
let grid = FormGrid(6,6,cells);


const colorBut = document.querySelectorAll('.colors button');
const colorChoice = document.querySelector('#color div');

// The class with the corresponding color is added to the colorChoice element, and the old class is removed.
colorBut.forEach((but,key) =>{
    but.addEventListener('click',() =>{
        colors = but.classList[0];
        console.log(colors);


        colorChoice.classList.remove(colorChoice.classList);
        colorChoice.classList.add(colors);
    })
});