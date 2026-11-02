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
                console.log(image);
                console.log(image.id, gameDeck)
                gameDeck[image.id].pile = 'drawnPile';
                let id = image.id;
                id = gameDeck.find(card => card.id == id);
                console.log(id);
                displayDrawPart();
            }
            
        }
        else if(drawPileIcon != undefined)
        {
            const deck = gameDeck.filter(card => card.pile === "drawnPile");

            for(let position = 0; position < deck.length; position++)
                gameDeck[deck[position].id].pile = "drawPile";
            console.log(deck);
            displayDrawPart();
        }
    });
}

/*Implements main movement for the board*/
function mainMovement()
{
    const gameBoard = document.getElementById('bottomPart');

    gameBoard.addEventListener('click', event =>{

        const image = event.target.closest('img');
        const pile = event.target.closest('div');

        if(image != undefined && pile != undefined)
        {
            const isPossible = gameDeck[image.id].isShown;
            if(!move.active && isPossible)
            {
                move.id = image.id;
                move.active = true;
            }
            else if(move.active && isPossible)
            {
                const pile = gameDeck[image.id].pile;
                const position = getLastPosition(pile) + 1;

                movement(move.id, position, pile);
                displayGamePart();
                move.active = false;
                move.id = null;
            }
            else if(!isPossible)
            {
                move.active = false;
                move.id = null;
            }
        }
        else
        {
            move.active = false;
            move.id = null;
        }

        console.log(move);
        console.log(gameDeck);
    });
}

/*Basic function that just moves the card to specified position*/
function movement(id, position, pile)
{
    gameDeck[id].pile = pile;
    gameDeck[id].position = position;
}

/*Get the last position in specified pile*/
/*Input: number of the pile starting on 0-x*/
function getLastPosition(pile)
{
    const copyDeck = gameDeck.filter(card => card.pile === pile);
    console.log(copyDeck);
    const position = copyDeck.length - 1;
    
    return position;
}