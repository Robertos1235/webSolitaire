/*Implements the logic for drawing cards from a drawDeck*/
function drawDeck()
{
    const drawPile = document.getElementById('drawPile')
    const drawnPile = document.getElementById('drawnPile')

    drawPile.addEventListener('click', event => {
        const image = event.target.closest('img');
        const drawPileIcon = event.target.closest('span');
        if(image != undefined)
        {
            if(image.id != "reDraw")
            {
                if(move.active)
                {
                    resetMove();
                }
                gameDeck[image.id].pile = 'drawnPile';
                gameDeck[image.id].isShown = true;
                let id = image.id;
                id = gameDeck.find(card => card.id == id);
                displayDrawPart();
            }
            
        }
        else if(drawPileIcon != undefined)
        {
            const deck = gameDeck.filter(card => card.pile === "drawnPile");

            for(let position = 0; position < deck.length; position++)
            {
                gameDeck[deck[position].id].pile = "drawPile";
                gameDeck[deck[position].id].isShown = false;
            }
                
            displayDrawPart();

        }
    });
}
/*Implements main movement for the board*/
function mainMovement()
{
    const gameBoard = document.getElementById('gameBoard');

    gameBoard.addEventListener('click', event =>{

        const image = event.target.closest('img');
        const pile = event.target.closest('div');

        if(image != undefined 
            && pile != undefined)
        {
            const isPossible = gameDeck[image.id].isShown;

            if(!move.active 
                && isPossible
                    && pile.id != "jokerPile")
            {
                setMove(image);
            }
            else if(move.active 
                && isPossible 
                    && pile.id != "drawnPile" 
                        && pile.id != "jokerPile"
                            && move.type != "joker"
            )
            {
                if(gameDeck[image.id].color != "rainbow")
                {
                    if(gameDeck[move.id].color != "rainbow"
                        && (!checkIfFirst(move.id) || gameDeck[move.id].pile != "drawnPile")
                    )
                    {
                        const isOverlapPossible = checkIfOverlapIsPossible(image.id, gameDeck[image.id].isInFinal);
                        if(gameDeck[image.id].isInFinal && isOverlapPossible)
                        {
                            const pileTarget = gameDeck[image.id].pile;
                            const position = getLastPosition(pileTarget) + 1;
                            moveTo(position, pileTarget);
                            gameDeck[move.id].isInFinal = true;
                            resetMove();
                            checkIfWon();
                            displayFinalPart();
                        }
                        else if(!gameDeck[image.id].isInFinal && isOverlapPossible)
                        {
                            const pileTarget = gameDeck[image.id].pile;
                            const position = getLastPosition(pileTarget) + 1;
                            moveTo(position, pileTarget);
                            resetMove();
                            checkIfWon();
                            displayFinalPart();
                        }
                    }
                    else
                    {
                        if(gameDeck[image.id].cardNumber != 1)
                        {
                            const pileTarget = gameDeck[image.id].pile;
                            const position = getLastPosition(pileTarget) + 1;
                            gameDeck[image.id].color === "red" ? gameDeck[move.id].color = "black" : gameDeck[move.id].color = "red";
                            gameDeck[move.id].cardNumber = gameDeck[image.id].cardNumber + - 1;
                            moveTo(position, pileTarget);
                            resetMove();
                            checkIfWon();
                            displayFinalPart();
                        }
                        else
                        {
                            resetMove();
                        }
                    }
                    
                }
                else
                {
                    if(gameDeck[move.id].cardNumber != 1)
                    {
                        const pileTarget = gameDeck[image.id].pile;
                        const position = getLastPosition(pileTarget) + 1;
                        gameDeck[move.id].color === "red" ? gameDeck[image.id].color = "black" : gameDeck[image.id].color = "red";
                        gameDeck[image.id].cardNumber = gameDeck[move.id].cardNumber + 1;
                        moveTo(position, pileTarget);
                        resetMove();
                        checkIfWon();
                        displayFinalPart();
                    }
                    else
                    {
                        resetMove();
                    }
                }
                
                
            }
            else
            {
                resetMove();
            }
        }
        else if(pile != undefined 
            && move.active)
        {
            if(checkIfFinalPile(pile.id))
            {
                if((checkIfFirst(move.id) || gameDeck[move.id].pile === "drawnPile") 
                    && checkIfIsNextCard(pile))
                {
                    movement(move.id, (getLastPosition(pile.id) + 1), pile.id);
                    gameDeck[move.id].isInFinal = true;
                    resetMove();
                    displayFinalPart();
                }
                else
                {
                    resetMove();
                }
            }
            else if(pile.id === "jokerPile" && gameDeck[move.id].type === "joker" && checkIfFirst(move.id))
            {
                movement(move.id, (getLastPosition(pile.id) + 1), "jokerPile"); 
                resetMove();
                displayJokerPile();
                displayDrawPart();
            }
            else
            {
                if(gameDeck[move.id].cardNumber === 13 && (getLastPosition(translatePile(pile.id)) + 1) === 0)
                {
                    moveTo(0, translatePile(pile.id));
                    resetMove();
                    checkIfWon();
                }
                else
                {
                    resetMove();
                }
            }
        }
        else
        {
            resetMove();
        }
    });
}
/*Set the move array + add active class*/
function setMove(image)
{
    const card = document.getElementById(image.id);
    move.id = image.id;
    move.active = true;
    move.pile = gameDeck[image.id].pile
    card.classList.add("active");
    if(move.pile === "drawnPile")
    {
        move.type = "drawnPile";
    }
}
/*Resets the move array + disables active class*/
function resetMove()
{
    if(move.id != null)
    {
        const card = document.getElementById(move.id);  
        card.classList.remove("active");

        if(move.type === "drawnPile")
        {
            displayDrawPart();
        }
        else if(move.type === "finalPart")
        {
            displayFinalPart();
        }

        move.active = false;
        move.id = null;
        move.type = null;
        move.pile = null;
        displayGamePart();
    }
}
function moveTo(position, pile)
{
    const cardPile = gameDeck.filter(card => card.position >= gameDeck[move.id].position && card.pile === gameDeck[move.id].pile);

    sortDeck(cardPile);

    cardPile.forEach(card => {
        movement(card.id, position, pile);
        position++;
    });
}
/*Basic function that just moves the card to specified position*/
function movement(id, position, pile)
{
    gameDeck[id].pile = pile;
    gameDeck[id].position = position;
    if(gameDeck[id].isInFinal)
    {
        gameDeck[id].isInFinal = false;
    }
}

