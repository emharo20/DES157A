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
                text.innerHTML = "<h2>The Shadow</h2> <p>This is the quite literally the shadow of our past.My grandpa has been there for my since I was born and was basically a thrid parent for me. He raised me and guided me for all of my life and this shadow is meant to represent that past. It is supposed to reflect how he guided me in the past and how he continues to guide me in the present. It is meant to show how long we have been on this journey together and how somethings just don't change no matter how much time passes.</p>"; 
                break;
            case 'flyaways': 
                theImg.className = 'flyaways';
                text.innerHTML = '<h2>The Transformation</h2> <p>This is transformation I decided to include for the assignment. My grandpa, no longer physically present, transforms into the things I continue to see him in. I see him in every bird, as they were his favorite animal, especially to raise. I see him in the leaves and trees, as he loved nature and had a beautiful garden when I was growing up. I see in lilies, as that was his favorite flower. As he his transforming into these things, his ashes also fly away with them, continuing the symbolism that his physical form is now gone.</p>'; 
                break;
            case 'current': 
                theImg.className = 'current';
                text.innerHTML = '<h2>The Walking Silhouettes</h2> <p>This section of the piece represents our current relationship. My grandpa, who no longer being physically present, is not outline in sharpie, while I, who is physically present, is outlined with sharpie, clearly marking a new divide in our relationship. We are both walking forward, representing how life continues forward even though he is gone. As we are walking away, he has his arm around me, representing how even though he is not longer here, he will always be with me, like he has always been, even if it is in a different form.</p>'; 
                break;
        }

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        theContainer.append(overlay);

        overlay.addEventListener('click', function(){
            theImg.className = "start";
            text.innerHTML = '<h2>Overview</h2> <p>On October 16, 2020, I lost a very close family member: my grandpa, Vidal Haro. He was one of the most important people to me, and continues to be although he is no longer here. From begining to end, he was always there for me and family and was someone no one could replace. In my eyes, he was the greatest grandpa in world and I loved him with my entire heart.</p> <p>A couple months after his death, I got an assignment for DES 15 to create a piece that showed a transformation colored by the color wheel, and I created what I now call "In Loving Memory." It is a piece inspired by my relationship with my grandpa, showing both our past and our present relationship. It is a piece that is full of meaning in every corner and I would like to explain what each section signifies.</p> <h3>Click on the photo to see its explanation</h3>';
            overlay.remove();
        });
    };
})();