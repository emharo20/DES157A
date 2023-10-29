(function(){
    'use strict';

    const myForm = document.querySelector('#myform');
    const madLib = document.querySelector('#madlibs');

    myForm.addEventListener('submit',function(event){
        event.preventDefault();
        document.querySelector('#overlay').className = "showing";

        const namePlace = document.querySelector('#namePlace').value;
        const number = document.querySelector('#number').value;
        const name = document.querySelector('#name').value;
        const transport = document.querySelector('#transport').value;
        const place1 = document.querySelector('#place1').value;
        const verb = document.querySelector('#verb').value;
        const animal = document.querySelector('#animal').value;
        const adjective = document.querySelector('#adjective').value;
        const noun = document.querySelector('#noun').value;
        const place2 = document.querySelector('#place2').value;

        let myText = "";

        if(namePlace == ""){
            myText = '<p>Please provide a place.</p> <button class="close">close</button>';
            document.querySelector('#namePlace').focus();
        }
        else if(number == ""){
            myText = '<p>Please provide a number.</p> <button class="close">close</button>';
            document.querySelector('#number').focus();
        }
        else if(name == ""){
            myText = '<p>Please provide a name.</p> <button class="close">close</button>';
            document.querySelector('#name').focus();
        }
        else if(transport == ""){
            myText = '<p>Please provide a mode of transportation.</p> <button class="close">close</button>';
            document.querySelector('#transport').focus();
        }
        else if(place1 == ""){
            myText = '<p>Please provide a place.</p> <button class="close">close</button>';
            document.querySelector('#place1').focus();
        }
        else if(verb == ""){
            myText = '<p>Please provide a verb.</p> <button class="close">close</button>';
            document.querySelector('#verb').focus();
        }
        else if(animal == ""){
            myText = '<p>Please provide an animal.</p> <button class="close">close</button>';
            document.querySelector('#verb').focus();
        }
        else if(adjective == ""){
            myText = '<p>Please provide an adjective.</p> <button class="close">close</button>';
            document.querySelector('#animal').focus();
        }
        else if(noun == ""){
            myText = '<p>Please provide a noun.</p> <button class="close">close</button>';
            document.querySelector('#noun').focus();
        }
        else if(place2 == ""){
            myText = '<p>Please provide a second place.</p> <button class="close">close</button>';
            document.querySelector('#place2').focus();
        }
        else{
            myText = `<p>In the small town of ${namePlace}, there lived a ${number} year old girl named ${name}. She loved to ride her ${transport} all around town until she reached her favorite spot, the ${place1}. There she would ${verb} under the apple tree and play with her pet ${animal}, Buddy. She loves her ${adjective} little town and she was going to miss it so much. Soon, she would have to say goodbye to her little town as she packs up her ${noun} and leaves for ${place2}.</p>
            <button class="close">close</button>`;
            document.querySelector('#namePlace').value = '';
            document.querySelector('#number').value = '';
            document.querySelector('#name').value = '';
            document.querySelector('#transport').value = '';
            document.querySelector('#place1').value = '';
            document.querySelector('#verb').value = '';
            document.querySelector('#animal').value = '';
            document.querySelector('#adjective').value = '';
            document.querySelector('#noun').value = '';
            document.querySelector('#place2').value = '';
        }

        madLib.innerHTML = myText; 
    
        document.querySelector('.close').addEventListener('click',function(event){
            event.preventDefault();
            document.querySelector('#overlay').className = "hidden";        
        });
    
        document.addEventListener('keydown',function(event){
            if(event.key === 'Escape'){
                document.querySelector('#overlay').className = "hidden";
            }        
        });
    });
})();