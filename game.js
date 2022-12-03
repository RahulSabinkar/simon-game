var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  increaseLevel();

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);

  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
}

// Game Start
$(document).on("keypress", () => {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// User Pattern
$(".btn").on("click", (event) => {
  var userChosenColor = event.target.id;

  animatePress(userChosenColor);
  playSound(userChosenColor);

  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameover();
  }
}

function gameover() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);

  // Reset values
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}

function increaseLevel() {
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}