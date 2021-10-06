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
    question: " The area of the region, enclosed by the circle x2 + y2 = 2 which is not common to the region bounded by the parabola y2 = 𝑥 and the straight line 𝑦 = 𝑥, is:",
    choice1: "(1/3)(12𝜋 − 1)",
    choice2: "(1/6)(12𝜋 − 1)",
    choice3: "(1/3)(6𝜋 − 1)",
    choice4: "(1/6)(24𝜋 − 1",
    answer: 2
  },
  {
    question:
      "Total number of six-digit numbers in which only and all the five digits 1,3,5,7 and 9 appear, is: ",
  
    choice1: "56",
    choice2: "(½)(6!)",
    choice3: " 6!",
    choice4: "(5/2) 6!",
    answer: 4
  },
  {
    question: "An unbiased coin is tossed 5 times. Suppose that a variable 𝑋 is assigned the value 𝑘 when 𝑘 consecutive heads are obtained for 𝑘 = 3, 4, 5, otherwise 𝑋 takes the value -1. The expected value of 𝑋, is: ",
    choice1: "1/8",
    choice2: "3/16",
    choice3: "-1/8",
    choice4: "-3/16",
    answer: 1

  },
  {
    question: "If Re (z-1)/(2z + i) = 1, where z = x+iy, then the point (x,y) lies on a ",
    choice1: "circle whose centre is at (-1/2, -3/2)",
    choice2: "straight line whose slope is 3/2",
    choice3: "circle whose diameter is √5/2",
    choice4: "straight line whose slope is -2/3",
    answer: 3

  },
  {
    question: " If the distance between the foci of an ellipse is 6 and the distance between its directrices is 12, then the length of its latus rectum is:",
    choice1: "2√3",
    choice2: "√3",
    choice3: " 3/√2",
    choice4: "3√2",
    answer: 4

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
    return window.location.assign("/mathsol.html");
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