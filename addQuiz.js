// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";



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


var question = document.getElementById("question");
var optionsInput = document.getElementById("optionsInput");
var optionsParent = document.getElementById("options-parent");
var correctAnsEle = document.getElementById("correctAns");


var options = [];

var correctAns;


window.renderOptions = function () {
  optionsParent.innerHTML = "";
  for (let i = 0; i < options.length; i++) {
    optionsParent.innerHTML += `<li onclick="correctOption('${options[i]}')">${options[i]}</li>`;
  }
};

window.addOptions = function () {
  if (!optionsInput.value) {
    alert(" first enter value ")
    return;
  }
  options.push(optionsInput.value);
  renderOptions();
  optionsInput.value = "";
};


window.correctOption = function (a) {
  correctAns = a;
  correctAnsEle.innerHTML = correctAns;
};


window.submitQuestion = function () {
  var obj = {
    question: question.value,
    options: options,
    correctAns: correctAns,
  };

  
  const newQuestionRef = push(ref(db, "questions/"));
  set(newQuestionRef, obj)
    .then(() => {
      alert("question added now")
    })
    .catch((error) => {
      alert(error.message)
    });

  question.value = "";
  optionsInput.value = "";
  options = [];
  optionsParent.innerHTML = "";
  correctAnsEle.innerHTML = "Correct Answer";
};