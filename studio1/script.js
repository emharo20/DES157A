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
            myText = "Please provide a place name."
            document.querySelector('#namePlace').focus();
        }
        else if(number == ""){
            myText = "Please provide a number."
            document.querySelector('#number').focus();
        }
        else if(name == ""){
            myText = "Please provide an name."
            document.querySelector('#name').focus();
        }
        else if(transport == ""){
            myText = "Please provide a mode of transportation."
            document.querySelector('#transport').focus();
        }
        else if(place1 == ""){
            myText = "Please provide a place."
            document.querySelector('#place1').focus();
        }
        else if(verb == ""){
            myText = "Please provide a verb."
            document.querySelector('#verb').focus();
        }
        else if(animal == ""){
            myText = "Please provide an animal."
            document.querySelector('#verb').focus();
        }
        else if(adjective == ""){
            myText = "Please provide an adjective."
            document.querySelector('#animal').focus();
        }
        else if(noun == ""){
            myText = "Please provide a noun."
            document.querySelector('#noun').focus();
        }
        else if(place2 == ""){
            myText = "Please provide a second place."
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