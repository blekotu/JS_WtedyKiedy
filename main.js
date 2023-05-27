const slots = [...document.querySelectorAll(".slot")];
const cards = [...document.querySelectorAll(".karta")];
const scores = document.querySelector(".score");
const currentQuestion = document.querySelector(".current-question");
let answer = 0;
let questionNumber = 0;
const card_deck = document.querySelector(".card-deck");
let correctAnswers = 0;
let allQuestions = 0;
let pytania = pytania_all;
let failmessage = "";
let scoremessages={}
let language = "PL";
const popup_title=document.querySelector(".popup-text-title")
const popup_body=document.querySelector(".popup-text-body")

let onboarding_title="";
let onboarding_body="";




displayLanguages();
changeLanguage(language);

function displayInfo()  {
    
  const infoBox=document.querySelector('.popup');
    
  if (infoBox.classList.contains("popup-visible")) {
    infoBox.classList.remove("popup-visible");
  } else {
    infoBox.classList.add("popup-visible");
  };
 
}


function changeLanguage(language) {
  const buttons = document.querySelectorAll(".language");
  buttons.forEach((e) =>
    e.classList.contains(language)
      ? e.classList.add("langSelected")
      : e.classList.remove("langSelected")
  );

  if (language == "ENG") {
    pytania = pytania_all_en;
    currentQuestion.innerHTML = `<p class="current-question-text"
                            >${pytania[questionNumber][1]}</p>`;
    failmessage = "Wrong answer! It was on ";
    scoremessages = {"answers":"Score :","questions":"Questions :"};
    onboarding_title=onboarding[1][1];
    onboarding_body=onboarding[1][2];
    
  } else {
    language = "PL";
    pytania = pytania_all;
    currentQuestion.innerHTML = `<p class="current-question-text"
                            >${pytania[questionNumber][1]}</p>`;
    failmessage = "Zła odpowiedź! To miało miejsce w ";
    scoremessages = {"answers":"Punkty :","questions":"Pytania :"};
    onboarding_title=onboarding[0][1];
    onboarding_body=onboarding[0][2];
    
  }
  printScores();
  popup_title.innerHTML=`<p> ${onboarding_title} </p><p class="onboarding-close">X</p>`;
  popup_body.innerHTML=`<p> ${onboarding_body} </p>`;
  const popup_close=document.querySelector(".onboarding-close");
  popup_close.addEventListener('click',displayInfo)
}


function displayLanguages() {
  let html;
  html ='<p class="info-icon" onclick="displayInfo()">&#9432</p>'
  html += `<input class="language PL"  type="button" onclick="changeLanguage('PL')" value="PL">`;
  html += `<input class="language ENG" type="button" onclick="changeLanguage('ENG')" value="ENG">`;
  
  //html+='<input class="language info-button" type="button" onclick="displayInfo()" value=&#9432>';

  card_deck.innerHTML = html;
}

function printScores() {
  results = `<p> Correctly Answered : ${correctAnswers}</p>`;
  results += `<p> All questions : ${allQuestions}</p>`;

  results += `<p> Your efficiency : ${(
    (correctAnswers / allQuestions) *
    100
  ).toFixed(2)}%</p>`;

  results=`<div class="score-text">
    <p>${scoremessages["answers"]}</p><p>${scoremessages["questions"]}</p></div>
    <div class="score-result">
    <img src='./img/ring1.png'>
    <img src='./img/ring2.png'>
    <p class="score-result-correct">${correctAnswers}</p>
    <p class="score-result-all">${allQuestions}</p></div>
    </div>`;
  scores.innerHTML = results;
}

function wygrana() {
  currentQuestion.classList.add("winner");
}

function startOver() {
  currentQuestion.classList.remove("winner");
  // clean the board from cards
  cards.forEach((card) => {
    card.classList.remove("placed");
    card.innerHTML = "";
    card.data = "";
  });

  slots.forEach((slot) => (slot.style.visibility = "hidden"));
  correctAnswers = 0; //on table will grow with placeCard

  //place First card on the board
  questionNumber = Math.floor(Math.random(1) * pytania.length);
  placeCard(4, questionNumber);
  pytania.filter((e) => e[0] != questionNumber); //remove placed question from questions deck
  slots.forEach((slot) => slot.addEventListener("click", answer_selection));

  allQuestions = 1; //as one answered on table
  newQuestion();
}

function shiftCardsLeft(start) {
  for (let i = 1; i < start + 1; i++) {
    cards[i - 1].innerHTML = cards[i].innerHTML;
    cards[i - 1].data = cards[i].data;
    cards[i - 1].data ? cards[i - 1].classList.add("placed") : 1;
  }
}

