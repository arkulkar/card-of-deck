/**
 * Created by akshata on 04-09-2018.
 */

var readline = require('readline');

/**
 * initCards function to initialise deck of cards
 */
function initCards(cards) {

    for(var i = 0; i < cards.length; i++ ){
        cards[i] = i+1;
    }
    printCards(cards);
    return cards;
}

/**
 * returns a random array index for cards array
 */
function randomIndex( arr ) {
    return Math.floor( Math.random() * arr.length );
}

/**
 * prints the cards in the deck
 * @param cards
 */
function printCards(cards) {
    console.log();
    process.stdout.write("====================")
    console.log();
    for(var i = 0; i < cards.length; i++ ){

        process.stdout.write(String(cards[i])+ ' ');

        if(i !=0 && i % 8 == 0)
            console.log();
    }
    console.log();
    process.stdout.write("====================")
    console.log();
}

/**
 * shuffles the cards in the deck and prints the shuffled deck of cards
 * @param cards
 */
function shuffleCards(cards) {

    if(!cards.length) {
        console.log("No cards remaining, please restart the process to initialize new set of cards");
        process.exit(0);
    }

    var remaining = cards.length;
    var temp;
    var idx;

    while(remaining){
        idx = Math.floor(Math.random() * remaining--);

        temp = cards[remaining];
        cards[remaining] = cards[idx];
        cards[idx] = temp;
    }
    console.log("====The shuffled cards====")
    printCards(cards);
}

/**
 * Draw a card or cards from random positions in the deck, removing the drawn
 * cards from the deck
 * @param count
 * @param cards
 */
function drawCard(count, cards) {
    if(!cards.length) {
        console.log("No cards remaining, please restart the process to initialize new set of cards");
        process.exit(0);
    }

    count || (count = 1);

    if(count === 1){
        return cards.splice(randomIndex(cards),1)[0];
    }
    var drawnCards = [];

    for (var i = 0; i < count; i++){
        drawnCards.push(cards.splice(randomIndex(cards),1)[0]);
    }

    console.log("====Drawn Cards====");
    printCards(drawnCards);
    console.log("====Remaining Cards in the Deck====");
    printCards(cards);

}

/**
 * the main implementation function which prompts user to select operations on deck of cards
 * if user chooses to draw, prompts for number of cards to be drawn
 */
exports.implementDeckofCards = function() {
    var cards = new Array(52);
    cards = initCards(cards);
    var op;
    var rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt('Do you want to shuffle or draw cards?or close?');
    rl.prompt();
    rl.on('line', function(line) {
        if (line === "shuffle") {
            shuffleCards(cards);
            rl.prompt();
        }
        else if(line === "draw") {
            rl.setPrompt('how many cards?');
            rl.prompt();
            rl.on('line', function (line) {
                drawCard(line, cards);
                rl.setPrompt('Do you want to shuffle or draw cards?or close?');
                rl.prompt();
            });
        }
        else if(line === "close"){
            process.exit(0);
        }
        rl.setPrompt('Do you want to shuffle or draw cards?or close?');

    });
};

