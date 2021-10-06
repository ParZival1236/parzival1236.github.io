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
    question: "किसी आवेशित चालक के सतह बिंदु पर विधुतीय-क्षेत्र का मान होता है :-",
    choice1: "ε₀ σ",
    choice2: "σ/ε₀",
    choice3: "Zero",
    choice4: "σ/2ε₀",
    answer: 2
  },
  {
    question:"आवेशित खोखले गोलीय चालक के अन्दर विधुत-तीव्रता होती है :-",
      choice1: "ε₀ σ",
      choice2: "σ/ε₀",
      choice3: "Zero",
      choice4: "σ/2ε₀",
      answer: 3
  },
  {
    question: "एक आवेशित चालक के किसी विन्दु पर विधुतीय क्षेत्र की तीव्रता :-",
    choice1: "शुन्य",
    choice2: "सतह के लंबवत होती है",
    choice3: "सतह के स्पर्शीय होता है",
    choice4: "सतह 45 डिग्री  से पर होती है",
    answer: 2

  },
  {
    question: "किसी आवेशित चालक के भीतर विधुतीय-क्षेत्र और विधुत विभव का मान क्रमशः होता है :-",
    choice1: "समरूप, शुन्य",
    choice2: "शुन्य, समरूप",
    choice3: "अनंत, असमरूप",
    choice4: "असमरूप, अनंत",
    answer: 2

  },
  {
    question: "2C आवेश को एक बिंदु से दुसरे बिंदु तक ले जाने में 20 J कार्य की आवश्यकता होती है ! इन दोनों बिन्दुओं के बीच वोल्ट में विभवान्तर है !",
    choice1: " 10",
    choice2: "20",
    choice3: "5",
    choice4: "2",
    answer: 1

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
    return window.location.assign("/physolmar.html");
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


incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();