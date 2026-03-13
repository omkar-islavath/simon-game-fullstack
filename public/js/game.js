var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var highScore = 0;

/* START GAME */
$("#start-btn").click(function () {
  if (!started) {
    $("#start-btn").hide();

    level = 0;
    gamePattern = [];
    started = true;

    $("#level-display").text("Level: 0");

    nextSequence();
  }
});

/* BUTTON CLICK */
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

/* CHECK ANSWER */
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over");

    $("#restart-btn").show();

    saveScore(level); //  BACKEND INTEGRATION

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);

    startOver();
  }
}

/* NEXT SEQUENCE */
function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-display").text("Level: " + level);

  if (level > highScore) {
    highScore = level;

    $("#high-score").text("High Score: " + highScore);
  }

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var btn = $("#" + randomChosenColour);

  btn.addClass("active");

  setTimeout(function () {
    btn.removeClass("active");
  }, 400);

  playSound(randomChosenColour);
}

/* ANIMATION */
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/* SOUND */
function playSound(name) {
  var audio = new Audio("../sounds/" + name + ".mp3");
  audio.play();
}

/* GAME RESET */
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

/* SAVE SCORE TO BACKEND */
async function saveScore(score) {
  if (typeof getUserId !== "function") return;

  const userId = getUserId();
  if (!userId) return;

  await fetch("/api/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
      score: score,
    }),
  });
}
$("#restart-btn").click(function () {
  startOver();

  $("#restart-btn").hide();

  level = 0;
  gamePattern = [];
  started = true;

  $("#level-display").text("Level: 0");

  nextSequence();
});