function shiftCardsRight(start) {
  for (let i = 8; i > start; i--) {
    cards[i + 1].innerHTML = cards[i].innerHTML;
    cards[i + 1].data = cards[i].data;
    cards[i + 1].data ? cards[i + 1].classList.add("placed") : 1;
  }
}

function wrongAnswer() {
  //Wrong Answer!
  alert(`${failmessage} ${pytania[questionNumber][0]}`);
  slots.forEach((slot) => (slot.style.visibility = "hidden"));
}

function answer_selection(e) {
  let data_min = 0;
  let data_max = 0;
  let coto = slots.findIndex((element) => element == this);

  switch (coto) {
    case 0: //Most left select slot >> most left card[0] placed
      data_max = cards[coto].data;
      if (data_max < pytania[questionNumber][0]) {
        wrongAnswer();
      } else {
        shiftCardsRight(0);
        placeCard(0, questionNumber);
      }
      break;
    case 10: //Most right select slot >> most left card[9] placed
      data_min = cards[coto - 1].data;
      if (data_min > pytania[questionNumber][0]) {
        wrongAnswer();
      } else {
        shiftCardsLeft(9);
        placeCard(9, questionNumber);
      }
      break;
    default: //slots 0<n<10
      cards[coto].data ? (data_max = cards[coto].data) : (data_max = 100000);
      cards[coto - 1].data
        ? (data_min = cards[coto - 1].data)
        : (data_min = -100000);
      if (
        pytania[questionNumber][0] < data_min ||
        pytania[questionNumber][0] > data_max
      ) {
        wrongAnswer();
      } else {
        //correct answer
        if (data_max == 100000) {
          //and cardslot on right empty
          placeCard(coto, questionNumber);
        } else if (data_min == -100000) {
          // and cardslot on left empty
          placeCard(coto - 1, questionNumber);
        } else {
          // correct but in between cards >> need to shift cards
          //cards.slice(coto)      All from coto to end with coto
          //cards.slice(0,coto)    All from 0 to coto without coto
          const freeLeft = cards
            .slice(0, coto)
            .filter((card) => !card.classList.contains("placed")).length;
          const freeRight = cards
            .slice(coto)
            .filter((card) => !card.classList.contains("placed")).length;
          freeLeft > freeRight
            ? shiftCardsLeft(coto)
            : shiftCardsRight(coto - 1);
          freeLeft > freeRight
            ? placeCard(coto - 1, questionNumber)
            : placeCard(coto, questionNumber);
        }
      }
  } //End Switch
  // cleanup currentQuestion and wait for clik
  currentQuestion.innerHTML = "";
  currentQuestion.addEventListener("click", newQuestion);
  currentQuestion.classList.add("clickable");
  // i usun pytanie ze stosu, niestety do zmiany jezyka
  pytania.filter((e) => e[0] != questionNumber);

  //Sprawdz czy juz nie koniec
  //(correctAnswers>=10)?wygrana():1;
  if (correctAnswers >= 10) {
    currentQuestion.addEventListener("click", startOver);
    wygrana();
  }
}

function formatQuestion(question) {
  return `<p class="pytanie"> ${question}</p>`;
}

function formatData(data) {
  let result = "";
  data < 0 ? (result = `${Math.abs(data)} BC`) : (result = data);
  return `<p class="data">${result}</p>`;
}

function placeCard(boardNumber, question) {
  //after correct answer reviel opacity and visibility
  const card = cards[boardNumber];
  card.classList.add("placed");
  card.innerHTML = formatData(pytania[question][0]);
  card.innerHTML += formatQuestion(pytania[question][1]);
  card.data = pytania[question][0];
  slots.forEach((slot) => (slot.style.visibility = "hidden"));

  correctAnswers++;
  printScores();
}

function showSlots() {
  //Show clickable slots between activ cards
  for (let i = 0; i < 10; i++) {
    if (cards[i].classList.contains("placed")) {
      i >= 0 ? (slots[i].style.visibility = "visible") : 1;
      i <= 9 ? (slots[i + 1].style.visibility = "visible") : 1;
    }
  }
}

function newQuestion() {
  const numberOfQuestions = pytania.length; //total number of questions
  const question = Math.floor(Math.random(1) * numberOfQuestions);

  //(currentQuestion.classList.contains('winner'))? startOver():1;

  questionNumber = question;
  currentQuestion.innerHTML = `<p class="current-question-text"
                            >${pytania[questionNumber][1]}</p>`;
  // for trouble shooring add odp ${pytania[numerPytania][0]
  showSlots();

  currentQuestion.removeEventListener("click", newQuestion);
  currentQuestion.classList.remove("clickable");

  //card_deck.style.visibility="hidden"
  allQuestions++;
  printScores();
  //REMOVE AT END
  answer = pytania[questionNumber][0];
}


startOver();

//Watching clicks for open slots between cards
slots.forEach((slot) => slot.addEventListener("click", answer_selection));
