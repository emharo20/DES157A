(function(){
    'use strict';

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const scorePlace = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');
    const ace = document.querySelector('#ace');
    let clickCount = 0;

    const gameData = {
        deck: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        upCard: 0,
        downCard: 0,
        hitCard: [],
        value:[0, 0],
        hitValue: 0,
        index: 0,
        stand: 0,
        gameEnd: 21
    };

    startGame.addEventListener('click', function(){
        gameControl.innerHTML = '<button id="quit">Wanna Quit?</button>'

        document.querySelector('#quit').addEventListener('click', function(){
            location.reload();
        });
        setUpTurn();
    });

    function setUpTurn(){
        game.innerHTML = `Now Playing: ${gameData.players[gameData.index]}`;
        scorePlace.innerHTML = '';
        actionArea.innerHTML = '';
        setTimeout(play21, 3000);
        //play21();
    };

    function play21(){
        gameData.upCard = Math.floor(Math.random()*0);
        gameData.downCard = Math.floor(Math.random()*13);
        gameData.value[0] = cardValues(gameData.upCard);
        gameData.value[1] = cardValues(gameData.downCard);
        gameData.score[gameData.index] = gameData.value[0] + gameData.value[1];
        
        game.innerHTML = `<p>Cards Recieved: ${gameData.deck[gameData.upCard]} ${gameData.deck[gameData.downCard]}</p>`;
        scorePlace.innerHTML = `<p>Total Points: ${gameData.score[gameData.index]}</p>`;

        actionArea.innerHTML = '<button id="hit">Hit</button> <button id="stand">stand</button>';

        document.querySelector('#hit').addEventListener('click', function(){
            hit();
            game.innerHTML = `<p>Cards Recieved: ${gameData.deck[gameData.upCard]} ${gameData.deck[gameData.downCard]}</p>`;
            game.innerHTML += `<p>Added Cards: ${hitSuit()}</p>`;
            scorePlace.innerHTML = `<p>Total Points: ${gameData.score[gameData.index]}</p>`;
            clickCount++;

            if(gameData.score[gameData.index] > gameData.gameEnd){
                gameData.stand++;
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                game.innerHTML += `<p>Sorry! You went over 21.</p>`;
                setTimeout(setUpTurn, 3000);
            }
        });
        document.querySelector('#stand').addEventListener('click', function(){
            gameData.stand++;
            if(gameData.stand === gameData.players.length){
                checkWinningCondition();
            }
            else if(gameData.stand < gameData.players.length){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();   
            }
        });
    };

    function cardValues(number){
        let value = 0;

        if(gameData.deck[number] == "K" || gameData.deck[number] == "Q" || gameData.deck[number] == "J"){
            value = 10;
        }
        else if(gameData.deck[number] == "A"){
            if(gameData.score[gameData.index] < gameData.gameEnd){
                value = 11;
            }
            else{
                value = 1;
            }
        }
        else {
            value = parseInt(gameData.deck[number]);
        }

        return value;
    }

    /* function valueA(){
        let a = 0;
        ace.innerHTML = '<p>Value for A: <button id="one">1</button> or <button id="eleven">11</button></p>' 
        document.querySelector('#one').addEventListener('click', function(){
            a = 1;
            ace.innerHTML = '';
        });
        document.querySelector('#eleven').addEventListener('click', function(){
            a = 11;
            ace.innerHTML = '';
        });
        return a;
    } */

    function hit(){
        gameData.hitCard.push(Math.floor(Math.random()*13));
        gameData.hitValue = cardValues(gameData.hitCard[clickCount]);
        gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.hitValue;
    }

    function hitSuit(){
        let hitCardSuit = gameData.deck[gameData.hitCard[0]];
        if(clickCount > 0){
            for (let i=0; i<clickCount; i++){
                hitCardSuit = `${hitCardSuit}, ${gameData.deck[gameData.hitCard[i+1]]}`
            }
        }
        return hitCardSuit;
    }
    
    function checkWinningCondition(){
        if(gameData.score[gameData.index[0]] && gameData.score[gameData.index[1]] <= gameData.gameEnd){
            game.innerHTML = `${Math.max(gameData.players[gameData.index[0]],gameData.players[gameData.index[1]])} Wins!`;
        }

        scorePlace.innerHTML = `<p>${gameData.players[0]} score: <strong>${gameData.score[0]}</strong></p>`;
        scorePlace.innerHTML += `<p>${gameData.players[1]} score: <strong>${gameData.score[1]}</strong></p>`;
        actionArea.innerHTML = '';
        document.querySelector('#quit').innerHTML = "Start a new game";

        /* if(gameData.score[gameData.index[0]] == gameData.score[gameData.index[1]] == gameData.gameEnd){
            game.innerHTML = `<h2>It's a Tie!</h2>`;
        }
        if(gameData.score[gameData.index] < gameData.gameEnd){
            game.innerHTML = `<h2>${gameData.players[gameData.index]} won!</h2>`;
        } */
    }
})();