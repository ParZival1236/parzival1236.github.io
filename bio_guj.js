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
    question: "પરાગ અનાજના સાયટોપ્લાઝમ _______ માં સમૃદ્ધ છે:",
    choice1: "સ્ટાર્ચ",
    choice2: "પ્રોટીન",
    choice3: "ખનિજો",
    choice4: "વિટામિન્સ",
    answer: 1
  },
  {
    question:
      " નીચેનામાંથી કયું દ્વિસંગી વિભાજનમાંથી પસાર થાય છે?",
  
    choice1: "એમોએબા",
    choice2: "હાઇડ્રા",
    choice3: "ખમીર",
    choice4: "રિંગ વોર્મ",
    answer: 1
  },
  {
    question: "સહાયક નળીઓમાં નીચેનામાંથી કયો સમાવેશ કરાયો નથી?",
    choice1: " વાસ ડિફેરેન્સ",
    choice2: "પ્રોસ્ટેટ",
    choice3: "ટેસ્ટીસ રીટે",
    choice4: "એપીડીડીમીસ",
    answer: 2

  },
  {
    question: "જાતીય પ્રજનનમાં સૌથી મહત્વની ઘટના કઈ છે?",
    choice1: " ગેમેટ્સનું ફ્યુઝન",
    choice2: "ગૌણ જાતીય અંગો",
    choice3: "તાપમાન",
    choice4: "પર્યાવરણીય પરિબળો",
    answer: 1

  },
  {
    question: "ફૂગના કોષોને ______ એન્ઝાઇમનો ઉપયોગ કરીને લાઇસ કરી શકાય છે.",
    choice1: "લાઇસોઝાઇમ",
    choice2: "સેલ્યુલેઝ",
    choice3: "chitinase",
    choice4: "લિપેઝ",
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
