(function(){
    'use strict';
    console.log("reading js");

    /* DEFINING GAME SECTIONS FOR JS */
    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const scorePlace = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');

    let clickCount = 0; // variable to count clicks for hit button

    /* DEFINING VARIABLES NEEDED FOR THE GAME */
    const gameData = {
        deck: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        upCard: 0,  //determines what facing card the player gets
        downCard: 0,  //determines what downward facing card the player gets
        hitCard: [],  //empty array since no cards have been added
        value:[0, 0],  //determines what the values of the dealed cards are
        hitValue: 0,   //determines what the value of the hits cards are
        index: 0,
        stand: 0,  //variable that keeps count on how many players have standed
        gameEnd: 21
    };

    /* CHANGES GAME CONTROL BUTTONS AND STARTS THE GAME */
    startGame.addEventListener('click', function(){
        /* adds quit button and changes rules button id name */
        gameControl.innerHTML = '<button id="quit">Wanna Quit?</button> <button id="rules">Rules</button>'

        /* event listener to display the rules of blackjack */
        document.querySelector('#rules').addEventListener('click',function(){
            document.querySelector('#overlay').className = "showing";
        });

        /* reloads page and ends the current game */
        document.querySelector('#quit').addEventListener('click', function(){
            location.reload();
        });

        setUpTurn(); //calls function
    });

    /* WAITING ROOM FUNCTION THAT SETS UP THE PLAYERS TURN */
    function setUpTurn(){
        game.innerHTML = `<h2>Now Playing: ${gameData.players[gameData.index]}</h2>`;  //displays which player's turn it is

        /* clearing scoring and action sections */
        scorePlace.innerHTML = '';
        actionArea.innerHTML = '';

        setTimeout(play21, 3000);  //calls function but gives time for players to prepare
    };

    /* THE ACTUAL GAME */
    function play21(){
        /* deals the facing card and adds it to the score */
        gameData.upCard = Math.floor(Math.random()*13);  //random number bet. 0-13 generated
        gameData.value[0] = cardValues(gameData.upCard); //gives value by call this function
        gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.value[0]; //adds value to current player's score

        /* deals the "downward" facing card and adds it to the score */
        gameData.downCard = Math.floor(Math.random()*13);
        gameData.value[1] = cardValues(gameData.downCard);
        gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.value[1];
        
        /* displays the dealed cards */
        game.innerHTML = `<div><h3>Cards Recieved:</h3> <img src = "images/${gameData.deck[gameData.upCard]}.svg" alt = "up card"> <img src = "images/${gameData.deck[gameData.downCard]}.svg" alt = "down card"></div>`;
        scorePlace.innerHTML = `<h3>Total Points: ${gameData.score[gameData.index]}</h3>`;  //shows player's score

        /* adds playing buttons */
        actionArea.innerHTML = '<button id="hit">HIT</button> <button id="stand">STAND</button>';

        /* EVENT LISTERNER FOR HIT BUTTON */
        document.querySelector('#hit').addEventListener('click', function(){
            hit(); //calls function

            game.innerHTML = `<div><h3>Cards Recieved:</h3> <img src = "images/${gameData.deck[gameData.upCard]}.svg" alt = "up card"> <img src = "images/${gameData.deck[gameData.downCard]}.svg" alt = "down card"></div>`; //refreshes the game for each hit

            game.innerHTML += `<div><h3>Added Cards:</h3> ${hitSuit()}</div>`; //shows the added hit cards by calling a function

            scorePlace.innerHTML = `<h3>Total Points: ${gameData.score[gameData.index]}</h3>`;  //shows player's new total

            clickCount++; //increases click count

            /* CONDITION FOR WHEN PLAYER GOES OVER 21 */
            if (gameData.score[gameData.index] > gameData.gameEnd){
                scorePlace.innerHTML = '<h3>Sorry! You went over 21.</h3>' //explains why game stoped
                scorePlace.innerHTML += `<h3>Total Points: ${gameData.score[gameData.index]}</h3>`;  //displays their score
                setTimeout(standState, 3000);
            };
        });

        document.querySelector('#stand').addEventListener('click', function(){
            standState();
        });
    };

    function cardValues(number){
        let value = 0;
        if(gameData.deck[number] == "K" || gameData.deck[number] == "Q" || gameData.deck[number] == "J"){
            value = 10;
        }
        else if(gameData.deck[number] == "A"){
            (gameData.score[gameData.index] < 11) ? (value = 11) : (value = 1);
        }
        else {
            value = parseInt(gameData.deck[number]);
        };
        return value;
    };

    function hit(){
        gameData.hitCard.push(Math.floor(Math.random()*13));
        gameData.hitValue = cardValues(gameData.hitCard[clickCount]);
        gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.hitValue;
    };

    function hitSuit(){
        let hitCardSuit = `<img src = "images/${gameData.deck[gameData.hitCard[0]]}.svg" alt = "hit card ${clickCount + 1}">`;
        if(clickCount > 0){
            for (let i=0; i<clickCount; i++){
                hitCardSuit = `${hitCardSuit} <img src = "images/${gameData.deck[gameData.hitCard[i+1]]}.svg" alt = "hit card ${clickCount + 1}">`;
            };
        };
        return hitCardSuit;
    };

    function standState(){
        gameData.stand++;
            if(gameData.stand === gameData.players.length){
                checkWinningCondition();
            }
            else if(gameData.stand < gameData.players.length){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                gameData.hitCard = [];
                clickCount = 0;
                setUpTurn();  
            };
    };
    
    function checkWinningCondition(){
        if (gameData.score[0] == gameData.score[1]){
            game.innerHTML = `<h2>It's a Tie</h2>`
        }
        else if(gameData.score[0] && gameData.score[1] <= gameData.gameEnd){
            const winner = Math.max(gameData.score[0], gameData.score[1]);

            (winner == gameData.score[0]) ? (game.innerHTML = `<h2>${gameData.players[0]} Wins!</h2>`) : (game.innerHTML = `<h2>${gameData.players[1]} Wins!</h2>`);
        }
        else if(gameData.score[0] || gameData.score[1] > gameData.gameEnd){
            const winner = Math.min(gameData.score[0], gameData.score[1]);

            (winner == gameData.score[0]) ? (game.innerHTML = `<h2>${gameData.players[0]} Wins!</h2>`) : (game.innerHTML = `<h2>${gameData.players[1]} Wins!</h2>`);
        }
        else if(gameData.score[0] && gameData.score[1] > gameData.gameEnd){
            game.innerHTML = `<h2>Both Busted</h2>`
        };

        scorePlace.innerHTML = `<p>${gameData.players[0]} score: <strong>${gameData.score[0]}</strong></p>`;
        scorePlace.innerHTML += `<p>${gameData.players[1]} score: <strong>${gameData.score[1]}</strong></p>`;
        actionArea.innerHTML = '';
        document.querySelector('#quit').innerHTML = "Start a new game";
    };

    document.querySelector('#homerules').addEventListener('click',function(){
        document.querySelector('#overlay').className = "showing";
    });

    document.querySelector('#close').addEventListener('click',function(event){
        event.preventDefault();
        console.log('is this working');
        document.querySelector('#overlay').className = "hidden";        
    });

    document.addEventListener('keydown',function(event){
        if(event.key === 'Escape'){
            document.querySelector('#overlay').className = "hidden";
        }        
    });
})();