(function(){
  "use strict";

  const EXAM_LENGTH = 20;
  const EXAM_SECONDS = 20 * 60;
  const LETTERS = ["A", "B", "C", "D"];

  // ---------- State ----------
  let examQuestions = [];   // array of {topic, difficulty, q, options, correct, exp} with SHUFFLED options
  let userAnswers = [];     // parallel array, index of chosen option or null
  let currentIndex = 0;
  let timeRemaining = EXAM_SECONDS;
  let timerInterval = null;
  let examStartedAt = null;
  let examFinishedAt = null;

  // ---------- Elements ----------
  const el = {
    screenStart: document.getElementById("screen-start"),
    screenExam: document.getElementById("screen-exam"),
    screenResults: document.getElementById("screen-results"),
    screenReview: document.getElementById("screen-review"),

    btnStart: document.getElementById("btnStart"),
    statBankSize: document.getElementById("statBankSize"),

    progressFill: document.getElementById("progressFill"),
    questionCounter: document.getElementById("questionCounter"),
    answeredCounter: document.getElementById("answeredCounter"),
    timerText: document.getElementById("timerText"),
    timerBox: document.getElementById("timer"),

    qTopic: document.getElementById("qTopic"),
    qDifficulty: document.getElementById("qDifficulty"),
    qText: document.getElementById("qText"),
    optionsList: document.getElementById("optionsList"),

    btnPrev: document.getElementById("btnPrev"),
    btnNext: document.getElementById("btnNext"),
    btnFinish: document.getElementById("btnFinish"),
    btnFlagJump: document.getElementById("btnFlagJump"),
    qgrid: document.getElementById("qgrid"),

    ringFill: document.getElementById("ringFill"),
    scoreFraction: document.getElementById("scoreFraction"),
    scorePercent: document.getElementById("scorePercent"),
    gradeBadge: document.getElementById("gradeBadge"),
    resultsMessage: document.getElementById("resultsMessage"),
    statCorrect: document.getElementById("statCorrect"),
    statWrong: document.getElementById("statWrong"),
    statTime: document.getElementById("statTime"),

    btnReview: document.getElementById("btnReview"),
    btnRestart: document.getElementById("btnRestart"),
    btnRestart2: document.getElementById("btnRestart2"),
    btnBackToResults: document.getElementById("btnBackToResults"),
    reviewList: document.getElementById("reviewList"),

    themeToggle: document.getElementById("themeToggle"),
  };

  el.statBankSize.textContent = QUESTION_BANK.length;

  // ---------- Utilities ----------
  function shuffle(arr){
    const a = arr.slice();
    for(let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function formatTime(totalSeconds){
    const s = Math.max(0, totalSeconds);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  }

  function showScreen(name){
    el.screenStart.hidden = name !== "start";
    el.screenExam.hidden = name !== "exam";
    el.screenResults.hidden = name !== "results";
    el.screenReview.hidden = name !== "review";
    window.scrollTo({top: 0, behavior: "instant" in window ? "instant" : "auto"});
  }

  // ---------- Build a fresh exam ----------
  function buildExam(){
    const pool = shuffle(QUESTION_BANK);
    const picked = pool.slice(0, Math.min(EXAM_LENGTH, pool.length));

    examQuestions = picked.map(orig => {
      const optionOrder = shuffle([0, 1, 2, 3]);           // positions -> original indices
      const shuffledOptions = optionOrder.map(i => orig.options[i]);
      const newCorrectIndex = optionOrder.indexOf(orig.correct);
      return {
        topic: orig.topic,
        difficulty: orig.difficulty,
        q: orig.q,
        options: shuffledOptions,
        correct: newCorrectIndex,
        exp: orig.exp,
      };
    });

    userAnswers = new Array(examQuestions.length).fill(null);
    currentIndex = 0;
    timeRemaining = EXAM_SECONDS;
    examStartedAt = Date.now();
    examFinishedAt = null;
  }

  // ---------- Timer ----------
  function startTimer(){
    clearInterval(timerInterval);
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay();
      if(timeRemaining <= 0){
        clearInterval(timerInterval);
        finishExam();
      }
    }, 1000);
  }

  function updateTimerDisplay(){
    el.timerText.textContent = formatTime(timeRemaining);
    el.timerBox.classList.toggle("low", timeRemaining <= 60);
  }

  // ---------- Rendering: exam screen ----------
  function renderQuestion(){
    const item = examQuestions[currentIndex];

    el.qTopic.textContent = item.topic;
    el.qDifficulty.textContent = item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1);
    el.qDifficulty.className = "pill pill-diff " + item.difficulty;
    el.qText.textContent = item.q;

    el.optionsList.innerHTML = "";
    item.options.forEach((optText, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option" + (userAnswers[currentIndex] === idx ? " selected" : "");
      btn.innerHTML = '<span class="opt-letter">' + LETTERS[idx] + '</span><span>' + escapeHtml(optText) + '</span>';
      btn.addEventListener("click", () => selectAnswer(idx));
      el.optionsList.appendChild(btn);
    });

    el.questionCounter.textContent = "Question " + (currentIndex + 1) + " of " + examQuestions.length;
    const answeredCount = userAnswers.filter(a => a !== null).length;
    el.answeredCounter.textContent = answeredCount + " answered";
    el.progressFill.style.width = (((currentIndex + 1) / examQuestions.length) * 100) + "%";

    el.btnPrev.disabled = currentIndex === 0;
    const isLast = currentIndex === examQuestions.length - 1;
    el.btnNext.hidden = isLast;
    el.btnFinish.hidden = !isLast;

    renderGrid();
  }

  function escapeHtml(str){
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function selectAnswer(idx){
    userAnswers[currentIndex] = idx;
    renderQuestion();
  }

  function renderGrid(){
    el.qgrid.innerHTML = "";
    examQuestions.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "qdot" +
        (userAnswers[i] !== null ? " answered" : "") +
        (i === currentIndex ? " current" : "");
      dot.textContent = i + 1;
      dot.addEventListener("click", () => { currentIndex = i; renderQuestion(); });
      el.qgrid.appendChild(dot);
    });
  }

  function jumpToUnanswered(){
    const idx = userAnswers.findIndex(a => a === null);
    if(idx === -1){
      // all answered — jump to finish confirmation feel: just go to last question
      currentIndex = examQuestions.length - 1;
    } else {
      currentIndex = idx;
    }
    renderQuestion();
  }

  // ---------- Navigation ----------
  el.btnPrev.addEventListener("click", () => {
    if(currentIndex > 0){ currentIndex--; renderQuestion(); }
  });
  el.btnNext.addEventListener("click", () => {
    if(currentIndex < examQuestions.length - 1){ currentIndex++; renderQuestion(); }
  });
  el.btnFlagJump.addEventListener("click", jumpToUnanswered);
  el.btnFinish.addEventListener("click", () => {
    const unanswered = userAnswers.filter(a => a === null).length;
    if(unanswered > 0){
      const proceed = confirm(unanswered + " question(s) are unanswered. Finish anyway?");
      if(!proceed) return;
    }
    finishExam();
  });

  // ---------- Start / Finish / Restart ----------
  el.btnStart.addEventListener("click", () => {
    buildExam();
    showScreen("exam");
    renderQuestion();
    startTimer();
  });

  function finishExam(){
    clearInterval(timerInterval);
    examFinishedAt = Date.now();
    renderResults();
    showScreen("results");
  }

  function restart(){
    showScreen("start");
  }
  el.btnRestart.addEventListener("click", restart);
  el.btnRestart2.addEventListener("click", restart);

  // ---------- Results ----------
  function computeScore(){
    let correct = 0;
    examQuestions.forEach((item, i) => {
      if(userAnswers[i] === item.correct) correct++;
    });
    return correct;
  }

  function gradeFor(pct){
    if(pct >= 97) return "A+";
    if(pct >= 93) return "A";
    if(pct >= 90) return "A-";
    if(pct >= 87) return "B+";
    if(pct >= 83) return "B";
    if(pct >= 80) return "B-";
    if(pct >= 70) return "C";
    if(pct >= 60) return "D";
    return "F";
  }

  function messageFor(pct){
    if(pct >= 90) return "Outstanding grasp of the material.";
    if(pct >= 80) return "Strong performance — just a few gaps to close.";
    if(pct >= 70) return "Solid foundation. Review the misses below.";
    if(pct >= 60) return "You're getting there. Focus on the review section.";
    return "Worth another pass through the lecture concepts.";
  }

  function renderResults(){
    const correct = computeScore();
    const total = examQuestions.length;
    const wrong = total - correct;
    const pct = Math.round((correct / total) * 100);

    el.scoreFraction.textContent = correct + "/" + total;
    el.scorePercent.textContent = pct + "%";
    el.statCorrect.textContent = correct;
    el.statWrong.textContent = wrong;

    const elapsedSec = Math.max(0, Math.round((examFinishedAt - examStartedAt) / 1000));
    el.statTime.textContent = formatTime(elapsedSec);

    const grade = gradeFor(pct);
    el.gradeBadge.textContent = grade;
    el.resultsMessage.textContent = messageFor(pct);

    const circumference = 2 * Math.PI * 70; // r=70
    const offset = circumference - (pct / 100) * circumference;
    el.ringFill.style.strokeDasharray = circumference;
    // force reflow so the transition plays from full offset
    el.ringFill.style.strokeDashoffset = circumference;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.ringFill.style.strokeDashoffset = offset;
      });
    });
  }

  // ---------- Review ----------
  el.btnReview.addEventListener("click", () => {
    renderReview();
    showScreen("review");
  });
  el.btnBackToResults.addEventListener("click", () => showScreen("results"));

  function renderReview(){
    el.reviewList.innerHTML = "";
    examQuestions.forEach((item, i) => {
      const userIdx = userAnswers[i];
      const isCorrect = userIdx === item.correct;

      const wrap = document.createElement("div");
      wrap.className = "review-item";

      const head = document.createElement("div");
      head.className = "review-item-head";
      head.innerHTML =
        '<span class="review-status ' + (isCorrect ? "ok" : "bad") + '">' + (isCorrect ? "Correct" : (userIdx === null ? "Unanswered" : "Incorrect")) + '</span>' +
        '<span class="pill pill-topic">' + escapeHtml(item.topic) + '</span>' +
        '<span class="pill pill-diff ' + item.difficulty + '">' + item.difficulty + '</span>';
      wrap.appendChild(head);

      const qEl = document.createElement("p");
      qEl.className = "review-q";
      qEl.textContent = (i + 1) + ". " + item.q;
      wrap.appendChild(qEl);

      const optsWrap = document.createElement("div");
      optsWrap.className = "review-options";
      item.options.forEach((optText, idx) => {
        const row = document.createElement("div");
        let cls = "review-opt";
        let tag = "";
        if(idx === item.correct){ cls += " correct"; tag = "Correct answer"; }
        else if(idx === userIdx){ cls += " incorrect"; tag = "Your answer"; }
        row.className = cls;
        row.innerHTML = '<span class="tag">' + LETTERS[idx] + (tag ? " · " + tag : "") + '</span><span>' + escapeHtml(optText) + '</span>';
        optsWrap.appendChild(row);
      });
      wrap.appendChild(optsWrap);

      const explain = document.createElement("div");
      explain.className = "review-explain";
      explain.innerHTML = "<strong>Why:</strong> " + escapeHtml(item.exp) + '<br><strong>Reference topic:</strong> ' + escapeHtml(item.topic);
      wrap.appendChild(explain);

      el.reviewList.appendChild(wrap);
    });
  }

  // ---------- Theme ----------
  function applyTheme(mode){
    document.body.classList.toggle("dark", mode === "dark");
  }
  function initTheme(){
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    let stored = null;
    try { stored = window.__examThemePreference || null; } catch(e){ stored = null; }
    applyTheme(stored || (prefersDark ? "dark" : "light"));
  }
  el.themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    window.__examThemePreference = next;
  });

  // ---------- Init ----------
  initTheme();
  showScreen("start");

})();
