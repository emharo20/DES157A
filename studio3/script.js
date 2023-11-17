(function(){
    'use strict';

    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');
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
        cardSum: 0,
        index: 0,
        gameEnd: 22
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
        play21();
    };

    function play21(){
        gameData.upCard = Math.floor(Math.random()*13);
        gameData.downCard = Math.floor(Math.random()*13);
        gameData.value[0] = cardValues(gameData.upCard);
        gameData.value[1] = cardValues(gameData.downCard);
        gameData.cardSum = gameData.value[0] + gameData.value[1];
        
        game.innerHTML += `<p>Cards Recieved: ${gameData.deck[gameData.upCard]} ${gameData.deck[gameData.downCard]}</p>`;
        game.innerHTML += `<p>Total Points: ${gameData.cardSum}</p>`;

        actionArea.innerHTML = '<button id="hit">Hit</button> <button id="stand">stand</button>'

        //console.log(gameData.hitCard);
        document.querySelector('#hit').addEventListener('click', function(){
            hit();
            game.innerHTML = `<p>Cards Recieved: ${gameData.deck[gameData.upCard]} ${gameData.deck[gameData.downCard]}</p>`;
            //game.innerHTML += `<p>Added Cards: ${gameData.deck[gameData.hitCard[clickCount]]}</p>`;
            game.innerHTML += `<p>Added Cards: ${hitSuit()}</p>`;
            game.innerHTML += `<p>Total Points: ${gameData.cardSum}</p>`;
            clickCount++;
            //console.log(gameData.hitCard);
        });
        
    };

    function cardValues(number){
        let value = 0;

        if(gameData.deck[number] == "K" || gameData.deck[number] == "Q" || gameData.deck[number] == "J"){
            value = 10;
        }
        else if(gameData.deck[number] == "A"){
            value = 1;
        }
        else {
            value = parseInt(gameData.deck[number]);
        }

        return value;
    }

    function hit(){
        gameData.hitCard.push(Math.floor(Math.random()*13));
        gameData.hitValue = cardValues(gameData.hitCard[clickCount]);
        gameData.cardSum = gameData.cardSum + gameData.hitValue;
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
    
})();