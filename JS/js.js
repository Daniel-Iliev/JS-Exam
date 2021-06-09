var numGames;
//buttons for chosing the number of games
var numGamesButtons = document.querySelectorAll("button");
var board = document.querySelector("main");
//container for the games number buttons
var nav = document.querySelector("nav");
var h1 =document.querySelector("h1");
var h2 = document.querySelector("h2");
var h3 = document.querySelector("h3");
var resetButton = document.querySelector("#reset");
//the cells of the game board
var divs = document.querySelectorAll("div");
//the field that shows the score of player X
var xResult = document.querySelector("#x");
//the field that shows the score of player O
var oResult = document.querySelector("#o");
//the table containing both scores
var scoreTable = document.querySelector("#scoreTable");
//field that shows the chosen number of games
var numGamesField = document.querySelector("#gamesNum");
var waitTime = 1500;
var initGamesNum;
var scoreNeeded;
var scoreX=0;
var scoreO=0;
//contains the current win pattern
var winType=[];
//bool determining whose turn it is (false == O,true == X)
var turn;
var gameEnd;
var turnNumber;
//the performed moves by X
var setMovesX;
//the performed moves by O
var setMovesO;
//all win patterns
var win =[
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [3,5,7]
];
//adds event listener for chosing the number of games
numGamesButtons.forEach(button => {
    button.addEventListener("click",startMatch)
});
resetButton.addEventListener("click",resetGame);

function startMatch(event){
    //resets the board
   h1.style.display="none";
   board.style.display="block";
   nav.style.display="none";
   scoreTable.style.display="block";
   h2.innerHTML=" ";
   gameEnd=false;
   turnNumber=0;
   turn=false;
   setMovesX=[];
   setMovesO=[];
   divs.forEach(div =>{
       div.innerHTML="";
       div.className="";
        div.addEventListener("click",playMove)
        resetButton.style.display="block";
    });
   turnSign();
   //checks if this is the first game
   if (event!=null) {
    initGamesNum=parseInt(event.target.innerHTML);
    scoreNeeded=parseInt(initGamesNum-initGamesNum/2+1);
   numGamesField.innerHTML = "/" + initGamesNum + "\\";
   }
}
//onclick function for each field on the board
function playMove(event){
    //adds a X or O image on the clicked field
    var image = document.createElement("img");
    if (turn) {
        image.setAttribute("src","Images/x.png")
        setMovesX.push(parseInt(event.target.id));
    }
    else{
        image.setAttribute("src","Images/o.png")
        setMovesO.push(parseInt(event.target.id));
    }
    event.target.appendChild(image);
    event.target.removeEventListener("click",playMove);
    turnNumber++;
    //game cannot be completed in less than 4 turns
    if (turnNumber>4) {
        checkWin();
    }
    //if the turns are 9 it is draw
    if (turnNumber==9&&gameEnd==false) {
        h2.innerHTML="Draw";
        h2.style.display="block";
        board.style.display="none";
        setTimeout(startMatch,waitTime);    
    }
    turn=!turn;
    turnSign();
}
//checks if the clicked fields of each player match any of the win criterias 
function checkWin(){
    win.forEach(element => {
        var matchCountX = 0;
        var matchCountO = 0;
        element.forEach(i => {
            if (setMovesX.includes(i)&&!gameEnd) {
               matchCountX++;
                if (matchCountX==3) {
                    winType=element;
                    winMatch("X");
                } 
            }
            if (setMovesO.includes(i)&&!gameEnd) {
                matchCountO++;
                if (matchCountO==3) {
                    winType=element;
                    winMatch("O");
                } 
             }
             
        });
    });
}
//displays the winner of the match and increments the score
function winMatch(winner){
    h2.innerHTML="";
    h2.style.display="block";
    resetButton.style.display = "none";
    if (winner=="X") {
        scoreX++;
        h2.innerHTML = "X wins the match";
        winType.forEach(i => {
            divs[i-1].className="win"
        });
        
    }
    else if (winner=="O") {
        scoreO++;
            h2.innerHTML = "O wins the match";
        winType.forEach(i => {
            divs[i-1].className="win"
        });
    }
    divs.forEach(div =>{
         div.removeEventListener("click",playMove);
     });
    gameEnd = true;
    xResult.innerHTML="X - " + scoreX;
    oResult.innerHTML="O - " + scoreO;
    setTimeout(checkEndGame,waitTime);
}
//changes the text showing whose turn it is
function turnSign(){
   if(!gameEnd){
        if (turn==false) {
            h3.innerHTML="Its O's turn"
        }
        if(turn==true) {
            h3.innerHTML="Its X's turn"
        }
    }
    else {
        h3.innerHTML="";
    }
}
//checks if the current match is last for the game and sets the winner
function checkEndGame(){
    if (initGamesNum>1) {
        if (scoreX>=scoreNeeded) {
            h2.innerHTML="X wins the game";
            board.style.display="none";
            resetButton.style.display = "block";
            resetButton.setAttribute("value","New Game");
        }
        else if (scoreO>=scoreNeeded) {
            h2.innerHTML="O wins the game";
            board.style.display="none";
            resetButton.style.display = "block";
            resetButton.setAttribute("value","New Game");
        }
        else{
            setTimeout(startMatch,waitTime);
        }
    }
    else{
        if (scoreX>scoreO) {
            h2.innerHTML="X wins the game";
            board.style.display="none";
            resetButton.style.display = "block";
            resetButton.setAttribute("value","New Game");
        }
        else{
            h2.innerHTML="O wins the game";
            board.style.display="none";
            resetButton.style.display = "block";
            resetButton.setAttribute("value","New Game");
        }
    }
}
//reloads the page
function resetGame(){
    location.reload();
}