var cards = ["lightning_storm", "blue_eyes", "utopia", "impermanence"];
var counter = 0, moves = 14, last_opend, win = cards.length; //last_opend saves the id of the last clicked card, win reaches 0 when the player wins

/**
 * Fuction called when the page loads.
 * Sets the number of moves and than call the setCardsAndCarousel() method.
 */
function start(){
    document.getElementById("mosse").setAttribute('value', moves);
    setCardsAndCarousel();
}

/**
 * Function called when a button is pressed.
 * If the player accidentally clicked made "counter" variable reaching 3 (when the maximum is 2)
 * the function descreas "couter" variable back to 2 and end his execution
 * (this prevents from reaching rotate_card() and checkState() and mess everything up).
 * Otherwise rotate the clicked card and if the player clicked, the 1st card the fuction saves the id of the carousel.
 * If the player clicked the 2nd card, the fuction manage the game based on if the move was right or not.
 * Await is used because StackOverflow use it :)
 * @param {int} id the id of the carousel whose button was clicked
 */
async function pressed(id){ //
    counter++;
    
    if(counter > 2){
        counter--;
        return;
    }

    rotateCard(id);
    if(counter == 1) //If the player clicked the 1st card:
        last_opend = id;
    else if(counter == 2){ //If the player clicked the 2nd card:
        if(cards[last_opend.charAt(1)] == cards[id.charAt(1)]) //If the 2 cards match:
            win--;
        else{ //If the 2 cards don't match covers them
            await sleep(1000); //await because StackOverflow use it (mezzo join)
            rotateCard(id);
            await sleep(300);
            rotateCard(last_opend);
        }
        last_opend = null;
        counter = 0;
    }
    checkState();
}

/**
 * Checks if the player lost or won, by examining "moves" and "win" variables.
 * Than if the player lost or won calls the method end().
 * end() method's parameters vary based on if the player lost or won.
 */
function checkState(){
    moves--;
    document.getElementById("mosse").setAttribute('value', moves);
    if(moves == 0 && win > 0){ //The player lost
        end("1black_hole", "YOU LOST");
    }else if(win == 0){
        end("exodia", "YOU WON");
    }
}

//To be finished
async function end(name, text){ //Deletes everything except for the title and display an image
    await sleep(1000); //Delay

    for(var i = 0; i < 2; i++) //Deletes the table and the moves counter
        document.querySelector("#table").removeChild(document.querySelector(".row"));
    document.body.removeChild(document.querySelector("#text"));
    
    var paragraph = document.createElement("p");
    paragraph.innerHTML = text;
    paragraph.style.fontSize = 40;
    paragraph.style.fontFamily = "YGO-Stone_Serif_Semibold";
    document.getElementById("title").appendChild(paragraph);
    document.getElementById("title").style.marginBottom = 10;
    document.getElementById("title").style.height = 200;

    var img = document.createElement("img");
    img.src = "images/" + name + ".jpg";
    document.body.style.textAlign = "center";
    document.body.appendChild(img);
}

/**
 * Left-slides the carousel specified by the parameter.
 * @param {string} id the id of the carousel which has to rotate.
 */
function rotateCard(id){
    $("#" + id).carousel("next");
}

/**
 * Doubles all the cards in the array and than randomically mixes their position.
 * Aftewords binds all the .jpg images at the second "img" in the carousel
 */
function setCardsAndCarousel(){ 
    for(var i = 0; i < 4; i++) //Creates all the doubles of the cards
        cards[i+4] = cards[i];

    for(var i = 0; i < cards.length; i++){ //Mixes up all the cards
        var index1 = getRandomIntInclusive(0, 7);
        var index2 = getRandomIntInclusive(0, 7);
        var temp = cards[index1];
        cards[index1] = cards[index2];
        cards[index2] = temp;
    }
    
    for(var i = 0; i < cards.length; i++) //Bind the .jpg file by changing the path of the second image
        getContainedImages("c" + i)[1].src = "images/" + cards[i] + ".jpg";
}

/**
 * Returns the 2 images of the carousel whose id is the parameter.
 * @param {string} id the id of the carousel.
 * @returns an array containing the 2 images contained in the carousel.
 */
function getContainedImages(id){
    return document.getElementById(id).querySelectorAll("button div.carousel-inner div.item img");
}

/**
 * Returns a int number between the maximum and the minimum (both included).
 * @param {int} min the minimum number which can be generated
 * @param {int} max the maximum number which can be generated
 * @returns {int} a randomic number between min and max (both included).
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

/**
 * Stops the execution of the function which called this method by the given amount of milliseconds
 * @param {int} milliseconds Number of milliseconds to wait
 */
function sleep(milliseconds) {
    return new Promise(
        resolve => setTimeout(resolve, milliseconds)
    );
}