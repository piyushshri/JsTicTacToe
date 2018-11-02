/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra polets will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    markCell();
    renderMainGrid();
    let winner = checkWin();
    if(winner==1){
        document.getElementsByClassName("heading").item(0).innerHTML = "You Win!";
    }
    if(winner==2){
        document.getElementsByClassName("heading").item(0).innerHTML = "Computer Wins!";
    }
    if(winner==3){
        document.getElementsByClassName("heading").item(0).innerHTML = "Match Tied!";
    }
    addClickHandlers();
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

//Marks a cell with O after the user has marked it with X
function markCell(){
    var markedCells=[];
    var cellToMark = getCellAtRandom();
    if(cellToMark)
        grid[cellToMark[0]][cellToMark[1]]=2;
}

//Get all the marked cells in an array
function getMarkedCells(grid){
    var markedCells = [];
    for(let i=0; i<GRID_LENGTH; i++){
        for(let j=0; j<GRID_LENGTH; j++){
            if(grid[i][j]==1 || grid[i][j]==2){
                markedCells.push([i,j]);
            }
        }
    }
    return markedCells;
}

//Generate an unmarked cell for the computer
function getCellAtRandom(){
    var allCells = [];
    var markedCells = getMarkedCells(grid);
    for(let i=0; i<GRID_LENGTH; i++){
        for(let j=0; j<GRID_LENGTH; j++){
            allCells.push([i,j]);
        }
    }
    for(let i=0; i<markedCells.length; i++){
        var mcElement=markedCells[i];
        const markedCell = allCells.findIndex(acElement => {
            return acElement.toString()==mcElement.toString();
        });
        if(markedCell!=-1){
            allCells.splice(markedCell, 1);
        }
    }
    return allCells[Math.floor(Math.random()*allCells.length)];
}

function checkWin(){
    var winner=0;

    //Rows
    for(let i=0; i<GRID_LENGTH; i++){
        let currentCell=-1;
        let previousCell=-1;
        for(let j=0; j<GRID_LENGTH; j++){
            currentCell = grid[i][j];
            if(j!=0){
                if(currentCell != previousCell){
                    previousCell = currentCell;
                    break;
                }
            }
            previousCell = currentCell;
            if(j==GRID_LENGTH-1 && currentCell!=0){ //Found a win
                winner = grid[i][j];
                return winner;
            }
        }
    }

    //Columns
    for(let i=0; i<GRID_LENGTH; i++){
        let currentCell=-1;
        let previousCell=-1;
        for(let j=0; j<GRID_LENGTH; j++){
            currentCell = grid[j][i];
            if(j!=0){
                if(currentCell != previousCell){
                    previousCell = currentCell;
                    break;
                }
            }
            previousCell = currentCell;
            if(j==GRID_LENGTH-1 && currentCell!=0){
                winner = grid[j][i];
                return winner;
            }
        }
    }

    //Diagonal 1
    let iD1=0;
    let jD1=0;
    let currentCellD1 = -1;
    let previousCellD1 = -1;
    while(iD1<GRID_LENGTH){
        currentCellD1 = grid[iD1][jD1];
        if(iD1!=0){
            if(currentCellD1 != previousCellD1){
                break;
            }
        }
        previousCellD1 = currentCellD1;
        if(iD1==GRID_LENGTH-1 && currentCellD1!=0){
            winner = grid[iD1][jD1];
            return winner;
        }
        iD1++;
        jD1++;
    }

    //Diagonal 2
    let iD2=0;
    let jD2=GRID_LENGTH-1;
    let currentCellD2 = -1;
    let previousCellD2 = -1;
    while(iD2<GRID_LENGTH){
        currentCellD2 = grid[iD2][jD2];
        if(iD2!=0){
            if(currentCellD2 != previousCellD2){
                break;
            }
        }
        previousCellD2 = currentCellD2;
        if(iD2==GRID_LENGTH-1 && currentCellD2!=0){
            winner = grid[iD2][jD2];
            return winner;
        }
        iD2++;
        jD2--;
    }

    //Tie
    let flag=0;
    for(let i=0; i<GRID_LENGTH; i++){
        for(let j=0; j<GRID_LENGTH; j++){
            if(grid[i][j] == 0){
                flag=1;
                break;
            }
            if(i==GRID_LENGTH-1 && j==GRID_LENGTH-1){
                return 3;
            }
        }
        if(flag==1) break;
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
