const CLUB = "/assets/cards/club/";
const DIAMOND = "/assets/cards/diamond/"
const HEART = "/assets/cards/heart/";
const SPADE = "/assets/cards/spade/";
const SPECIAL = "/assets/cards/special/"
const BACK = "/assets/cards/cardBack/card_back.png";

const gameDeck  = [];
const shuffleDeck = [];

/*Initialize card array which then needs to be shuffled*/
function initializeDeck(numberOfDecks, areJokers)
{
    let id = 0;
    let type;
    let dir;

    for(let typeOfCard = 0; typeOfCard < (4 * numberOfDecks); typeOfCard++)
    {
        /*Calculates what the current type should be even when there are more decks*/
        switch(typeOfCard % 4)
        {
            case 0:
                type = "club";
                dir = CLUB;
            break;
            case 1:
                type = "diamond";
                dir = DIAMOND;
            break;
            case 2:
                type = "heart";
                dir = HEART;
            break;
            case 3:
                type = "spade";
                dir = SPADE;
            break;
        }
        for(let numberOfCard = 1; numberOfCard <= 13; numberOfCard++)
        {
            let imageLocation = dir + numberOfCard + "_" + type + ".png";
            let cardName = numberOfCard + "_" + type;
            shuffleDeck[id] = {location: imageLocation, name: cardName};
            id++;
        }
    }

    /*Checks if there are jokers and adds them to the deck*/
    if(areJokers)
    {
        for(let currentJoker = 0; currentJoker < (2 * numberOfDecks); currentJoker++)
        {
            let imageLocation = SPECIAL + "joker.png";
            let cardName = currentJoker + "_joker";
            shuffleDeck[id] = {location: imageLocation, name: cardName};
            id++;
        }
    }
    console.log(shuffleDeck);
}

/*Places deck on the game board*/
function gameBoardDeck(numberOfPiles)
{
    shuffleArray(shuffleDeck);

    let currentPile = 0;
    let currentPosition = 0;
    let isItToDraw = false;
    let isItShown = true;
    let id = 0;

    shuffleDeck.forEach(card => {


        if(isItToDraw)
        {
            isItShown = false;
            gameDeck[id] = {
                id: id,
                image: card.location,
                name: card.name,
                isShown: isItShown,
                pile: "drawPile",
                position: currentPosition
            }
            currentPosition++;
        }
        else if(currentPile === currentPosition)
        {
            isItShown = true;
            gameDeck[id] = {
                id: id,
                image: card.location,
                name: card.name,
                isShown: isItShown,
                pile: currentPile,
                position: currentPosition
            }

            currentPile++;
            currentPosition = 0;

            if(currentPile === numberOfPiles)
            {
                isItToDraw = true;
            }
        }
        else
        {
            isItShown = false;
            gameDeck[id] = {
                id: id,
                image: card.location,
                name: card.name,
                isShown: isItShown,
                pile: currentPile,
                position: currentPosition
            }

            currentPosition++;
        }
        id++;
    });
}
/*Main function that creates game board*/
function drawMainPage(gamePiles, finalPiles)
{
    const topPart = document.getElementById("topPart");
    const bottomPart = document.getElementById("bottomPart");

    const drawPart = document.createElement('div');
    drawPart.className = "drawPart";

    const drawPile = document.createElement('div');
    drawPile.id = "drawPile";
    drawPile.className = "pile";
    drawPile.draggable = false;

    const drawnPile = document.createElement('div');
    drawnPile.id = "drawnPile";
    drawnPile.className = "pile";
    drawnPile.draggable = false;

    drawPart.append(drawPile, drawnPile);
    topPart.append(drawPart);

    for(let counter = 0; counter < gamePiles; counter++)
    {
        const pile = document.createElement('div');
        const pileId = "pile-" + counter;
        pile.className = "gamePile"
        pile.id = pileId;
        pile.draggable = false;

        bottomPart.append(pile);
    }

    const finalPart = document.createElement('div');
    finalPart.className = "finalPart";

    for(let counter = 0; counter < finalPiles; counter++)
    {
        const gamePile = document.createElement('div');
        gamePile.className = "pile";
        gamePile.draggable = false;

        switch(finalPiles)
        {
            case 4:

                switch(counter)
                {
                    case 0:
                        gamePile.id = "club";
                    break;

                    case 1:
                        gamePile.id = "diamond";
                    break;

                    case 2:
                        gamePile.id = "spade";
                    break;

                    case 3:
                        gamePile.id = "heart";
                    break;
                }

            break;
        }
        finalPart.append(gamePile);
    }

    topPart.append(finalPart);
}

/*Function that places cards on board*/
function placeDeck()
{
    const gamePiles = document.getElementsByClassName("gamePile");
    const drawPile = document.getElementById('drawPile');
    const drawnPile = document.getElementById('drawnPile');
    let isInDrawPile = false;

    for(let position = 0; position < gamePiles.length; position++)
    {
        gamePiles[position].innerHTML = 0;
    }

    gamePiles.innerHTML = "";
    drawPile.innerHTML = "";
    drawnPile.innerHTML = "";

    gameDeck.forEach(card => {
        const cardImage = document.createElement('img');
        cardImage.draggable = false;
        cardImage.id = card.id;

        if(card.pile != "drawPile" && card.pile != "drawnPile")
        {
            cardImage.className = "gameCard";

            card.isShown === true ? cardImage.src = card.image : cardImage.src = BACK;
            
            gamePiles[Number(card.pile)].append(cardImage);
        }
        else if(card.pile === "drawPile")
        {
            if(isInDrawPile === false)
            {
                cardImage.className = "card";
                cardImage.src = BACK;
                drawPile.append(cardImage);
                isInDrawPile = true;
            }
        }
        else if(card.pile === "drawnPile")
        {
            cardImage.className = "card";
            cardImage.src = card.image;
            drawnPile.append(cardImage);
        }
    });
    console.log(gameDeck);
}
/*
Source: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#JavaScript_implementation
*/
function shuffleArray(array) {
    for (let i = array.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}