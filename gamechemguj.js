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
    question: "નીચેનામાંથી કયું નાઇટ્રોજનનું ઓક્સો-એસિડ નથી? ",
    choice1: "હાયપોનેટ્રિક એસિડ",
    choice2: "હાયપોનિટ્રસ એસિડ",
    choice3: "નાઈટ્રસ એસિડ",
    choice4: "નાઈટ્રિક એસિડ",
    answer: 1
  },
  {
    question: "સ્ફટિકમાં અણુઓની સ્થિતિ દર્શાવતા બિંદુઓને _________ તરીકે ઓળખવામાં આવે છે ",
  
    choice1: "સ્ફટિક જાળી",
    choice2: "સ્ફટિક પરિમાણો",
    choice3: "બ્રેવીસ જાળી",
    choice4: "જાળી બિંદુ",
    answer: 4
  },
  {
    question: "________ સ્ફટિકીય ઘનનું મૂળભૂત પુનરાવર્તિત માળખાકીય એકમ છે.",
    choice1: "મોનોમર",
    choice2: "પરમાણુ",
    choice3: "એકમ કોષ",
    choice4: "અણુ ",
    answer: 3

  },
  {
    question: "સૌથી મોટું હેલોજન અણુ કયું છે? ",
    choice1: "બ્રોમિન",
    choice2: "ક્લોરિન",
    choice3: "ફ્લોરિન",
    choice4: "આયોડિન",
    answer: 4

  },
  {
    question: "ગેલ્વેનિક કોષની શોધ કોણે કરી?",
    choice1: "ગાલવાની અને વોલ્ટા",
    choice2: "હેનરી કેવેન્ડિશ",
    choice3: "જોસેફ પ્રિસ્ટલી",
    choice4: "એન્ટોન લેવોઇઝર",
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
    return window.location.assign("/chemsolguj.html");
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
