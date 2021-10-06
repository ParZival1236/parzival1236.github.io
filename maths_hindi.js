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
    question: "क्षेत्र का क्षेत्रफल, वृत्त x2 + y2 = 2 से घिरा है, जो परवलय y2 = और सीधी रेखा = से घिरे क्षेत्र के लिए उभयनिष्ठ नहीं है, है:",
    choice1: "(1/3)(12𝜋 − 1)",
    choice2: "(1/6)(12𝜋 − 1)",
    choice3: "(1/3)(6𝜋 − 1)",
    choice4: "(1/6)(24𝜋 − 1",
    answer: 2
  },
  {
    question: "छह अंकों की कुल संख्या जिसमें केवल और सभी पांच अंक 1,3,5,7 और 9 दिखाई देते हैं, है:",
  
    choice1: "56",
    choice2: "(½)(6!)",
    choice3: " 6!",
    choice4: "(5/2) 6!",
    answer: 4
  },
  {
    question: "एक निष्पक्ष सिक्के को 5 बार उछाला जाता है। मान लीजिए कि एक चर 𝑋 को मान दिया जाता है जब = 3, 4, 5 के लिए लगातार शीर्ष प्राप्त होते हैं, अन्यथा मान -1 लेता है। का अपेक्षित मान है:",
    choice1: "1/8",
    choice2: "3/16",
    choice3: "-1/8",
    choice4: "-3/16",
    answer: 1

  },
  {
    question: "यदि रे (z-1)/(2z + i) = 1, जहां z = x+iy, तो बिंदु (x,y) एक पर स्थित है",
    choice1: "वृत्त जिसका केंद्र (-1/2, -3/2) पर है",
    choice2: "सीधी रेखा जिसका ढाल 3/2 . है",
    choice3: "वृत्त जिसका व्यास √5/2 . है ",
    choice4: "सीधी रेखा जिसका ढाल -2/3 . है",
    answer: 3

  },
  {
    question: "यदि एक दीर्घवृत्त की नाभियों के बीच की दूरी 6 है और उसकी दिशाओं के बीच की दूरी 12 है, तो उसके लेटस रेक्टम की लंबाई है",
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
    return window.location.assign("/mathsol_hindi.html");
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