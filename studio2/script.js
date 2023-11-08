(function(){
    'use strict';

    const hotSpots = document.querySelectorAll('#container div');
    const theImg = document.querySelector('div img');
    const theContainer = document.querySelector('#container');

    hotSpots.forEach(function(eachSpot){
        eachSpot.addEventListener('click', zoomPhoto);
    });

    function zoomPhoto(event){
        const thisCorner = event.target.id;

        switch(thisCorner){
            case 'shadow': theImg.className = 'shadow'; break;
            case 'flyaways': theImg.className = 'flyaways'; break;
            case 'current': theImg.className = 'current'; break;
        }

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        theContainer.append(overlay);

        overlay.addEventListener('click', function(){
            theImg.className = "start";
            overlay.remove();
        });
    }
})();