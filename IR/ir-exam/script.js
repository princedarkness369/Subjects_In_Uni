(function(){
  "use strict";

  // ---------- Config ----------
  const EXAM_SIZE = 20;
  const COUNTS = { easy: 7, medium: 8, hard: 5 };
  const TIME_LIMIT_SEC = 20 * 60;

  // ---------- State ----------
  let examQuestions = [];   // array of {source, options:[{text,isCorrect}], ...}
  let answers = [];         // answers[i] = selected option index or null
  let currentIndex = 0;
  let timeLeft = TIME_LIMIT_SEC;
  let timerHandle = null;
  let startedAt = null;
  let finishedAt = null;
  let examFinished = false;

  // ---------- Elements ----------
  const el = (id) => document.getElementById(id);
  const screens = {
    start: el('screen-start'),
    exam: el('screen-exam'),
    results: el('screen-results'),
    review: el('screen-review'),
  };

  function showScreen(name){
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    window.scrollTo({top:0, behavior:'instant' in window ? 'instant' : 'auto'});
  }

  function toast(msg){
    const t = el('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._h);
    toast._h = setTimeout(()=> t.classList.remove('show'), 2200);
  }

  // ---------- Dark mode ----------
  function initDarkMode(){
    const saved = localStorageSafeGet('ir-exam-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
    el('darkModeToggle').addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = cur === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorageSafeSet('ir-exam-theme', next);
    });
  }
  function applyTheme(theme){
    if (theme === 'dark'){
      document.documentElement.setAttribute('data-theme','dark');
      el('iconMoon').style.display = 'none';
      el('iconSun').style.display = '';
    } else {
      document.documentElement.removeAttribute('data-theme');
      el('iconMoon').style.display = '';
      el('iconSun').style.display = 'none';
    }
  }
  // in-memory fallback storage (artifacts/sandbox may block localStorage)
  const memStore = {};
  function localStorageSafeGet(k){ try { return window.localStorage.getItem(k) || memStore[k] || null; } catch(e){ return memStore[k] || null; } }
  function localStorageSafeSet(k,v){ try { window.localStorage.setItem(k,v); } catch(e){ memStore[k]=v; } }

  // ---------- Utilities ----------
  function shuffle(arr){
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickExamQuestions(){
    const byDiff = { easy: [], medium: [], hard: [] };
    QUESTION_BANK.forEach(q => { if (byDiff[q.difficulty]) byDiff[q.difficulty].push(q); });

    let selected = [];
    ['easy','medium','hard'].forEach(diff => {
      const need = COUNTS[diff];
      const pool = shuffle(byDiff[diff]);
      selected = selected.concat(pool.slice(0, Math.min(need, pool.length)));
    });

    // If bank doesn't have enough of a difficulty, top up from the rest to reach EXAM_SIZE
    if (selected.length < EXAM_SIZE){
      const usedSet = new Set(selected);
      const remainder = shuffle(QUESTION_BANK.filter(q => !usedSet.has(q)));
      for (const q of remainder){
        if (selected.length >= EXAM_SIZE) break;
        selected.push(q);
      }
    }

    selected = shuffle(selected).slice(0, EXAM_SIZE);

    // Build exam-ready copies with shuffled options
    return selected.map(src => {
      const optionObjs = src.options.map((text, idx) => ({ text, isCorrect: idx === src.correct }));
      const shuffledOpts = shuffle(optionObjs);
      return {
        topic: src.topic,
        difficulty: src.difficulty,
        question: src.question,
        explanation: src.explanation,
        options: shuffledOpts, // [{text,isCorrect}]
      };
    });
  }

  // ---------- Exam flow ----------
  function startExam(){
    examQuestions = pickExamQuestions();
    answers = new Array(examQuestions.length).fill(null);
    currentIndex = 0;
    timeLeft = TIME_LIMIT_SEC;
    startedAt = Date.now();
    finishedAt = null;
    examFinished = false;

    buildDots();
    renderQuestion();
    startTimer();
    showScreen('exam');
  }

  function startTimer(){
    clearInterval(timerHandle);
    updateTimerDisplay();
    timerHandle = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0){
        clearInterval(timerHandle);
        toast("Time's up! Submitting your exam…");
        finishExam();
      }
    }, 1000);
  }

  function updateTimerDisplay(){
    const t = el('timer');
    const m = Math.floor(Math.max(timeLeft,0) / 60);
    const s = Math.max(timeLeft,0) % 60;
    t.textContent = `${m}:${String(s).padStart(2,'0')}`;
    t.classList.remove('warn','danger');
    if (timeLeft <= 60) t.classList.add('danger');
    else if (timeLeft <= 300) t.classList.add('warn');
  }

  function buildDots(){
    const wrap = el('qDots');
    wrap.innerHTML = '';
    examQuestions.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'dot';
      d.title = `Question ${i+1}`;
      d.addEventListener('click', () => { currentIndex = i; renderQuestion(); });
      wrap.appendChild(d);
    });
  }

  function updateDots(){
    const dots = el('qDots').children;
    for (let i=0; i<dots.length; i++){
      dots[i].classList.toggle('answered', answers[i] !== null);
      dots[i].classList.toggle('current', i === currentIndex);
    }
  }

  function renderQuestion(){
    const q = examQuestions[currentIndex];
    el('qCounter').textContent = `Question ${currentIndex+1} / ${examQuestions.length}`;
    const answeredCount = answers.filter(a => a !== null).length;
    el('answeredCounter').textContent = `${answeredCount} answered`;
    el('progressFill').style.width = `${((currentIndex+1)/examQuestions.length)*100}%`;

    const diffBadge = el('qDifficulty');
    diffBadge.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
    diffBadge.className = 'badge badge-' + q.difficulty;
    el('qTopic').textContent = q.topic;
    el('qText').textContent = q.question;

    const optsWrap = el('options');
    optsWrap.innerHTML = '';
    const letters = ['A','B','C','D'];
    q.options.forEach((opt, idx) => {
      const div = document.createElement('div');
      div.className = 'option';
      if (answers[currentIndex] === idx) div.classList.add('selected');
      div.innerHTML = `<span class="opt-letter">${letters[idx]}</span><span class="opt-text"></span>`;
      div.querySelector('.opt-text').textContent = opt.text;
      div.addEventListener('click', () => selectOption(idx));
      optsWrap.appendChild(div);
    });

    el('prevBtn').disabled = currentIndex === 0;
    el('nextBtn').textContent = currentIndex === examQuestions.length - 1 ? 'Next ▶' : 'Next ▶';
    el('nextBtn').disabled = currentIndex === examQuestions.length - 1;

    updateDots();
  }

  function selectOption(idx){
    answers[currentIndex] = idx; // prevents selecting more than one: overwrites previous choice
    renderQuestion();
  }

  function finishExam(){
    if (examFinished) return;
    examFinished = true;
    clearInterval(timerHandle);
    finishedAt = Date.now();
    renderResults();
    showScreen('results');
  }

  function computeScore(){
    let correct = 0, wrong = 0, unanswered = 0;
    examQuestions.forEach((q, i) => {
      const a = answers[i];
      if (a === null) unanswered++;
      else if (q.options[a].isCorrect) correct++;
      else wrong++;
    });
    return { correct, wrong, unanswered, total: examQuestions.length };
  }

  function gradeFor(pct){
    if (pct >= 95) return 'A+';
    if (pct >= 90) return 'A';
    if (pct >= 85) return 'B+';
    if (pct >= 80) return 'B';
    if (pct >= 70) return 'C';
    if (pct >= 60) return 'D';
    return 'F';
  }

  function renderResults(){
    const { correct, wrong, unanswered, total } = computeScore();
    const pct = Math.round((correct/total)*100);
    const grade = gradeFor(pct);

    el('gradeCircle').textContent = grade;
    el('scoreFraction').textContent = `${correct} / ${total}`;
    el('scorePercent').textContent = `${pct}%`;
    el('statCorrect').textContent = correct;
    el('statWrong').textContent = wrong;
    el('statUnanswered').textContent = unanswered;

    const elapsedSec = Math.round(((finishedAt || Date.now()) - startedAt) / 1000);
    const m = Math.floor(elapsedSec/60), s = elapsedSec%60;
    el('statTime').textContent = `${m}:${String(s).padStart(2,'0')}`;
  }

  function renderReview(){
    const wrap = el('reviewList');
    wrap.innerHTML = '';
    const letters = ['A','B','C','D'];

    examQuestions.forEach((q, i) => {
      const a = answers[i];
      const correctIdx = q.options.findIndex(o => o.isCorrect);
      const item = document.createElement('div');
      item.className = 'review-item';

      const tag = a === null ? 'skipped' : (q.options[a].isCorrect ? 'correct' : 'wrong');
      const tagLabel = tag === 'skipped' ? 'Skipped' : (tag === 'correct' ? 'Correct' : 'Incorrect');

      const head = document.createElement('div');
      head.className = 'review-item-head';
      head.innerHTML = `<span class="review-index">Question ${i+1}</span>
                         <span class="result-tag ${tag}">${tagLabel}</span>
                         <span class="badge badge-${q.difficulty}">${q.difficulty}</span>`;
      item.appendChild(head);

      const qEl = document.createElement('div');
      qEl.className = 'review-q';
      qEl.textContent = q.question;
      item.appendChild(qEl);

      const optsWrap = document.createElement('div');
      optsWrap.className = 'options';
      q.options.forEach((opt, idx) => {
        const div = document.createElement('div');
        div.className = 'option locked';
        if (idx === correctIdx) div.classList.add('correct-answer');
        if (a === idx && idx !== correctIdx) div.classList.add('wrong-answer');
        div.innerHTML = `<span class="opt-letter">${letters[idx]}</span><span class="opt-text"></span>`;
        div.querySelector('.opt-text').textContent = opt.text +
          (idx === correctIdx ? '  ✓' : (a === idx ? '  ✕' : ''));
        optsWrap.appendChild(div);
      });
      item.appendChild(optsWrap);

      const studentAnsText = a === null ? 'No answer selected' : `${letters[a]}. ${q.options[a].text}`;
      const correctAnsText = `${letters[correctIdx]}. ${q.options[correctIdx].text}`;

      const exp = document.createElement('div');
      exp.className = 'explanation';
      exp.innerHTML = `<div><strong>Your answer:</strong> ${escapeHTML(studentAnsText)}</div>
                        <div><strong>Correct answer:</strong> ${escapeHTML(correctAnsText)}</div>
                        <div style="margin-top:8px;">${escapeHTML(q.explanation)}</div>`;
      item.appendChild(exp);

      const ref = document.createElement('div');
      ref.className = 'ref-topic';
      ref.textContent = `Reference topic: ${q.topic}`;
      item.appendChild(ref);

      wrap.appendChild(item);
    });
  }

  function escapeHTML(str){
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // ---------- Wire up events ----------
  function init(){
    initDarkMode();
    el('bankCount').textContent = QUESTION_BANK.length;

    el('startBtn').addEventListener('click', startExam);

    el('prevBtn').addEventListener('click', () => {
      if (currentIndex > 0){ currentIndex--; renderQuestion(); }
    });
    el('nextBtn').addEventListener('click', () => {
      if (currentIndex < examQuestions.length - 1){ currentIndex++; renderQuestion(); }
    });
    el('finishBtn').addEventListener('click', () => {
      const unanswered = answers.filter(a => a === null).length;
      if (unanswered > 0){
        const ok = window.confirm(`You have ${unanswered} unanswered question(s). Finish anyway?`);
        if (!ok) return;
      }
      finishExam();
    });

    el('reviewBtn').addEventListener('click', () => {
      renderReview();
      showScreen('review');
    });
    el('restartBtn').addEventListener('click', resetToStart);
    el('restartBtn2').addEventListener('click', resetToStart);
  }

  function resetToStart(){
    clearInterval(timerHandle);
    showScreen('start');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
