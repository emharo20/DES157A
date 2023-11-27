(function(){
    'use strict';
    console.log("reading js");

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const scorePlace = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');
    let clickCount = 0;

    const gameData = {
        deck: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
        players: ['Player 1', 'Player 2'],
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
        gameControl.innerHTML = '<button id="quit">Wanna Quit?</button> <button id="rules">Rules</button>'

        document.querySelector('#quit').addEventListener('click', function(){
            location.reload();
        });
        setUpTurn();
    });

    function setUpTurn(){
        game.innerHTML = `<h2>Now Playing: ${gameData.players[gameData.index]}</h2>`;
        scorePlace.innerHTML = '';
        actionArea.innerHTML = '';
        setTimeout(play21, 3000);
    };

    function play21(){
        gameData.upCard = Math.floor(Math.random()*13);
        gameData.value[0] = cardValues(gameData.upCard);
        gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.value[0];

        gameData.downCard = Math.floor(Math.random()*13);
        gameData.value[1] = cardValues(gameData.downCard);
        gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.value[1];
        
        game.innerHTML = `<p>Cards Recieved:</p> <img src = "images/${gameData.deck[gameData.upCard]}.svg" alt = "up card"> <img src = "images/${gameData.deck[gameData.downCard]}.svg" alt = "down card">`;
        scorePlace.innerHTML = `<p>Total Points: ${gameData.score[gameData.index]}</p>`;

        actionArea.innerHTML = '<button id="hit">HIT</button> <button id="stand">STAND</button>';

        document.querySelector('#hit').addEventListener('click', function(){
            hit();
            game.innerHTML = `<p>Cards Recieved:</p> <img src = "images/${gameData.deck[gameData.upCard]}.svg" alt = "up card"> <img src = "images/${gameData.deck[gameData.downCard]}.svg" alt = "down card">`;
            game.innerHTML += `<p>Added Cards:</p> ${hitSuit()}`;
            scorePlace.innerHTML = `<p>Total Points: ${gameData.score[gameData.index]}</p>`;
            clickCount++;

            if (gameData.score[gameData.index] > gameData.gameEnd){
                game.innerHTML += '<p>Sorry! You went over 21.</p>'
                scorePlace.innerHTML = `<p>Total Points: ${gameData.score[gameData.index]}</p>`;
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
        if(gameData.score[0] && gameData.score[1] <= gameData.gameEnd){
            const winner = Math.max(gameData.score[0], gameData.score[1]);

            (winner == gameData.score[0]) ? (game.innerHTML = `<h2>${gameData.players[0]} Wins!</h2>`) : (game.innerHTML = `<h2>${gameData.players[1]} Wins!</h2>`);
        }
        else if(gameData.score[0] || gameData.score[1] > gameData.gameEnd){
            const winner = Math.min(gameData.score[0], gameData.score[1]);

            (winner == gameData.score[0]) ? (game.innerHTML = `<h2>${gameData.players[0]} Wins!</h2>`) : (game.innerHTML = `<h2>${gameData.players[1]} Wins!</h2>`);
        }
        else if(gameData.score[0] && gameData.score[1] > gameData.gameEnd){
            game.innerHTML = `<h2>Both Busted</h2>`
        }
        else if (gameData.score[0] == gameData.score[1]){
            game.innerHTML = `<h2>It's a Tie</h2>`
        };

        scorePlace.innerHTML = `<p>${gameData.players[0]} score: <strong>${gameData.score[0]}</strong></p>`;
        scorePlace.innerHTML += `<p>${gameData.players[1]} score: <strong>${gameData.score[1]}</strong></p>`;
        actionArea.innerHTML = '';
        document.querySelector('#quit').innerHTML = "Start a new game";
    };

    document.querySelector('#homerules').addEventListener('click',function(){
        document.querySelector('#overlay').className = "showing";
    });
    document.querySelector('#rules').addEventListener('click',function(){
        document.querySelector('#overlay').className = "showing";
    });

    document.querySelector('.close').addEventListener('click',function(event){
        event.preventDefault();
        document.querySelector('#overlay').className = "hidden";        
    });

    document.addEventListener('keydown',function(event){
        if(event.key === 'Escape'){
            document.querySelector('#overlay').className = "hidden";
        }        
    });
})();