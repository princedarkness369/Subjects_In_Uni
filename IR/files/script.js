(function(){
"use strict";

/* =========================================================
   THEME
========================================================= */
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("theme-icon-sun");
const moonIcon = document.getElementById("theme-icon-moon");

function applyTheme(mode){
  document.documentElement.setAttribute("data-theme", mode);
  sunIcon.style.display = mode === "dark" ? "none" : "block";
  moonIcon.style.display = mode === "dark" ? "block" : "none";
  try{ localStorage.setItem("exam-theme", mode); }catch(e){}
}
let initialTheme = "light";
try{
  const saved = localStorage.getItem("exam-theme");
  if(saved){ initialTheme = saved; }
  else if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches){ initialTheme = "dark"; }
}catch(e){}
applyTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* =========================================================
   SCREEN MANAGEMENT
========================================================= */
const screens = {
  start: document.getElementById("screen-start"),
  exam: document.getElementById("screen-exam"),
  results: document.getElementById("screen-results"),
  review: document.getElementById("screen-review"),
};
function showScreen(name){
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("bank-size").textContent = QUESTION_BANK.length;

/* =========================================================
   EXAM STATE
========================================================= */
const EXAM_LENGTH = 20;
const TIME_LIMIT_SECONDS = 20 * 60;
const MIX = { easy: 7, medium: 8, hard: 5 };

let examQuestions = [];   // array of prepared question objects for this attempt
let userAnswers = [];     // parallel array: index of selected option, or null
let currentIndex = 0;
let timeRemaining = TIME_LIMIT_SECONDS;
let timerInterval = null;
let examStartTs = null;
let examEndTs = null;

function shuffleArray(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickQuestions(){
  const byDiff = { easy: [], medium: [], hard: [] };
  QUESTION_BANK.forEach(q => { if(byDiff[q.difficulty]) byDiff[q.difficulty].push(q); });

  const picked = [];
  Object.keys(MIX).forEach(diff => {
    const pool = shuffleArray(byDiff[diff]);
    const n = Math.min(MIX[diff], pool.length);
    picked.push(...pool.slice(0, n));
  });

  // If a difficulty bucket ran short, top up from the remaining overall pool
  if(picked.length < EXAM_LENGTH){
    const usedQ = new Set(picked.map(q => q.question));
    const remaining = shuffleArray(QUESTION_BANK.filter(q => !usedQ.has(q.question)));
    while(picked.length < EXAM_LENGTH && remaining.length){
      picked.push(remaining.pop());
    }
  }

  return shuffleArray(picked).slice(0, EXAM_LENGTH);
}

function prepareExam(){
  const raw = pickQuestions();
  examQuestions = raw.map(q => {
    const optionObjs = q.options.map((text, i) => ({ text, isCorrect: i === q.answer }));
    const shuffledOpts = shuffleArray(optionObjs);
    return {
      topic: q.topic,
      difficulty: q.difficulty,
      question: q.question,
      explanation: q.explanation,
      options: shuffledOpts,                      // shuffled {text,isCorrect}
      correctIndex: shuffledOpts.findIndex(o => o.isCorrect),
    };
  });
  userAnswers = new Array(examQuestions.length).fill(null);
  currentIndex = 0;
  timeRemaining = TIME_LIMIT_SECONDS;
}

/* =========================================================
   START
========================================================= */
document.getElementById("btn-start").addEventListener("click", () => {
  prepareExam();
  buildJumpgrid();
  renderQuestion();
  startTimer();
  examStartTs = Date.now();
  showScreen("exam");
});

/* =========================================================
   TIMER
========================================================= */
const timerEl = document.getElementById("timer");
function startTimer(){
  clearInterval(timerInterval);
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeRemaining--;
    if(timeRemaining <= 0){
      timeRemaining = 0;
      updateTimerDisplay();
      clearInterval(timerInterval);
      finishExam(true);
      return;
    }
    updateTimerDisplay();
  }, 1000);
}
function updateTimerDisplay(){
  const m = Math.floor(timeRemaining / 60);
  const s = timeRemaining % 60;
  timerEl.textContent = `${m}:${s.toString().padStart(2,"0")}`;
  timerEl.classList.toggle("low", timeRemaining <= 60);
}

/* =========================================================
   RENDER QUESTION
========================================================= */
const qTopic = document.getElementById("q-topic");
const qDifficulty = document.getElementById("q-difficulty");
const qText = document.getElementById("q-text");
const qOptions = document.getElementById("q-options");
const questionCounter = document.getElementById("question-counter");
const progressFill = document.getElementById("progress-fill");
const answeredNote = document.getElementById("answered-note");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnFinish = document.getElementById("btn-finish");

const LETTERS = ["A","B","C","D"];

function renderQuestion(){
  const q = examQuestions[currentIndex];
  qTopic.textContent = q.topic;
  qDifficulty.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
  qDifficulty.className = "diff-tag " + q.difficulty;
  qText.textContent = q.question;

  qOptions.innerHTML = "";
  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option" + (userAnswers[currentIndex] === i ? " selected" : "");
    div.setAttribute("role", "radio");
    div.setAttribute("aria-checked", userAnswers[currentIndex] === i ? "true" : "false");
    div.tabIndex = 0;
    div.innerHTML = `<span class="option-letter">${LETTERS[i]}</span><span class="option-text"></span>`;
    div.querySelector(".option-text").textContent = opt.text;
    div.addEventListener("click", () => selectOption(i));
    div.addEventListener("keydown", (e) => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); selectOption(i); } });
    qOptions.appendChild(div);
  });

  questionCounter.textContent = `Question ${currentIndex + 1} / ${examQuestions.length}`;
  progressFill.style.width = `${((currentIndex) / (examQuestions.length - 1)) * 100}%`;

  const answeredCount = userAnswers.filter(a => a !== null).length;
  answeredNote.textContent = `${answeredCount} of ${examQuestions.length} answered`;

  btnPrev.disabled = currentIndex === 0;
  const isLast = currentIndex === examQuestions.length - 1;
  btnNext.style.display = isLast ? "none" : "inline-block";
  btnFinish.style.display = isLast ? "inline-block" : "none";

  updateJumpgrid();
}

