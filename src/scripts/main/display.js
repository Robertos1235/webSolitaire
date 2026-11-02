/*Main function that creates game board*/
function displayGameBoard(gamePiles, finalPiles)
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
        gamePile.className = "finalPile";
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

    const deck = gameDeck.filter(card => card.pile === "drawnPile" || card.pile === "drawPile");
    console.log(deck);

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

function sortDeck(array)
{
    array.sort((a,b) => a.position - b.position);
}