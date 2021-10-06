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
    question: "પીઝો-ઇલેક્ટ્રિક ટ્રાન્સડ્યુસરનો ઉપયોગ કરીને નીચેનામાંથી કયું માપી શકાય?",
    choice1: "વેલોસિટી",
    choice2: "વિસ્થાપન",
    choice3: "બળ",
    choice4: "અવાજ",
    answer: 3
  },
  {
    question:
      "LVDT ના નીચેનામાંથી કયા ફાયદા છે",
  
    choice1: "ઉચ્ચ ઇનપુટ અને ઉચ્ચ સંવેદનશીલતા",
    choice2: "ઇલેક્ટ્રિક સિગ્નલોમાં સીધું રૂપાંતર",
    choice3: "ઉપર્યુક્તમાંથી કોઈ નહિ",
    choice4: "a અને b બંને",
    answer: 4
  },
  {
    question: "કેટલા પ્રકારના ટ્રાન્સડ્યુસર્સ છે?",
    choice1: "2",
    choice2: "4",
    choice3: "6",
    choice4: "8",
    answer: 1

  },
  {
    question: "નીચેનામાંથી કયો ફોટોકોન્ડક્ટિવ સેલ માટે વૈકલ્પિક સ્ત્રોત તરીકે ઉપયોગ કરી શકાય છે",
    choice1: "એન્ટિમની",
    choice2: "ગે, સે",
    choice3: "સિલિકોન",
    choice4: "સીઝિયમ",
    answer: 2

  },
  {
    question: "એક કેપેસિટીવ સેન્સર બે સમાંતર 1 - સેમી - 0.2 મીમીના અંતરથી અલગ ચોરસ પ્લેટ ધરાવે છે. PF માં કેપેસીટન્સ શોધો",
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
    return window.location.assign("/endguj.html");
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
