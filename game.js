// alert("doneee")
// declaring 4 colors of the game 
var buttoncolors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;



//keystrokes for 1 st time getting 
$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);

    console.log(userPattern);
    playSoundclr(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userPattern.length - 1);
});

//check answer 
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        console.log("succes");

        if (userPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSoundclr("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text(" GAME OVER press any keyword to start again ");

        startagain();
    }



}


function nextSequence() {
    userPattern = [];
    level++;
    $("#level-title").text("level " + level);
    // creating random no. till 4 
    var randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber);

    // putting values to color 
    randomChossenColor = buttoncolors[randomNumber];
    gamePattern.push(randomChossenColor);

    //flash
    $("#" + randomChossenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSoundclr(randomChossenColor);

}
//for playing sounds after pressing  
function playSoundclr(currentColor) {
    var audio = new Audio("sounds/" + currentColor + ".mp3");
    audio.play();

}
// for animation after press
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
//game over again 
function startagain() {
    level = 0;
    started = false;
    gamePattern = [];
}