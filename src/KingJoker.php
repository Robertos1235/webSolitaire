<!DOCTYPE html>
<html lang="en">
<head>
	<title>King Joker</title>
    <link rel="stylesheet" type="text/css" href="/assets/style/gamesPage.css">
    <script src="/src/scripts/main/mainLogic.js"></script>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/src/include/header.php";?>
</head>
<body>
    <div class="mainWrapper">
        <div class="wallpaperCard">
            <div class="gameBoardWrapper">
                <div class="topPart" id="topPart"></div>
                <div class="bottomPart" id="bottomPart"></div>
            </div>
            <script>
                initializeDeck(1, true);
                drawMainPage(7,4);
                gameBoardDeck(7);
                placeDeck();
            </script>
        </div>
    </div>
</body>
</html>