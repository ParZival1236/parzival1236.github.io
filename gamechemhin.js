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
    question: "निम्नलिखित में से कौन एक ठोस समाधान नहीं है?",
    choice1: "पीतल",
    choice2: "कांस्य",
    choice3: "हाइड्रेटेड नमक",
    choice4: "वातित पेय",
    answer: 4
  },
  {
    question: "स्टेनलेस स्टील एक/एक ________ मिश्र धातु है। ",
  
    choice1: " रिक्त",
    choice2: "अंतरालीय",
    choice3: "प्रतिस्थापन",
    choice4: "शुद्ध",
    answer: 2
  },
  {
    question: "जब किसी पदार्थ के अणु किसी ठोस या द्रव की सतह पर बने रहते हैं तो उस प्रक्रिया को क्या कहते हैं?",
    choice1: "अवशोषण",
    choice2: "सोखना",
    choice3: "सॉर्प्शन",
    choice4: "डिसोर्शन ",
    answer: 2

  },
  {
    question: "आवर्त सारणी में संक्रमण तत्वों की कितनी श्रृंखलाएं मौजूद हैं? ",
    choice1: "चार",
    choice2: "तीन",
    choice3: "एक",
    choice4: "दो",
    answer: 1

  },
  {
    question: "निम्नलिखित में से कौन सह-बहुलक है?",
    choice1: "पॉलिथीन",
    choice2: "बैकलाइट",
    choice3: "पीवीसी",
    choice4: "पॉलीएक्रिलोनिट्राइल",
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
    return window.location.assign("/chemsolhin.html");
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
