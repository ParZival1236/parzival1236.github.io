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
    question: "ક્ષેત્રનો વિસ્તાર, વર્તુળ x2 + y2 = 2 દ્વારા બંધ છે જે પેરાબોલા y2 = 𝑥 અને સીધી રેખા 𝑦 = by દ્વારા બંધાયેલા પ્રદેશ માટે સામાન્ય નથી,",
    choice1: "(1/3)(12𝜋 − 1)",
    choice2: "(1/6)(12𝜋 − 1)",
    choice3: "(1/3)(6𝜋 − 1)",
    choice4: "(1/6)(24𝜋 − 1",
    answer: 2
  },
  {
    question:"કુલ છ-અંકોની સંખ્યા જેમાં માત્ર અને તમામ પાંચ અંકો 1,3,5,7 અને 9 દેખાય છે, તે છે",
  
    choice1: "56",
    choice2: "(½)(6!)",
    choice3: " 6!",
    choice4: "(5/2) 6!",
    answer: 4
  },
  {
    question: "નિષ્પક્ષ સિક્કો 5 વખત ફેંકવામાં આવે છે. ધારો કે ચલ the ને મૂલ્ય સોંપવામાં આવે છે 𝑘 જ્યારે 𝑘 = 3, 4, 5 માટે સળંગ હેડ મેળવવામાં આવે છે, અન્યથા the મૂલ્ય -1 લે છે. Of નું અપેક્ષિત મૂલ્ય છે",
    choice1: "1/8",
    choice2: "3/16",
    choice3: "-1/8",
    choice4: "-3/16",
    answer: 1

  },
  {
    question: "જો Re (z-1)/(2z + i) = 1, જ્યાં z = x + iy, તો બિંદુ (x, y) a પર આવેલો છે",
    choice1: "વર્તુળ કે જેનું કેન્દ્ર (-1/2, -3/2) પર છે",
    choice2: "સીધી રેખા જેની opeાળ 3/2 છે.",
    choice3: "વર્તુળ જેનો વ્યાસ √5/2 છે.",
    choice4: "સીધી રેખા જેની opeાળ -2/3 છે.",
    answer: 3

  },
  {
    question: " જો લંબગોળના કેન્દ્રબિંદુ વચ્ચેનું અંતર 6 હોય અને તેના નિર્દેશકો વચ્ચેનું અંતર 12 હોય, તો તેના લેટસ ગુદામાર્ગની લંબાઈ",
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
    return window.location.assign("/mathsol_guj.html");
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