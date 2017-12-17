// Press start
// Start timer counting down from 20
// A question shows up
// 4 possible options show up
// If right answer is clicked
    // 4 second timer starts
    // You got it right, show picture, correct++
// If wrong answer is clicked
    // 4 second timer starts
    // You got it wrong, show correct answer, show picture, wrong++
// If time runs out
    // 4 second timer starts
    // You ran out of time, show correct answer, show picture, unanswered++
// When 4 second timer runs out 
    // 20 second timer starts again
    // new question and options are shown
    // round++
// When 5 rounds have been completed, show final summary screen instead
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var questionList = [ 
    {
        question: "What is the right answer1?",
        options: ["right answer1", "second answer1", "third answer1", "fourth answer1"],
        rightAnswer: 0
    },
    {
        question: "What is the right answer2?",
        options: ["first answer2", "right answer2", "third answer2", "fourth answer2"],
        rightAnswer: 1
      },
      {
        question: "What is the right answer3?",
        options: ["first answer3", "second answer3", "right answer3", "fourth answer3"],
        rightAnswer: 2
      }
    ];

var qSet;
var round;
var countdown;
var right;
var wrong;
var unanswered;


window.onload = function() {
    $("#summary-full").hide()
};

//Play and play again buttons reset and start gameplay
$(".reset").on("click", reset);

function reset() {
    $("#play").hide();
    $("#summary-full").hide();
    round = 0;
    right = 0;
    wrong = 0;
    unanswered = 0;
    gameplay();
};


// 20 second timer
function timer () {
    timeLeft = 20;
    $("#timer").text("Seconds left: " + timeLeft);
    countdown = setInterval(showTime, 1000);

    function showTime() {
        $("#timer").text("Seconds left: " + timeLeft);

        // if time runs out, show answer and start 4 second timer
        if (timeLeft === 0) {
            unanswered++;
            clearInterval(countdown);
            $("#question-full").empty();
            showAnswer();
            $("#message").text("Time's up!")
        } else
        timeLeft--;
    };
};

// Get a random question/answer set from list and save as qSet
function getqSet() {
    var qIndex = Math.floor(Math.random()*questionList.length);
    qSet = questionList[qIndex];
};

// Show the question from randomly selected qSet
function showQuestion() {
    var currentQuestion = $("<div>");
    currentQuestion.text(qSet.question);
    $("#question-full").append(currentQuestion);
};

// Show the options from qSet
function showOptions() {
    for (var i = 0; i < qSet.options.length; i++) {
        var currentOptions = $("<button class='option btn btn-block'>");
        // make index number the value attribute
        currentOptions.attr("value", i)
        currentOptions.text(qSet.options[i]);
        $("#question-full").append(currentOptions);
    }
};

// Show the correct answer from qSet and start 4 second timer // ADD PICTURE!!
function showAnswer () {
    var currentAnswer = $("<div>");
    currentAnswer.text("Correct answer: " + qSet.options[qSet.rightAnswer]);
    $("#answer-full").append(currentAnswer);
    answerTimer();
};

// 4 second timer on answer screen 
function answerTimer () {
    setTimeout(roundCheck, 4000)
};

// Check which round it is and start another round or go to summary screen if round 5 is done
function roundCheck() {
    $("#answer-full").empty();
    $("#message").empty();
    if (round <= 4) {
        gameplay();
    }
    else {
        showSummary()
    }
};

// Show summary screen
function showSummary () {
    $("#summary-full").show();
    $("#rounds").empty();
    $("#timer").empty();
    $("#answer-full").empty();
    $("#right").text("Number right: " + right);
    $("#wrong").text("Number wrong: " + wrong);
    $("#unanswered").text("Number unanswered: " + unanswered);
}

// GAMEPLAY: show round, set timer, get random question set, show question and options, handle click responses
function gameplay() {
    round++;
    $("#rounds").text("Round " + round + " of 5");
    timer();
    getqSet();
    showQuestion();
    showOptions();
  
  // Checks if correct answer was clicked by comparing value attribute (option index) to correctAnswer (correct option index)
    $(".option").on("click", function() {
        clearInterval(countdown);
        $("#question-full").empty();
        showAnswer();
        
        //if right
        if (+$(this).val() === qSet.rightAnswer) {
            right++;
            $("#message").text("You got it!")
        } 
        //if wrong
        else {
            wrong++;
            $("#message").text("Nope!")
        }
        
    })
};