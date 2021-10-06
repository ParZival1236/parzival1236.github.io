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
    question: "નીચેનામાંથી આધાર જથ્થો છે",
    choice1: "ઝડપ",
    choice2: "વજન",
    choice3: "લંબાઈ",
    choice4: "વિસ્તાર",
    answer: 3
  },
  {
    question:"જ્યારે શરીર U.CM કરે છે. તે છે__________",
  
    choice1: "સતત velocity",
    choice2: "સતત acceleration",
    choice3: "an acceleration of સતત તીવ્રતા પરંતુ ચલ દિશા",
    choice4: "an acceleration,જે સમય સાથે બદલાય છે",
    answer: 3
  },
  {
    question: "જ્યારે શરીર U.C.M કરે છે.",
    choice1: "તેનો વેગ સતત રહે છે",
    choice2: "તેના પર કરવામાં આવેલ કામ 1s શૂન્ય",
    choice3: "તેના પર કરવામાં આવેલ કામ નકારાત્મક છે",
    choice4: "તેના પર કોઈ બળ કાર્ય કરતું નથી",
    answer: 2

  },
  {
    question: "નીચેનામાંથી કયો ફોટોકોન્ડક્ટિવ સેલ માટે વૈકલ્પિક સ્ત્રોત તરીકે ઉપયોગ કરી શકાય છે",
    choice1: "Antimony",
    choice2: "Ge,Se",
    choice3: "Silicon",
    choice4: "Cesium",
    answer: 2

  },
  {
    question: "એક કેપેસિટીવ સેન્સરમાં બે સમાંતર 1 - સેમી - 0.2 મીમીના અંતરથી અલગ ચોરસ પ્લેટો હોય છે. PF માં કેપેસીટન્સ શોધો",
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
    return window.location.assign("/physolguj.html");
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