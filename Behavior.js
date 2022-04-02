var counter = 0, mosse = 7;
var numbers = [0, 1, 2, 3, 4, 5, 6, 7];
var cards = ["lightning_storm", "blue_eyes", "utopia", "impermanence"];
var elements = new Array();

function start(){
    document.getElementById("mosse").setAttribute('value', mosse);
    for(var i=0; i<8; i++){
        elements[i] = cards[Math.random*4];
    }
}

function pressed(){
    /*if(counter == 1)
        rotate_card();*/
    rotate_card("c0", "utopia");
}

function rotate_card(id, src){
    document.getElementById(id).src = "images/" + src + ".jpg"
}

//Quando hai perso fai aparire una carta (loose=black_hole win=)