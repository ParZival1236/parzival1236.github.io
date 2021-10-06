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
    question: "परागकणों के साइटोप्लाज्म _______ में समृद्ध होते हैं:",
    choice1: "स्टार्च",
    choice2: "प्रोटीन",
    choice3: "खनिज पदार्थ",
    choice4: "विटामिन",
    answer: 1
  },
  {
    question:
      " निम्नलिखित में से कौन द्विआधारी विखंडन से गुजरता है?",
  
    choice1: "अमीबा",
    choice2: "हाइड्रा",
    choice3: "खमीर",
    choice4: "रिंग कीड़ा",
    answer: 1
  },
  {
    question: "निम्नलिखित में से कौन सा सहायक नलिकाओं में शामिल नहीं है?",
    choice1: "वास डिफेंस",
    choice2: "प्रोस्टेट",
    choice3: "रीट टेस्टिस",
    choice4: "अधिवृषण",
    answer: 2

  },
  {
    question: " यौन प्रजनन में सबसे महत्वपूर्ण घटना क्या है?",
    choice1: " गेम्स का फ्यूजन",
    choice2: "माध्यमिक यौन अंग",
    choice3: "तापमान",
    choice4: "पर्यावरणीय कारक",
    answer: 1

  },
  {
    question: "फंगल कोशिकाओं को __ एंजाइम का उपयोग करके lysed किया जा सकता है।",
    choice1: "lysozyme",
    choice2: "सेल्यूलास",
    choice3: "चिटिनेस",
    choice4: "लिप्स",
    answer: 3

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
    return window.location.assign("/end.html");
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