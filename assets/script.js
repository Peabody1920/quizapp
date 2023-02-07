const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "ans3",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "ans4",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "ans3",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "ans4",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "ans1",
  },
];

let questiontitle = document.querySelector(".question-title");
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");
let clickOption = document.querySelectorAll(".options");
let start = document.querySelector("#start");
let question = document.querySelector("#question");
let button = document.querySelector("#btn");
let shownanswer = document.querySelector("#answerShown");
let inputenter = document.querySelector("#done");
let submit = document.querySelector("#submit");
let alldone = document.querySelector("#alldone");
let list = document.getElementById("highscores-list");
let highscores = document.getElementById("highscores");
let viewhighscores = document.getElementById("leaderboard");
let clearhighscores = document.getElementById("clearhighscores");
let startcount = document.getElementById("time");
let count = 0;
let counttimes = 50;

// quiz start function 
function gameStart() {
  start.style.display = "none";
  question.style.display = "flex";
  loadQuestion();
  timercount();

}

// quiz load question function 
const loadQuestion = () => {
  questiontitle.innerText = `${questions[count].questionText}`;
  option1.innerText = `${questions[count].options[0]}`;
  option2.innerText = `${questions[count].options[1]}`;
  option3.innerText = `${questions[count].options[2]}`;
  option4.innerText = `${questions[count].options[3]}`;
};

// click to start quiz game
button.addEventListener("click", gameStart);

// time count to how many second to complete quiz
function timercount() {
  let timer = setInterval(function () {
    startcount.innerText = `Time: ${counttimes--}`;
    if (count == questions.length) clearInterval(timer);
  }, 1000);
}

// function to change the question after answer the before question
clickOption.forEach((element) =>
element.addEventListener("click", (e) => {
  if (count < questions.length  ) {
      if (e.target.id === questions[count].answer) {
        shownanswer.innerText = "correct";
        count++;
        loadQuestion();
      } else {
        shownanswer.innerText = "incorrect";
        count++;
        counttimes = (counttimes-10)
        loadQuestion();
      }
    } else {
      allDone();
    }
  })
);



// alldone enter your name 
function allDone() {
  alldone.style.display = "flex";
  start.style.display = "none";
  question.style.display = "none";
}

// take input.value to save into local storage
function savehistory() {
  if(inputenter.value.length > 1){
  localStorage.setItem(inputenter.value, counttimes+1);
  }
  start.style.display = "flex";
  alldone.style.display = "none";
}

// click to save score in quiz
submit.addEventListener("click", savehistory);

// click to see highscores in quiz game 
viewhighscores.addEventListener("click", viewScores);

// function to see highsores in quiz game
function viewScores() {
  alldone.style.display = "none";
  start.style.display = "none";
  question.style.display = "none";
  highscores.style.display = "flex";
  for (let i = 0; i < localStorage.length; i++) {
    list.innerHTML += `
    <li>${localStorage.key(i)}- ${localStorage.getItem(
      localStorage.key(i)
    )}</li>
    `;
  }
}

// click to clean highscore history 
clearhighscores.addEventListener("click", () => {
  localStorage.clear();
  viewScores();
});
