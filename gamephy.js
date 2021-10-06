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
    question: "The base quantity among the following is",
    choice1: "Speed",
    choice2: "Weight",
    choice3: "Length",
    choice4: "Area",
    answer: 3
  },
  {
    question:"When a body performs a U.C.M. it has__________",
  
    choice1: "a constant velocity",
    choice2: "a constant acceleration",
    choice3: "an acceleration of constant magnitude but variable direction",
    choice4: "an acceleration, which changes with time",
    answer: 3
  },
  {
    question: "When a body performs a U.C.M.",
    choice1: "its velocity remains constant",
    choice2: "Work done on it 1s zero",
    choice3: "work done on it is negative",
    choice4: "no force acts on it",
    answer: 2

  },
  {
    question: "which of the following can be used as an alternative source for Photoconductive cell ",
    choice1: "Antimony",
    choice2: "Ge,Se",
    choice3: "Silicon",
    choice4: "Cesium",
    answer: 2

  },
  {
    question: "A capacitive sensor consists of two parallel 1 - cm - square plates separated by a distance of 0.2 mm. Find the capacitance in pF  ",
    choice1: "2.21 pF",
    choice2: "4.43pF",
    choice3: "3.37pF",
    choice4: "6.88pF",
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
    return window.location.assign("/physol.html");
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