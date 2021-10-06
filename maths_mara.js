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
    question: "  क्षेत्राचे क्षेत्र, x2 + y2 = 2 या वर्तुळाने जोडलेले आहे जे पॅराबोला y2 = 𝑥 आणि सरळ रेषा 𝑦 = by ने बांधलेल्या प्रदेशासाठी सामान्य नाही.",
    choice1: "(1/3)(12𝜋 − 1)",
    choice2: "(1/6)(12𝜋 − 1)",
    choice3: "(1/3)(6𝜋 − 1)",
    choice4: "(1/6)(24𝜋 − 1",
    answer: 2
  },
  {
    question:"एकूण सहा-अंकी संख्यांची संख्या ज्यात फक्त आणि सर्व पाच अंक 1,3,5,7 आणि 9 दिसतात",
  
    choice1: "56",
    choice2: "(½)(6!)",
    choice3: " 6!",
    choice4: "(5/2) 6!",
    answer: 4
  },
  {
    question: "एक निष्पक्ष नाणे 5 वेळा फेकले जाते. समजा की variable = 3, 4, 5 साठी 𝑘 सलग डोके मिळवल्यास व्हेरिएबल the हे मूल्य दिले जाते, अन्यथा the मूल्य -1 घेते. Of चे अपेक्षित मूल्य आहे:",
    choice1: "1/8",
    choice2: "3/16",
    choice3: "-1/8",
    choice4: "-3/16",
    answer: 1

  },
  {
    question: "जर Re (z-1)/(2z + i) = 1, जेथे z = x + iy, नंतर बिंदू (x, y) a वर आहे",
    choice1: "वर्तुळ ज्याचे केंद्र (-1/2, -3/2) येथे आहे",
    choice2: " सरळ रेषा ज्याचा उतार 3/2 आहे.",
    choice3: "वर्तुळ ज्याचा व्यास √5/2 आहे",
    choice4: " सरळ रेषा ज्याचा उतार -2/3 आहे.",
    answer: 3

  },
  {
    question: " जर लंबवर्तुळाच्या केंद्रबिंदूमधील अंतर 6 असेल आणि त्याच्या निर्देशांकांमधील अंतर 12 असेल तर त्याच्या अक्षांश रेक्टमची लांबी",
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
    return window.location.assign("/mathsol_mara.html");
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