// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";




const firebaseConfig = {
  apiKey: "AIzaSyBLYrdbSfFHP5PZGJ0qawMyQn6aPKt3Yxs",
  authDomain: "assignemnt1-28523.firebaseapp.com",
  databaseURL: "https://assignemnt1-28523-default-rtdb.firebaseio.com",
  projectId: "assignemnt1-28523",
  storageBucket: "assignemnt1-28523.appspot.com",
  messagingSenderId: "738976973462",
  appId: "1:738976973462:web:32b36c3c2f902ca6e6b8b7",
  measurementId: "G-XG720LXVZQ"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase();

var questions = [];



async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    var reference = ref(db, "questions/");
    onChildAdded(reference, function (data) {
      questions.push(data.val());
      console.log(questions);
      resolve();
    });
  });
}



async function startQuiz() {
  await getDataFromDatabase();
  renderQuestion();
}

var currQuestion = document.getElementById("currQuestion");
var totalQuestion = document.getElementById("totalQuestion");
var question = document.getElementById("question");
var renderAns = document.getElementById("answer-parent");

var indexNum = 0;
var score = 0;


window.nextQuestion = function () {
  indexNum++;
  renderQuestion();
};


window.currAnswer = function (a, b) {
  if (a == b) {
    score++;
    console.log(score);
  }
  nextQuestion();
};


function renderQuestion() {
  currQuestion.innerHTML = indexNum + 1;
  totalQuestion.innerHTML = questions.length;

  if (indexNum < questions.length) {
    question.innerHTML = questions[indexNum].question;

    renderAns.innerHTML = "";
    for (var i = 0; i < questions[indexNum].options.length; i++) {
      renderAns.innerHTML += `<div class="answer">
        <button onclick="currAnswer('${questions[indexNum].options[i]}','${questions[indexNum].correctAns}')">${questions[indexNum].options[i]}</button>
      </div>`;
    }
  } else {
    alert("quiz is over end "+score)
    currQuestion.innerHTML = "Completed";
  }
}

startQuiz();
