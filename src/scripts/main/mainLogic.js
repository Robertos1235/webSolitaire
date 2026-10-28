const CLUB = "/assets/cards/club/";
const DIAMOND = "/assets/cards/diamond/"
const HEART = "/assets/cards/heart/";
const SPADE = "/assets/cards/spade/";
const Arrays = [1,2312,1,24,1,2411,42,4,12,4,124,1,24,1,24,12,4,124,1,2,25,23,5,235,2352,3];
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
    shuffleArray(Arrays);
    console.log(Arrays)

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