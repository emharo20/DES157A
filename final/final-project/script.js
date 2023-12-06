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

    /* VARIABLES FOR SOUND AFFECTS */
    const ding = new Audio('sounds/ding-36029.mp3');
    const flipcard = new Audio('sounds/flipcard-91468.mp3');
    const hooray = new Audio('sounds/hooray-36461.mp3');
    const negative = new Audio('sounds/negative_beeps-6008.mp3');
    const beep = new Audio('sounds/correct-2-46134.mp3');

    /* DEFINING VARIABLES NEEDED FOR THE GAME */
    const gameData = {
        deck: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        upCard: [0,0],  //determines what facing card the player gets
        downCard: 0,  //determines what downward facing card the player gets
        hitCard: [],  //empty array since no cards have been added
        value:[0, 0],  //determines what the values of the dealed cards are
        hitValue: 0,   //determines what the value of the hits cards are
        index: 0,
        stand: 0,  //variable that keeps count on how many players have standed
        gameEnd: 21,
        matchPoint: [0,0]
    };




    /* CHANGES GAME CONTROL BUTTONS AND STARTS THE GAME */
    startGame.addEventListener('click', function(event){
        event.preventDefault();

        (document.querySelector('#player1').value == "") ? (gameData.players[0] = "Player 1") : (gameData.players[0] = document.querySelector('#player1').value);

        (document.querySelector('#player2').value == "") ? (gameData.players[1] = "Player 2") : (gameData.players[1] = document.querySelector('#player2').value);

        ding.play();  //plays sound affect

        /* adds quit button and changes rules button id name */
        gameControl.innerHTML = '<button id="quit">Wanna Quit?</button> <button id="rules">Rules</button>'

        /* event listener to display the rules of blackjack */
        document.querySelector('#rules').addEventListener('click',function(){
            beep.play();  //plays sound affect
            document.querySelector('#overlay').className = "showing";
        });

        /* reloads page and ends the current game */
        document.querySelector('#quit').addEventListener('click', function(){
            location.reload();  //reloads page
        });

        getFacingCard(); //calls function
    });




    function getFacingCard(){
        for (let i=0; i<gameData.upCard.length; i++) {
            /* deals the facing card and adds it to the score */
            gameData.upCard[i] = Math.floor(Math.random()*13);  //random number bet. 0-13 generated
        };

        for (let i=0; i<gameData.score.length; i++){
            gameData.score[i] = 0;
        }

        clickCount = 0;
        gameData.stand = 0;
        
        setUpTurn();
    }

    function setUpTurn(){
        /* clearing scoring and action sections */
        scorePlace.innerHTML = '';
        actionArea.innerHTML = '';

        if(gameData.score[0] == 0){
            game.innerHTML = `<div class="dealed"> <h3 class="redplayer">${gameData.players[0]}</h3> <div><img src="images/${gameData.deck[gameData.upCard[0]]}.svg" alt="up card" class="facecard1"> <img src="images/back.svg" alt="back of card" class="back"></div> <button id="play1">play</button> </div>`;
        }
        else {
            game.innerHTML = `<div class="dealed"> <h3 class="redplayer">${gameData.players[0]}</h3> <div><img src="images/${gameData.deck[gameData.upCard[0]]}.svg" alt="up card" class="facecard"> <img src="images/back.svg" alt="back of card" class="back"></div> <button id="play1">played</button> </div>`;

            document.querySelector('#play1').style.backgroundColor = '#959595';
            document.querySelector('#play1').style.color = '#484848';
        }

        if(gameData.score[1] == 0){
            game.innerHTML += `<div class="dealed"> <h3 class="blueplayer">${gameData.players[1]}</h3> <div><img src="images/${gameData.deck[gameData.upCard[1]]}.svg" alt="up card" class="facecard"> <img src="images/back.svg" alt="back of card" class="back"></div> <button id="play2">play</button> </div>`;
        }
        else {
            game.innerHTML += `<div class="dealed"> <h3 class="blueplayer">${gameData.players[1]}</h3> <div><img src="images/${gameData.deck[gameData.upCard[1]]}.svg" alt="up card" class="facecard"> <img src="images/back.svg" alt="back of card" class="back"></div> <button id="play2" id="done2">played</button> </div>`;

            document.querySelector('#play2').style.backgroundColor = '#959595';
            document.querySelector('#play2').style.color = '#484848';
        } 

        document.querySelector('#play1').addEventListener('click', function(){
            if(gameData.score[0] == 0){
                gameData.index = 0;
                play21();
            }
            else{
                scorePlace.innerHTML = `<p>${gameData.players[0]} has already played</p>`;
            };
        });
        document.querySelector('#play2').addEventListener('click', function(){
            if(gameData.score[1] == 0){
                gameData.index = 1;
                play21();
            }
            else{
                scorePlace.innerHTML = `<p>${gameData.players[1]} has already played</p>`;
            };
        });
    };




    /* THE ACTUAL GAME */
    function play21(){
        /* deals the facing card and adds it to the score */
        gameData.value[0] = cardValues(gameData.upCard[gameData.index]); //gives value by call this function
        gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.value[0]; //adds value to current player's score

        /* deals the "downward" facing card and adds it to the score */
        gameData.downCard = Math.floor(Math.random()*13);
        gameData.value[1] = cardValues(gameData.downCard);
        gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.value[1];
        
        /* displays the dealed cards */
        game.innerHTML = `<h3 class="${(gameData.index==0)?('red'):('blue')}player" id="corner">${gameData.players[gameData.index]}</h3>`;
        game.innerHTML += `<div><h4>Cards Recieved:</h4> <img src = "images/${gameData.deck[gameData.upCard[gameData.index]]}.svg" alt = "up card"> <img src = "images/${gameData.deck[gameData.downCard]}.svg" alt = "down card"></div>`;
        scorePlace.innerHTML = `<h3>Total Points: ${gameData.score[gameData.index]}</h3>`;  //shows player's score

        /* adds playing buttons */
        actionArea.innerHTML = '<button id="hit">HIT</button> <button id="stand">STAND</button>';

        /* EVENT LISTERNER FOR HIT BUTTON */
        document.querySelector('#hit').addEventListener('click', function(){
            flipcard.play();  //plays sound affect

            hit(); //calls function

            game.innerHTML = `<h3 class="${(gameData.index==0)?('red'):('blue')}player" id="corner">${gameData.players[gameData.index]}</h3>`;
            game.innerHTML += `<div><h4>Cards Recieved:</h4> <img src = "images/${gameData.deck[gameData.upCard[gameData.index]]}.svg" alt = "up card"> <img src = "images/${gameData.deck[gameData.downCard]}.svg" alt = "down card"></div>`; //refreshes the game for each hit

            game.innerHTML += `<div><h4>Added Cards:</h4> ${hitSuit()}</div>`; //shows the added hit cards by calling a function

            scorePlace.innerHTML = `<h3>Total Points: ${gameData.score[gameData.index]}</h3>`;  //shows player's new total

            clickCount++; //increases click count

            /* CONDITION FOR WHEN PLAYER GOES OVER 21 */
            if (gameData.score[gameData.index] > gameData.gameEnd){
                negative.play();  //plays sound affect
                scorePlace.innerHTML = '<h3>Sorry! You went over 21.</h3>' //explains why game stoped
                scorePlace.innerHTML += `<h3>Total Points: ${gameData.score[gameData.index]}</h3>`;  //displays their score
                actionArea.innerHTML = '';  //clears action section so players can't hit or stand
                setTimeout(standState, 3000);  // runs function but gives time for players to prepare
            };
        });

        /* EVENT LISTENER FOR STAND BUTTON */
        document.querySelector('#stand').addEventListener('click', function(){
            beep.play();  //plays sound effect
            standState(); //calls function
        });
    };




    /* FUNCTION THATS GIVES CARDS THEIR VALUE */
                         //needs a variable to be entered into the function
    function cardValues(number){
        let value = 0; //variable that will store the value

        if(gameData.deck[number] == "K" || gameData.deck[number] == "Q" || gameData.deck[number] == "J"){
            value = 10; //condition for K, Q, J cards
        }
        else if(gameData.deck[number] == "A"){
            (gameData.score[gameData.index] < 11) ? (value = 11) : (value = 1);  //condition for A card with a condition that decides whether the value is 11 or 1
        }
        else {
            value = parseInt(gameData.deck[number]); // condition for all face value cards that converts their value from string to int
        };

        return value; //returns the value
    };




    /* FUNCTION THAT GENERATES A NEW HIT CARD */
    function hit(){
        gameData.hitCard.push(Math.floor(Math.random()*13));  //pushes new generated card into the hitCard array
        gameData.hitValue = cardValues(gameData.hitCard[clickCount]); //generates the value for the most recent generated card
        gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.hitValue; //adds the new value to the player's current score
    };




    /* FUNCTION THAT DISPLAYS THE NEW CARDS */
    function hitSuit(){
        let hitCardSuit = `<img src = "images/${gameData.deck[gameData.hitCard[0]]}.svg" alt = "hit card ${clickCount + 1}">`;  //variable that is assigned the first card of the hitCard array

        //condition that allows all the cards to be displayed together
        if(clickCount > 0){
            for (let i=0; i<clickCount; i++){
                hitCardSuit = `${hitCardSuit} <img src = "images/${gameData.deck[gameData.hitCard[i+1]]}.svg" alt = "hit card ${clickCount + 1}">`; //adds a card every time the player clicks hit
            };
        };
        return hitCardSuit;  //returns the hit card images
    };




    /* FUNCTION FOR WHEN PLAYERS STAND */
    function standState(){
        gameData.stand++;  //increases stand value

        /* condtion of what function to call depending on how many people have standed */
        if(gameData.stand === gameData.players.length){
            checkWinningCondition(); //if all players have standed, calls Winning function
        }
        else if(gameData.stand < gameData.players.length){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);  //switches players
            gameData.hitCard = [];  //emptys hit array for the next player
            clickCount = 0;  //restarts click count
            setUpTurn();  //calls function
        };
    };
    



    /* FUNCTION THAT GIVES THE WINNER */
    function checkWinningCondition(){
        /* condition for what it displays depending on who won */
                //if both players bust
        if(gameData.score[0] > gameData.gameEnd && gameData.score[1] > gameData.gameEnd){
            negative.play();  //plays sound affect
            game.innerHTML = `<h2>Both Busted</h2>`
        }
        else{
            let winner = Math.max(gameData.score[0], gameData.score[1]);  //get the greater score

                //makes sure score is 21 or below
            if(winner <= gameData.gameEnd){
                if (gameData.score[0] == gameData.score[1]){
                    game.innerHTML = `<h2>It's a Tie</h2>` //if both players have the same score
                }
                else{
                    //if both players play game correctly and are below 21
                    if(winner == gameData.score[0]){
                        game.innerHTML = `<h2>${gameData.players[0]} Wins!</h2>`;
                        gameData.matchPoint[0] = gameData.matchPoint[0] + 1;
                    } 
                    else{
                        game.innerHTML = `<h2>${gameData.players[1]} Wins!</h2>`;
                        gameData.matchPoint[1] = gameData.matchPoint[1] + 1;
                    };
                };
            }
            else{
                //condition if a player goes over 21
                winner = Math.min(gameData.score[0], gameData.score[1]);  //get the lowest score

                //displays who won based on the bust
                if(winner == gameData.score[0]){
                    game.innerHTML = `<h2>${gameData.players[0]} Wins!</h2>`;
                    gameData.matchPoint[0] = gameData.matchPoint[0] + 1;
                } 
                else{
                    game.innerHTML = `<h2>${gameData.players[1]} Wins!</h2>`;
                    gameData.matchPoint[1] = gameData.matchPoint[1] + 1;
                };
            };

            hooray.play();  //plays sound affect
        };
        
        /* displays players final score */
        scorePlace.innerHTML = '';
        const finalScore = document.createElement('div');
        finalScore.className = 'finalscore';
        scorePlace.append(finalScore);

        finalScore.innerHTML = `<p>${gameData.players[0]} score: <strong>${gameData.score[0]}</strong></p>`;
        finalScore.innerHTML += `<table> <tr><th>${gameData.players[0]}</th> <th>${gameData.players[1]}</th></tr> <tr><td>${gameData.matchPoint[0]}</td> <td>${gameData.matchPoint[1]}</td></tr> </table>`;
        finalScore.innerHTML += `<p>${gameData.players[1]} score: <strong>${gameData.score[1]}</strong></p>`;

        actionArea.innerHTML = '<button id="newmatch">Start a New Match</button>';

        document.querySelector('#newmatch').addEventListener('click', function(){
            getFacingCard();
            finalScore.remove();
        });
    };



    /* SCRIPT FOR RULES OVERLAY */
    document.querySelector('#homerules').addEventListener('click',function(){
        beep.play();  //plays sound affect
        document.querySelector('#overlay').className = "showing"; //makes rule overlay appear
    });

    document.querySelector('#close').addEventListener('click',function(event){
        event.preventDefault();
        beep.play();  //plays sound affect
        document.querySelector('#overlay').className = "hidden";  //makes rule overlay disappear      
    });

    document.addEventListener('keydown',function(event){
        if(event.key === 'Escape'){
            beep.play();  //plays sound affect
            document.querySelector('#overlay').className = "hidden";  //makes rule overlay disappear
        }        
    });
})();