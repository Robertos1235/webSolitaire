const playGame = document.getElementById("playGame");
const select = document.getElementById("select");

const games = [
    {name: "Klondike", location: "Klondike"},
    {name: "Klondike (2 decks)", location: "Klondike2Decks"},
    {name: "King Joker", location: "KingJoker"}
];

let selectedGame = "Klondike";

games.forEach(game => {

    const option = document.createElement('option');
    option.value = game.location;
    option.textContent = game.name;
    select.append(option);

});

playGame.addEventListener('click', event => {

    playGame.href = "/games/" + selectedGame + ".php";

});

select.addEventListener("change", event =>{
    selectedGame = select.value;
})