function selectOption(i){
  userAnswers[currentIndex] = i; // one answer only: overwrite, never additive
  renderQuestion();
}

btnPrev.addEventListener("click", () => { if(currentIndex > 0){ currentIndex--; renderQuestion(); } });
btnNext.addEventListener("click", () => { if(currentIndex < examQuestions.length - 1){ currentIndex++; renderQuestion(); } });

/* =========================================================
   JUMP GRID
========================================================= */
const jumpgrid = document.getElementById("jumpgrid");
function buildJumpgrid(){
  jumpgrid.innerHTML = "";
  examQuestions.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.className = "jump-dot";
    btn.textContent = i + 1;
    btn.type = "button";
    btn.addEventListener("click", () => { currentIndex = i; renderQuestion(); });
    jumpgrid.appendChild(btn);
  });
}
function updateJumpgrid(){
  const dots = jumpgrid.querySelectorAll(".jump-dot");
  dots.forEach((d, i) => {
    d.classList.toggle("current", i === currentIndex);
    d.classList.toggle("done", userAnswers[i] !== null && i !== currentIndex);
  });
}

/* =========================================================
   FINISH FLOW
========================================================= */
const modalConfirm = document.getElementById("modal-confirm");
const confirmAnswered = document.getElementById("confirm-answered");

btnFinish.addEventListener("click", () => {
  const answeredCount = userAnswers.filter(a => a !== null).length;
  confirmAnswered.textContent = answeredCount;
  modalConfirm.style.display = "flex";
});
document.getElementById("btn-cancel-finish").addEventListener("click", () => { modalConfirm.style.display = "none"; });
document.getElementById("btn-confirm-finish").addEventListener("click", () => {
  modalConfirm.style.display = "none";
  finishExam(false);
});

function finishExam(timedOut){
  clearInterval(timerInterval);
  examEndTs = Date.now();
  renderResults(timedOut);
  showScreen("results");
}

