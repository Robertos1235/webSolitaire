const CLUB = "/assets/cards/club/";
const DIAMOND = "/assets/cards/diamond/"
const HEART = "/assets/cards/heart/";
const SPADE = "/assets/cards/spade/";
const SPECIAL = "/assets/cards/special/"
const BACK = "/assets/cards/cardBack/card_back.png";

const gameDeck  = [];
const shuffleDeck = [];
const restartInfo = {numberOfDecks: undefined, numberOfPiles: undefined, isJoker: undefined};

const move = {id: undefined, pile:undefined, active: undefined, type: undefined};

/*
Source: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#JavaScript_implementation
*/
function shuffleArray(array) {
    for (let i = array.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/*Function that checksIfGameIsWon*/
function checkIfWon()
{
    const isShown = gameDeck.filter(card => card.isShown === true);

    if(isShown.length === gameDeck.length
    )
    {
        wonScreen();
    }
}

function restart()
{
    initializeDeck(restartInfo.numberOfDecks, restartInfo.isJoker);
    gameBoardDeck(restartInfo.numberOfPiles);
    resetMove();
    displayGamePart();
    displayDrawPart();
    displayFinalPart();  
    
    const wonScreen = document.getElementById('wonScreen');
    if(wonScreen != null)
    {
        wonScreen.remove();
    }
}

function sortDeck(array)
{
    array.sort((a,b) => a.position - b.position);
}

function roundDown(number)
{
    let retVal;
    const roundedNumber = Math.round(number)
    
    number >= roundedNumber ? retVal = roundedNumber : retVal = (roundedNumber-1);

    return retVal;
}