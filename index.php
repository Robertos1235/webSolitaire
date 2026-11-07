<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/src/include/header.php";?>
	<title>Main page</title>
    <link rel="stylesheet" type="text/css" href="/assets/style/mainPage.css">
    <script src="/src/scripts/mainPage.js" defer></script>
</head>
<body>
    <div class="mainWrapper">
        <div class="wallpaperCard">
            <h1>Welcome Player!</h1>
            <div class="chooseGame">
                <a href="/games/KingJoker.php" class="button" id="playGame">Play game!</a>
                <select id="select"></select>
            </div>
        </div>
    </div>
</body>
</html>