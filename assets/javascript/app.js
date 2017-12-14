// Start timer counting down from 30
// A question shows up
// 4 possible options show up
   // Right answer should be in different positions each time
// If right answer is clicked
   // 5 second timer starts
   // You got it right, show picture, correct++
// If wrong answer is clicked
  // 5 second timer starts
  // You got it wrong, show correct answer, show picture, wrong++
// If time runs out
  // 5 second timer starts
  // You ran out of time, show correct answer, show picture, unanswered++
// When 5 second timer runs out, new question and options are shown
// When 5 questions have been completed, show final summary screen

var questionList = [ 
    {
      question: "What is the right answer?",
      options: ["some answer", "another answer", "third answer", "last answer"]
    },
    {
        question: "What is the right answer2?",
        options: ["some answer2", "another answer2", "third answer2", "last answer2"]
      },
      {
        question: "What is the right answer3?",
        options: ["some answer3", "another answer3", "third answer3", "last answer3"]
      }
    ]
    
// Randomly select one of the indexes in questionList
var qIndex = Math.floor(Math.random()*questionList.length);
// Save the object with that index as qSet
var qSet = questionList[qIndex];

// Show the question from qSet
function showQuestion() {
    var currentQuestion = $("<div>");
    currentQuestion.text(qSet.question);
    $("#question-full").append(currentQuestion);
}
showQuestion();

// Show the options from qSet
function showOptions() {
    for (var i = 0; i < qSet.options.length; i++) {
    var currentOptions = $("<div class='option'>");
    currentOptions.attr("value", i)
    currentOptions.text(qSet.options[i]);
    $("#question-full").append(currentOptions);
    }
}
showOptions();

// onclick .option if this.val = qSet.rightAnswer // checks if correct answer was selected

// $("#question-full").empty(); //empties out div-- can use when showing answer and final page