/*Get the last position in specified pile*/
/*Input: number of the pile starting on 0-x*/
function getLastPosition(pile)
{
    const copyDeck = gameDeck.filter(card => card.pile === pile);
    const position = copyDeck.length - 1;
    
    return position;
}

/*Check if a card is the first in the pile*/
function checkIfFirst(id)
{
    let retVal;

    if(getLastPosition(gameDeck[id].pile) === gameDeck[id].position)
    {
        retVal = true;
    }
    else
    {
        retVal = false;
    }

    return retVal;
}

/*Check if pile is final*/
function checkIfFinalPile(pile)
{
    let retVal;
    const pileName = pile.split("-");

    if(pileName[0] === "spade" 
        || pileName[0] === "diamond"
            || pileName[0] === "heart"
                || pileName[0] === "club")
    {
        retVal = true;
    }
    else
    {
        retVal = false;
    }

    return retVal;
}

/*Check if the number is next for the final pile*/
function checkIfIsNextCard(pile)
{
    let retVal = false;
    const pileName = pile.id.split("-");

    if(gameDeck[move.id].type === pileName[0])
    {
        const cardsInPile = gameDeck.filter(card => card.pile === pile.id);

        if(cardsInPile.length != 0)
        {
            sortDeck(cardsInPile);
            const lastCardNumber = cardsInPile[(cardsInPile.length - 1)].cardNumber;
            if(gameDeck[move.id].cardNumber === (lastCardNumber + 1))
            {
                retVal = true;
            }
        }
        else
        {
            if(gameDeck[move.id].cardNumber === 1)
            {
                retVal = true;
            }
        }
    }
    
    return retVal;
}

/*Translates id of pile for div to usable number id*/
function translatePile(pile)
{
    let retVal;

    retVal = pile.split("-");

    return Number(retVal[1]);
}

function checkIfOverlapIsPossible(targetId, isInFinal)
{
    let retVal;
    let compareNumber;

    const targetCard = {type: gameDeck[targetId].type, cardNumber: gameDeck[targetId].cardNumber, cardColor: gameDeck[targetId].color};
    const moveCard = {type: gameDeck[move.id].type, cardNumber: gameDeck[move.id].cardNumber, cardColor: gameDeck[move.id].color};

    if(isInFinal)
    {
        if(targetCard.type === moveCard.type 
        && targetCard.cardColor === moveCard.cardColor
            && targetCard.cardNumber === moveCard.cardNumber - 1)
        {
            retVal = true;
        }
        else
        {
            retVal = false;
            resetMove();
        }
    }
    else
    {
        if(targetCard.type != moveCard.type 
        && targetCard.cardColor != moveCard.cardColor
            && (targetCard.cardNumber === moveCard.cardNumber + 1
                    || moveCard.cardColor === "rainbow"))
        {
            retVal = true;
        }
        else
        {
            retVal = false;
            resetMove();
        }
    }

    return retVal;
} 