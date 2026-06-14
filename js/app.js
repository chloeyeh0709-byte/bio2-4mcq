(function () {
  const params = new URLSearchParams(window.location.search);
  const setId = parseInt(params.get('set'), 10) || 1;
  const set = QUIZ_SETS.find((s) => s.id === setId) || QUIZ_SETS[0];

  const setEmojis = { 1: '📗', 2: '📘', 3: '📙' };
  document.getElementById('setTitle').textContent = `${setEmojis[set.id] || '📘'} ${set.title}`;
  document.getElementById('setSubtitle').textContent = `第 ${set.range[0]}～${set.range[1]} 題（多重選擇題，共 ${set.questions.length} 題）`;
  document.title = `${set.title} 多選題作答 - 基因工程筆記本`;

  const listEl = document.getElementById('questionList');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');
  const scorePanel = document.getElementById('scorePanel');
  const storageKey = `quiz-progress-set${set.id}`;

  let graded = false;

  function renderQuestions() {
    listEl.innerHTML = '';
    set.questions.forEach((q) => {
      const card = document.createElement('div');
      card.className = 'question-card';
      card.dataset.qid = q.id;

      const header = document.createElement('div');
      header.className = 'q-header';
      header.innerHTML = `
        <span class="q-number">${q.id}</span>
        <div class="q-text">${q.question}</div>
      `;
      card.appendChild(header);

      if (q.figure && FIGURES[q.figure]) {
        const fig = document.createElement('div');
        fig.className = 'q-figure';
        fig.innerHTML = FIGURES[q.figure];
        card.appendChild(fig);
      }

      const optionsEl = document.createElement('div');
      optionsEl.className = 'options';

      Object.entries(q.options).forEach(([key, text]) => {
        const label = document.createElement('label');
        label.className = 'option';
        label.dataset.key = key;
        label.innerHTML = `
          <input type="checkbox" value="${key}" />
          <span class="opt-key">(${key})</span>
          <span class="option-text">${text}</span>
        `;
        optionsEl.appendChild(label);
      });

      card.appendChild(optionsEl);

      const resultTag = document.createElement('div');
      resultTag.className = 'q-result-tag';
      resultTag.style.display = 'none';
      card.appendChild(resultTag);

      const explanation = document.createElement('div');
      explanation.className = 'explanation';
      explanation.style.display = 'none';
      explanation.textContent = q.explanation;
      card.appendChild(explanation);

      listEl.appendChild(card);
    });
  }

  function getSelected(card) {
    return Array.from(card.querySelectorAll('input[type="checkbox"]:checked')).map((cb) => cb.value);
  }

  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    const sa = [...a].sort();
    const sb = [...b].sort();
    return sa.every((v, i) => v === sb[i]);
  }

  function gradeAll() {
    let correctCount = 0;

    set.questions.forEach((q) => {
      const card = listEl.querySelector(`.question-card[data-qid="${q.id}"]`);
      const selected = getSelected(card);
      const isCorrect = sameSet(selected, q.answer);
      if (isCorrect) correctCount++;

      card.classList.add('graded');

      card.querySelectorAll('.option').forEach((opt) => {
        const key = opt.dataset.key;
        const isAnswer = q.answer.includes(key);
        const isPicked = selected.includes(key);

        if (isAnswer) {
          opt.classList.add('is-correct-answer');
        }
        if (isPicked && !isAnswer) {
          opt.classList.add('is-wrong-pick');
        }
      });

      const tag = card.querySelector('.q-result-tag');
      tag.style.display = 'inline-block';
      if (isCorrect) {
        tag.textContent = '✅ 答對了！';
        tag.className = 'q-result-tag correct';
      } else {
        tag.textContent = `❌ 答錯了，正解：(${q.answer.join(')(')})`;
        tag.className = 'q-result-tag wrong';
      }

      const explanation = card.querySelector('.explanation');
      explanation.style.display = 'block';
    });

    graded = true;
    showScore(correctCount);
    localStorage.setItem(storageKey, JSON.stringify({ score: correctCount, total: set.questions.length }));

    submitBtn.textContent = '✅ 已對完答案';
    submitBtn.disabled = true;
  }

  function showScore(correctCount) {
    scorePanel.classList.add('show');
    scorePanel.textContent = `🎯 本份成績：${correctCount} / ${set.questions.length} 題全對`;
  }

  function resetQuiz() {
    graded = false;
    scorePanel.classList.remove('show');
    submitBtn.disabled = false;
    submitBtn.textContent = '✅ 對答案';
    renderQuestions();
  }

  submitBtn.addEventListener('click', () => {
    if (!graded) gradeAll();
  });

  resetBtn.addEventListener('click', resetQuiz);

  renderQuestions();
})();
