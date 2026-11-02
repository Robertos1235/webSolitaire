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
            shuffleDeck[id] = {location: imageLocation, name: cardName, cardNumber: numberOfCard, type: type};
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
            name: card.name,
            isShown: isItShown,
            pile: pile,
            position: currentPosition
        };

        if(currentPile === currentPosition && !isItToDrawPile)
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
    const numberOfFinalPiles = numberOfDecks * 4;

    initializeDeck(numberOfDecks, isJoker);

    displayGameBoard(numberOfPiles, numberOfFinalPiles);

    gameBoardDeck(numberOfPiles);
    console.log(gameDeck);
    displayGamePart();

    displayDrawPart();

    mainMovement();

    drawDeck();
}