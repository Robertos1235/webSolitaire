/*Main function that creates game board*/
function displayGameBoard(gamePiles, finalPiles, isJoker)
{
    const topPart = document.getElementById("topPart");
    const bottomPart = document.getElementById("bottomPart");

    const drawPart = document.createElement('div');
    drawPart.className = "drawPart";

    const drawPile = document.createElement('div');
    drawPile.id = "drawPile";
    drawPile.className = "drawPile";
    drawPile.draggable = false;

    const drawnPile = document.createElement('div');
    drawnPile.id = "drawnPile";
    drawnPile.className = "drawPile";
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
        gamePile.className = "finalPile";
        gamePile.draggable = false;
        const idNumber = roundDown(counter / 4);

        switch(counter % 4)
        {
            case 0:
                gamePile.id = "club-" + idNumber;
                gamePile.innerHTML = "<span class=icon>&#9827</span>"
            break;

            case 1:
                gamePile.id = "diamond-" + idNumber;
                gamePile.innerHTML = "<span class=icon>&#9830</span>"
            break;

            case 2:
                gamePile.id = "spade-" + idNumber;
                gamePile.innerHTML = "<span class=icon>&#9824</span>"
            break;

            case 3:
                gamePile.id = "heart-" + idNumber;
                gamePile.innerHTML = "<span class=icon>&#9829</span>"
            break;
                
        }
        
        finalPart.append(gamePile);
    }

    if(isJoker)
    {
        const jokerPile = document.createElement('div');
        jokerPile.className = "jokerPile";
        jokerPile.draggable = false;
        jokerPile.id = "jokerPile";
        jokerPile.innerHTML = "<span class=icon>J</span>";
        finalPart.append(jokerPile);
    }


    topPart.append(finalPart);
}

/*Function that places card onto the board*/
function displayGamePart()
{
    const gamePiles = document.getElementsByClassName("gamePile");
    const deck = gameDeck.filter(card => card.pile >= 0);

    sortDeck(deck);
    let source; 

    for(let position = 0; position < gamePiles.length; position++)
    {
        gamePiles[position].innerHTML = "";
    }

    deck.forEach(card => {

        if(!card.isShown && card.position === getLastPosition(card.pile))
        {
            card.isShown = true;
        }

        card.isShown === true ? source = card.image : source = BACK;

        placeCard(source, card.id, "gameCard",gamePiles[Number(card.pile)]);

    });
}

/*Function that only reloads DrawPart*/
function displayDrawPart()
{
    const drawPile = document.getElementById('drawPile');
    const drawnPile = document.getElementById('drawnPile');

    let isInDrawPile = false;

    drawPile.innerHTML = "";
    drawnPile.innerHTML = "";

    const deck = gameDeck.filter(card => card.pile === "drawnPile" || card.pile === "drawPile");

    deck.forEach(card =>{
        if(card.pile === "drawPile" && isInDrawPile === false)
        {
            placeCard(BACK, card.id, "card", drawPile);
            isInDrawPile = true;
        }
        else if(card.pile === "drawnPile")
        {
            drawnPile.innerHTML = "";
            placeCard(card.image, card.id, "card", drawnPile);
        }
    });

    if(!isInDrawPile)
    {
        const icon = document.createElement('span');
        icon.className = "material-symbols-outlined icon";
        icon.textContent = "refresh";
        icon.id = "reDraw";
        drawPile.append(icon);
    }
}
/*Function that only reloads FinalPart*/
function displayFinalPart()
{
    const finalPiles = document.getElementsByClassName("finalPile");

    const deck = gameDeck.filter(card => card.isInFinal === true);

    if(deck.length != 0)
    {
        sortDeck(deck);

        for(let position = 0; position < finalPiles.length; position++)
        {
            if(finalPiles[position].childNodes.length === 1)
            {
                switch(position % 4)
                {
                    case 0:
                        finalPiles[position].innerHTML = "<span class=icon>&#9827</span>"
                    break;

                    case 1:
                        finalPiles[position].innerHTML = "<span class=icon>&#9830</span>"
                    break;

                    case 2:
                        finalPiles[position].innerHTML = "<span class=icon>&#9824</span>"
                    break;

                    case 3:
                        finalPiles[position].innerHTML = "<span class=icon>&#9829</span>"
                    break;   
                }
            }
            else
            {
                finalPiles[position].innerHTML = "";
            }
            
        }

        deck.forEach(card => {
            const pileId = translatePileForDisplay(card.pile);
            finalPiles[pileId].innerHTML = "";

            placeCard(card.image, card.id, "card",finalPiles[pileId]);

        });
    }
}

/*Displays joker pile*/
function displayJokerPile()
{
    const jokerPile = document.getElementById('jokerPile');

    const deck = gameDeck.filter(card => card.pile === "jokerPile");

    if(deck.length != 0)
    {
        jokerPile.innerHTML = "";
        placeCard(deck[0].image, deck[0].id, "card",jokerPile);
    }
}
/*Function that creates a card and appends it to specified place*/
function placeCard(source, id, nameOfClass, placement)
{
    const image = document.createElement('img');

    image.src = source;
    image.className = nameOfClass;
    image.id = id;
    image.draggable = false;

    placement.append(image);
}

function wonScreen()
{
    const popUp = document.createElement('div');
    popUp.className = "wonScreen";
    popUp.id = "wonScreen";

    const wonDisplay = document.createElement('div');
    wonDisplay.className = "wonDisplay";

    const header = document.createElement('h1');
    header.textContent = "Congratulation you won";

    const button = document.createElement('button');
    button.className = "button";
    button.textContent = "Play again"
    button.onclick = restart;

    wonDisplay.append(header, button);
    popUp.append(wonDisplay)

    document.body.append(popUp);
}



/*Function that translate the id of final pile to number for access by array of elements*/
function translatePileForDisplay(pile)
{
    let retVal;
    const pileId  = pile.split("-");

    switch(pileId[0])
    {
        case "club":
            retVal = 0;
        break;

        case "diamond":
            retVal = 1;
        break;

        case "spade":
            retVal = 2
        break;

        case "heart":
            retVal = 3;
        break;
    }

    if(Number(pileId[1]) != 0)
    {
        if(retVal != 0)
        {
            retVal *= Number(pileId[1]);
        }
        else
        {
            retVal = 3 * Number(pileId[1]) + Number(pileId[1]);
        }
        
    }

    return retVal;
}