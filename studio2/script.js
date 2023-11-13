(function(){
    'use strict';

    const hotSpots = document.querySelectorAll('#container div');
    const theImg = document.querySelector('div img');
    const theContainer = document.querySelector('#container');
    const text = document.querySelector('#explain');

    hotSpots.forEach(function(eachSpot){
        eachSpot.addEventListener('click', zoomPhoto);
        
    });

    function zoomPhoto(event){
        const thisCorner = event.target.id;

        switch(thisCorner){
            case 'shadow': 
                theImg.className = 'shadow';
                text.innerHTML = '<h2>The Shadow</h2> <p>explaining what the shadow signifies</p>'; 
                break;
            case 'flyaways': 
                theImg.className = 'flyaways';
                text.innerHTML = '<h2>The Transformation</h2> <p>explaning what the flyaways signifies</p>'; 
                break;
            case 'current': 
                theImg.className = 'current';
                text.innerHTML = '<h2>The Walking Silhouettes</h2> <p>explaining what the silhouettes mean</p>'; 
                break;
        }

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        theContainer.append(overlay);

        overlay.addEventListener('click', function(){
            theImg.className = "start";
            text.innerHTML = '<h2>Overview</h2> <p>On October 16, 2020, I lost on of the most important people to me: my grandfather, Vidal Haro.</p>';
            overlay.remove();
        });
    };
})();