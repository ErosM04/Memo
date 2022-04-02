var cards = ["lightning_storm", "blue_eyes", "utopia", "impermanence"];
var counter = 0, moves = 14, last_opend, win = cards.length; //last_opend saves the id of the last clicked card, win reaches 0 when the player wins

function start(){
    document.getElementById("mosse").setAttribute('value', moves); //Set the number of moves
    
    for(var i = 0; i < 4; i++) //Creates all the doubles of the cards
        cards[i+4] = cards[i];

    mixCards(); //Mixes all the cards
}

async function pressed(id){ //Function called when a button is pressed, await because StackOverflow use it
    counter++;
    
    if(counter > 2) //If the player clicked the 3rd or more card for accident (this prevents from reaching rotate_card() and checkState())
        return;

    rotateCard(id, cards[id.charAt(1)]);
    if(counter == 1) //If the player clicked the 1st card:
        last_opend = id;
    else if(counter == 2){ //If the player clicked the 2nd card:
        if(cards[last_opend.charAt(1)] == cards[id.charAt(1)]) //If the 2 cards match:
            win--;
        else{ //If the 2 cards don't match covers them
            await sleep(1000); //await because StackOverflow use it (mezzo join)
            rotateCard(id, "back");
            await sleep(300);
            rotateCard(last_opend, "back");
        }
        last_opend = null;
        counter = 0;
    }
    checkState();
}

function checkState(){ //Check if the player lost or won, and than if the player lost or won perform a notification
    moves--;
    document.getElementById("mosse").setAttribute('value', moves);
    if(moves == 0 && win > 0){ //The player lost
        end("1black_hole", "YOU LOSE");
        //end("exodia");
    }else if(win == 0){
        end("exodia", "YOU WIN");
    }
}

function end(name, text){ //Delete all the bottons and display an image
    for(var i = 0; i < 2; i++)
        document.querySelector("#table").removeChild(document.querySelector(".row"));
    document.body.removeChild(document.querySelector("#text"));

    var paragraph = document.createElement("p");
    paragraph.innerHTML = text;
    document.getElementById("title").appendChild(paragraph);
    document.getElementById("title").style.marginBottom = 10;
    document.getElementById("title").style.height = 200;
    document.querySelector("p").style.font = 40;

    var img = document.createElement("img");
    img.src = "images/" + name + ".jpg";
    document.body.style.textAlign = "center";
    document.body.appendChild(img);
}

function rotateCard(id, src){
    document.getElementById(id).src = "images/" + src + ".jpg"
}

function mixCards(){ //Randomically mixes the values inside cards array
    for(var i = 0; i < cards.length; i++){
        var index1 = getRandomIntInclusive(0, 7);
        var index2 = getRandomIntInclusive(0, 7);
        var temp = cards[index1];
        cards[index1] = cards[index2];
        cards[index2] = temp;
    }
}

function getRandomIntInclusive(min, max) { //Returns a integer between the maximum and the minimum (both included)
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

function sleep(milliseconds) { //Wait for the given number of ms
    return new Promise(
        resolve => setTimeout(resolve, milliseconds)
    );
}