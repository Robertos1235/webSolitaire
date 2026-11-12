/*Initialize card array which then needs to be shuffled*/
function initializeDeck(numberOfDecks, areJokers)
{
    let id = 0;
    let type;
    let dir;
    let cardColor;

    for(let typeOfCard = 0; typeOfCard < (4 * numberOfDecks); typeOfCard++)
    {
        /*Calculates what the current type should be even when there are more decks*/
        switch(typeOfCard % 4)
        {
            case 0:
                type = "club";
                dir = CLUB;
                cardColor = "black";
            break;
            case 1:
                type = "diamond";
                dir = DIAMOND;
                cardColor = "red";
            break;
            case 2:
                type = "heart";
                dir = HEART;
                cardColor = "red";
            break;
            case 3:
                type = "spade";
                dir = SPADE;
                cardColor = "black";
            break;
        }
        for(let numberOfCard = 1; numberOfCard <= 13; numberOfCard++)
        {
            let imageLocation = dir + numberOfCard + "_" + type + ".png";
            shuffleDeck[id] = {location: imageLocation, cardNumber: numberOfCard, type: type, color: cardColor, isInFinal: false};
            id++;
        }
    }

    /*Checks if there are jokers and adds them to the deck*/
    if(areJokers)
    {
        for(let currentJoker = 0; currentJoker < (2 * numberOfDecks); currentJoker++)
        {
            let imageLocation = SPECIAL + "joker.png";
            shuffleDeck[id] = {location: imageLocation, cardNumber: null, type: "joker", color: "rainbow", isInFinal: false};
            id++;
        }
    }
}

/*Places deck on the game board*/
function gameBoardDeck(numberOfPiles)
{
    shuffleArray(shuffleDeck);

    let currentPile = 0;
    let currentPosition = 0;
    let isItToDrawPile = false;
    let isItShown = true;
    let id = 0;
    let pile;

    shuffleDeck.forEach(card => {

        if(isItToDrawPile)
        {
            isItShown = false;
            /*Adds callback id for drawPile*/
            if(pile === "drawPile")
            {
                cardBefore = id - 1;
            }
            pile = "drawPile";
        }
        else
        {
            pile = currentPile;
            currentPile === currentPosition ? isItShown = true : isItShown = false;
        }

        gameDeck[id] = {
            id: id,
            image: card.location,
            cardNumber: card.cardNumber,
            type: card.type,
            isShown: isItShown,
            pile: pile,
            position: currentPosition,
            color: card.color,
            isInFinal: card.isInFinal
        };

        if(currentPile === currentPosition 
            && !isItToDrawPile)
        {
            currentPile++;
            currentPosition = 0;

            if(currentPile === numberOfPiles)
            {
                isItToDrawPile = true;
            }
        }
        else
        {
            currentPosition++;
        }
        
        id++;
    });
}

/*Initialization*/
function init(numberOfDecks, numberOfPiles, isJoker)
{
    restartInfo.numberOfDecks = numberOfDecks;
    restartInfo.numberOfPiles = numberOfPiles;
    restartInfo.isJoker = isJoker;
    
    const numberOfFinalPiles = numberOfDecks * 4;

    initializeDeck(numberOfDecks, isJoker);

    displayGameBoard(numberOfPiles, numberOfFinalPiles, isJoker);

    gameBoardDeck(numberOfPiles);
    displayGamePart();

    displayDrawPart();

    mainMovement();

    drawDeck();

}