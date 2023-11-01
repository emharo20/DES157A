(function(){
    'use strict';

    const hotSpots = document.querySelectorAll('#container div');
    const theImg = document.querySelector('div img');

    hotSpots.forEach(function(eachSpot){
        eachSpot.addEventListener('mouseover', zoomPhoto);
        eachSpot.addEventListener('mouseout', function(){
            theImg.className = "start";
        });
    });

    function zoomPhoto(event){
        const thisCorner = event.target.id;
        //console.log(thisCorner);

        switch(thisCorner){
            case 'shadow': theImg.className = 'shadow'; break;
        }
    }
})();