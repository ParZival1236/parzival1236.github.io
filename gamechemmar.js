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
    question: "रासायनिक अभिक्रियेत, जर अभिक्रियेला जास्त प्रमाणात सक्रियकरण ऊर्जा आवश्यक असेल, तर प्रतिक्रियेचे वर्तन काय आहे?",
    choice1: "जलद",
    choice2: "हळू",
    choice3: "झटपट",
    choice4: "सक्रियकरण उर्जेवर अवलंबून नाही",
    answer: 2
  },
  {
    question: " खालीलपैकी कोणता टप्पा इंटरफेसवर होत नाही? ",
  
    choice1: "स्फटिकरण",
    choice2: "विषम उत्प्रेरक",
    choice3: "एकसंध उत्प्रेरक",
    choice4: "गंज",
    answer: 3
  },
  {
    question: " गॅल्व्हॅनिक सेलचा शोध कोणी लावला?",
    choice1: " गलवानी आणि व्होल्टा",
    choice2: "हेन्री कॅव्हेंडिश",
    choice3: "अजोसेफ प्रीस्टली",
    choice4: " अँटोनी लाव्होझियर",
    answer: 1

  },
  {
    question: " खालीलपैकी कोणती शक्ती भौतिक शोषणात सामील आहे?",
    choice1: "गुरुत्वीय बल",
    choice2: "चुंबकीय बल",
    choice3: "व्हॅन डर वाल्स बल",
    choice4: "विद्युत चुंबकीय बल",
    answer: 3

  },
  {
    question: ". एक-आयामी बंद पॅकिंगसाठी समन्वय क्रमांक काय आहे?",
    choice1: "२",
    choice2: "१",
    choice3: "४",
    choice4: "६",
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
    return window.location.assign("/chemsolmar.html");
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