/* =========================================================
   GRADING
========================================================= */
function computeScore(){
  let correct = 0;
  examQuestions.forEach((q, i) => { if(userAnswers[i] === q.correctIndex) correct++; });
  return correct;
}
function gradeFor(pct){
  if(pct >= 97) return "A+";
  if(pct >= 93) return "A";
  if(pct >= 90) return "A-";
  if(pct >= 87) return "B+";
  if(pct >= 83) return "B";
  if(pct >= 80) return "B-";
  if(pct >= 77) return "C+";
  if(pct >= 70) return "C";
  if(pct >= 60) return "D";
  return "F";
}
function formatDuration(sec){
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2,"0")}`;
}

/* =========================================================
   RESULTS SCREEN
========================================================= */
function renderResults(timedOut){
  const correct = computeScore();
  const total = examQuestions.length;
  const wrong = total - correct;
  const pct = Math.round((correct / total) * 100);
  const grade = gradeFor(pct);
  const elapsed = examStartTs ? Math.min(TIME_LIMIT_SECONDS, Math.round((examEndTs - examStartTs) / 1000)) : (TIME_LIMIT_SECONDS - timeRemaining);

  document.getElementById("results-eyebrow").textContent = timedOut ? "Time's up — exam auto-submitted" : "Exam complete";
  document.getElementById("score-fraction").textContent = `${correct}/${total}`;
  document.getElementById("score-grade").textContent = grade;
  document.getElementById("score-percent").textContent = `${pct}%`;
  document.getElementById("stat-correct").textContent = correct;
  document.getElementById("stat-wrong").textContent = wrong;
  document.getElementById("stat-time").textContent = formatDuration(elapsed);

  const ring = document.getElementById("ring-progress");
  const circumference = 2 * Math.PI * 70;
  ring.style.strokeDasharray = `${circumference}`;
  ring.style.strokeDashoffset = `${circumference}`;
  requestAnimationFrame(() => {
    const offset = circumference - (pct / 100) * circumference;
    ring.style.strokeDashoffset = `${offset}`;
  });

  let ringColor = "var(--accent)";
  if(pct < 60) ringColor = "var(--hard)";
  else if(pct < 80) ringColor = "var(--medium)";
  ring.style.stroke = ringColor;
}

document.getElementById("btn-restart").addEventListener("click", restartFlow);
document.getElementById("btn-restart-2").addEventListener("click", restartFlow);
function restartFlow(){
  showScreen("start");
}

/* =========================================================
   REVIEW SCREEN
========================================================= */
document.getElementById("btn-review").addEventListener("click", () => { renderReview(); showScreen("review"); });
document.getElementById("btn-review-back").addEventListener("click", () => showScreen("results"));

function renderReview(){
  const correct = computeScore();
  document.getElementById("review-summary").textContent = `${correct} / ${examQuestions.length} correct`;

  const list = document.getElementById("review-list");
  list.innerHTML = "";

  examQuestions.forEach((q, qi) => {
    const userIdx = userAnswers[qi];
    const isCorrect = userIdx === q.correctIndex;
    const wasSkipped = userIdx === null;

    const item = document.createElement("div");
    item.className = "review-item";

    const badgeClass = wasSkipped ? "skipped" : (isCorrect ? "correct" : "wrong");
    const badgeText = wasSkipped ? "Skipped" : (isCorrect ? "Correct" : "Incorrect");

    const top = document.createElement("div");
    top.className = "review-item-top";
    top.innerHTML = `
      <span class="review-badge ${badgeClass}">${badgeText}</span>
      <span class="meta-chip">Q${qi + 1} · ${q.topic} · ${q.difficulty}</span>
    `;
    item.appendChild(top);

    const qEl = document.createElement("p");
    qEl.className = "review-q";
    qEl.textContent = q.question;
    item.appendChild(qEl);

    const optsWrap = document.createElement("div");
    optsWrap.className = "review-options";
    q.options.forEach((opt, oi) => {
      const row = document.createElement("div");
      let cls = "review-option";
      if(oi === q.correctIndex) cls += " is-correct";
      else if(oi === userIdx) cls += " is-wrong-pick";
      row.className = cls;

      let tagLabel = "";
      if(oi === q.correctIndex) tagLabel = "Correct answer";
      else if(oi === userIdx) tagLabel = "Your answer";

      row.innerHTML = `<span class="option-letter">${LETTERS[oi]}</span><span class="option-text"></span>${tagLabel ? `<span class="review-tag-inline">${tagLabel}</span>` : ""}`;
      row.querySelector(".option-text").textContent = opt.text;
      optsWrap.appendChild(row);
    });
    item.appendChild(optsWrap);

    const explain = document.createElement("div");
    explain.className = "review-explain";
    explain.innerHTML = `<strong>Why:</strong> `;
    explain.appendChild(document.createTextNode(q.explanation));
    item.appendChild(explain);

    list.appendChild(item);
  });
}

/* =========================================================
   INIT
========================================================= */
showScreen("start");

})();
