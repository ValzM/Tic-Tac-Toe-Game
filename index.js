const ticTacCase = document.querySelectorAll('tr > td');
const whoWon = document.getElementById("whowon");
const player1Score = document.getElementById("player1score");
const player2Score = document.getElementById("player2score");
const drawScore = document.getElementById("draw");
const startGame = document.getElementById("start-game");
const resetGame = document.getElementById("reset");

//Création de la classe des joueurs

class Player{
    constructor(name,symbol,turn,color) {
        this.name = name;
        this.score = 0;
        this.turn = turn;
        this.symbol = symbol;
        this.isWinning = false;
        this.color = color;
    };
    setTurn = function(){
        this.turn = !this.turn;
    }
};

//Création des joueurs et de l'égalité

const player1 = new Player('Player 1','O',true,'#8CC0DE');
const player2 = new Player('Player 2','X',false, '#de8c8c');
let draw = 0;

//Vérification de la victoire

const win = function (case1, case2, case3,player){

   //Modification du tableau de score
   
   player1Score.innerText = `Player 1 : ${player1.score}`;
   player2Score.innerText = `Player 2 : ${player2.score}`;

   //Vérification de la victoire d'un joueur
   if (ticTacCase[case1].innerText == player.symbol && ticTacCase[case2].innerText == player.symbol && ticTacCase[case3].innerText == player.symbol  ){
    whoWon.innerText = `${player.name} won !`;
    player.score += 1;
    player.isWinning = true;
    ticTacCase[case1].style.backgroundColor = "#E0C097";
    ticTacCase[case2].style.backgroundColor = "#E0C097";
    ticTacCase[case3].style.backgroundColor = "#E0C097";
    
    endGame();
};
   
};

const victory = function (player){
    win(0,1,2,player); //Ligne 1
    win(3,4,5,player); //Ligne 2
    win(6,7,8,player); //Ligne 3
    win(0,4,8,player); //Diagonale gauche droite
    win(2,4,6,player); //Diagonale droite gauche
    win(0,3,6,player); //Colonne 1
    win(1,4,7,player); //Colonne 2
    win(2,5,8,player); //Colonne 3
};

const endGame = function(){
    ticTacCase.forEach(element => {
        element.style.pointerEvents  = "none";
    })
};

const setPlayerTurn = function (whoIsPlaying,whoIsWaiting,elCase){
    elCase.innerText = whoIsPlaying.symbol;
    elCase.style.color = whoIsPlaying.color;
    player1.setTurn();
    whoWon.innerText = `${whoIsWaiting.name} turn !`;
    elCase.style.pointerEvents = "none";
    victory(whoIsPlaying);
    victory(whoIsWaiting);
};



//Vérification de l'égalité

const verifCaseIsFull = function (){
    caseOfTicTac = [];
    ticTacCase.forEach (element => {caseOfTicTac.push(element)})
    drawScore.innerText = `Draw : ${draw}`;
    function isDraw (element) {
        return element.innerText !== "";
    };

    let caseDraw = caseOfTicTac.every(isDraw)

    if (caseDraw == true){
        draw += 1;
        whoWon.innerText = `DRAW :(`
        drawScore.innerText = `Draw : ${draw}`;
    };
};


//Fonction principale pour jouer au jeu

const playTicTacToe = function(player1, player2){
    whoWon.innerText = `${player1.name} turn !`
    ticTacCase.forEach ( element => {
        element.addEventListener ('click', 
        function(){
            if (player1.turn == true){
                setPlayerTurn(player1,player2,element);
            }else {
                setPlayerTurn(player2,player1,element);
            };
            
            if (player1.isWinning || player2.isWinning){
                null;
            }else{
                verifCaseIsFull();
            }
            
        })
        
    });
    
    
};

//Lancement du jeu

endGame();

playTicTacToe(player1, player2);
whoWon.innerText = "Press START"

startGame.addEventListener('click', function(){
    whoWon.innerText = `${player1.name} turn !`
    startGame.style.display = "none";
    resetGame.style.display = "block"
    ticTacCase.forEach(element => {
        element.style.pointerEvents = "auto";
    });
});

resetGame.addEventListener('click',function(){
    player1.isWinning = false;
    player2.isWinning = false;
    player1.turn = true;
    ticTacCase.forEach(element => {
        element.innerText = "";
        element.style.backgroundColor = "transparent";
    });
    resetGame.style.display = "none";
    startGame.style.display = "block";
    whoWon.innerText = "Press START !";
});
