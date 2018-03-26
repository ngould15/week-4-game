//set up 4 seashell images
//if total score=computerNum, increment Wins
//if totalscore==computerNum, increment Losses
//Reset when player win/lose
//Another random num is picked and all seashells have new numbers too
//score board should continue to keep track
var randomNum = 0;
var crystalNum = 0;
var seashellTotal = 0;
var loss = 0;
var win = 0;
var seenAlready = [];

//console.log(randomNum);

function contains(elem, array) {
    for (var i = 0; i < array.length; ++i) {
        if (array[i] === elem) {
            return true;
        }
    }

    return false;
}

function setGameDefaults() {
    randomNum = 0;
    crystalNum = 0;
    seashellTotal = 0;
    seenAlready = [];
}

function getImageURL(index) {
    var images = ["./assets/images/brownshell.png", "./assets/images/greenshell.png", "./assets/images/pinkshell.png", "./assets/images/yellowshell.png"];

    return images[index];
}

function onGameReset() {

    // We're starting the game - set everything to default
    setGameDefaults();

    // Clear old seashells
    $(".crystals").html("");

    //show a random number at the "start"; window on load randomNum="19-120"
    randomNum = Math.floor(Math.random() * (101 + 1)) + 19;
    $("#randomNum").html("Amount Sally Needs: " + "$ " + randomNum);

    //each of the 4 crystal will have a random number each round "1-12"
    //set a loop for 4 cryNum generator
    for (var i = 0; i < 4; i++) {
        //console.log("Hello world");
        var crystalNum = Math.floor(Math.random() * 12) + 1;

        while (true) {
            if (!contains(crystalNum, seenAlready)) {
                seenAlready.push(crystalNum);
                break;
            }

            crystalNum = Math.floor(Math.random() * 12) + 1;
        }

        console.log(crystalNum);
        var crystal = $("<img>");
        crystal.attr({
            "class": 'crystal',
            "ComputerGuess": crystalNum,
            "src": getImageURL(i),
            "height": 160,
            "width": 110,
        });

        //crystal.html(crystalNum); //To show the number for test (checked)

        $(".crystals").append(crystal);
        //console.log("Crystal Test");
        $("#seashellTotal").html("Current Amount Sally Has: " + "$ " + seashellTotal);
    }
}

function setEventListeners() {
    //on click, each crystal should have a random value between 0-12 (checked)
    //These values should not show up "on.click"
    $(document).on('click', ".crystal", function () {
        //console.log($(this).attr('ComputerGuess')); (checked)
        //make each crystal a separate variable and then add the functions to add the values in//
        var crystalValue = parseInt($(this).attr('ComputerGuess'));
        seashellTotal += crystalValue;
        $("#seashellTotal").html("Current Amount Sally Has: " + "$ " + seashellTotal);

        console.log(seashellTotal);
        //But the incrementation of the values should show up upon each crystal "on.click" (checked)

        //if total crystal added is over the randomNum, then add point to "losses"
        if (seashellTotal > randomNum) {
            loss++;
            alert("Try Again!");
            $("#losses").html("Losses: " + loss);
            onGameReset();

        }


        //If the total crystal added is equal to the randomNum, then add point to "wins" and alert "You Got It"
        else if (seashellTotal === randomNum) {
            win++;
            alert("You Got It!");
            $("#wins").html("Wins: " + win);
            //console.log("You Got It!"); (checked)
            onGameReset();


        }
    });
}


$(document).ready(function () {
    onGameReset();
    setEventListeners();
});