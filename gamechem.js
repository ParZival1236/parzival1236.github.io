const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Which of the following is not a crystal system?:",
    choice1: "Cubic",
    choice2: "Trigonal",
    choice3: "Triclinic",
    choice4: "Hexaclinic",
    answer: 4
  },
  {
    question:
      "What is the maximum theoretical energy efficiency of a fuel cell? ",
  
    choice1: "100 %",
    choice2: "69 %",
    choice3: "50 %",
    choice4: "83 %",
    answer: 4
  },
  {
    question: "What is the concentration of the reactant in a first order reaction when the rate of the reaction is 0.6 s-1 and the rate constant is 0.035?",
    choice1: "26.667 M",
    choice2: "17.143 M",
    choice3: "26.183 M",
    choice4: "17.667 M",
    answer: 2

  },
  {
    question: " Molecular mass of polymers are expressed as a/an _______",
    choice1: "average",
    choice2: "median",
    choice3: "mode",
    choice4: "percentage",
    answer: 1

  },
  {
    question: "What is the term used to refer to the number of collisions per unit volume of the reaction mixture?",
    choice1: "Collision force",
    choice2: "Collision frequency",
    choice3: "Collision energy",
    choice4: "Collision time period",
    answer: 2

  },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/chemsol.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
