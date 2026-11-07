<!DOCTYPE html>
<html lang="en">
<head>
	<title>Klondike (2 decks)</title>
    <link rel="stylesheet" type="text/css" href="/assets/style/gamesPage.css">
    <script src="/src/scripts/main/main.js"></script>
    <script src="/src/scripts/main/display.js"></script>
    <script src="/src/scripts/main/movement.js"></script>
    <script src="/src/scripts/main/init.js"></script>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/src/include/header.php";?>
</head>
<body>
    <div class="mainWrapper">
        <div class="wallpaperCard" id="gameBoard">
            <div class="gameBoardWrapper">
                <div class="topPart" id="topPart"></div>
                <div class="bottomPart" id="bottomPart"></div>
            </div>
            <script>
                init(2, 8, false);
            </script>
        </div>
    </div>
</body>
</html>