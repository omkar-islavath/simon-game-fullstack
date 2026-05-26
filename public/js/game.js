var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var highScore = 0;

/* ================= START GAME ================= */

$("#start-btn").click(function () {
  if (started) return;

  startGame();
});

/* ================= RESTART GAME ================= */

$("#restart-btn").click(function () {
  $("#restart-btn").hide();

  startGame();
});

function startGame() {
  started = true;

  level = 0;

  gamePattern = [];

  userClickedPattern = [];

  $("#start-btn").hide();

  $("#level-title").text("Simon Game");

  $("#level-display").text("Level: 0");

  nextSequence();
}

/* ================= BUTTON CLICK ================= */

$(".btn").click(function () {
  if (!started) return;

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

/* ================= CHECK ANSWER ================= */

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 800);
    }
  } else {
    gameOver();
  }
}

/* ================= NEXT SEQUENCE ================= */

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

/* ================= GAME OVER ================= */

function gameOver() {
  playSound("wrong");

  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 300);

  saveScore(level);

  started = false;

  $("#restart-btn").show();
}

/* ================= ANIMATION ================= */

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/* ================= SOUND ================= */

function playSound(name) {
  var audio = new Audio("../sounds/" + name + ".mp3");

  audio.play();
}

/* ================= SAVE SCORE ================= */

async function saveScore(score) {
  if (typeof getUserId !== "function") return;

  const userId = getUserId();

  if (!userId) return;

  await fetch("/api/scores", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      userId: userId,
      score: score,
    }),
  });
}
