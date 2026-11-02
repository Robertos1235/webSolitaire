const CLUB = "/assets/cards/club/";
const DIAMOND = "/assets/cards/diamond/"
const HEART = "/assets/cards/heart/";
const SPADE = "/assets/cards/spade/";
const SPECIAL = "/assets/cards/special/"
const BACK = "/assets/cards/cardBack/card_back.png";

const gameDeck  = [];
const shuffleDeck = [];

const move = {id: undefined, active: undefined};

/*
Source: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#JavaScript_implementation
*/
function shuffleArray(array) {
    for (let i = array.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}