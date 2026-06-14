// 讀取網址參數 ?set=1 / 2 / 3，決定要顯示哪 10 題
const params = new URLSearchParams(window.location.search);
const setNum = parseInt(params.get('set'), 10) || 1;

const ranges = {
  1: { start: 1, end: 10, title: '📒 第一份：第 1～10 題' },
  2: { start: 11, end: 20, title: '📒 第二份：第 11～20 題' },
  3: { start: 21, end: 30, title: '📒 第三份：第 21～30 題' }
};

const range = ranges[setNum] || ranges[1];
document.getElementById('set-title').textContent = range.title;

const questions = quizData.filter(q => q.id >= range.start && q.id <= range.end);

const answeredSet = new Set();

function diagramSVG() {
  return `
  <svg viewBox="0 0 480 160" xmlns="http://www.w3.org/2000/svg">
    <!-- 甲：質體 -->
    <circle cx="60" cy="50" r="34" fill="none" stroke="#7aa6c2" stroke-width="4"/>
    <text x="60" y="55" text-anchor="middle" font-size="18" fill="#5a5340">甲</text>

    <!-- 乙：切割酵素 -->
    <text x="130" y="35" text-anchor="middle" font-size="16" fill="#c2547a">乙</text>
    <path d="M105 50 L155 50" stroke="#999" stroke-width="3" marker-end="url(#arrow)"/>

    <!-- 丙：目標基因 -->
    <rect x="160" y="35" width="60" height="20" rx="4" fill="none" stroke="#9bbf72" stroke-width="4"/>
    <text x="190" y="80" text-anchor="middle" font-size="18" fill="#5a5340">丙</text>

    <!-- 丁：接合酵素 -->
    <text x="270" y="35" text-anchor="middle" font-size="16" fill="#c2547a">丁</text>
    <path d="M230 50 L300 50" stroke="#999" stroke-width="3" marker-end="url(#arrow)"/>

    <!-- 重組 DNA -->
    <circle cx="360" cy="50" r="34" fill="none" stroke="#7aa6c2" stroke-width="4"/>
    <rect x="345" y="40" width="30" height="14" rx="3" fill="none" stroke="#9bbf72" stroke-width="3"/>
    <text x="360" y="100" text-anchor="middle" font-size="14" fill="#5a5340">重組 DNA</text>

    <!-- 箭頭到細菌 -->
    <path d="M400 50 L430 50" stroke="#999" stroke-width="3" marker-end="url(#arrow)"/>

    <!-- 細菌 E / F -->
    <circle cx="455" cy="35" r="16" fill="none" stroke="#d99a4e" stroke-width="3"/>
    <text x="455" y="39" text-anchor="middle" font-size="12" fill="#5a5340">E</text>
    <circle cx="455" cy="75" r="16" fill="none" stroke="#d99a4e" stroke-width="3"/>
    <text x="455" y="79" text-anchor="middle" font-size="12" fill="#5a5340">F</text>

    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#999"/>
      </marker>
    </defs>
  </svg>`;
}

function render() {
  const list = document.getElementById('question-list');
  list.innerHTML = '';

  questions.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.dataset.id = q.id;

    const selectHint = q.select
      ? `<span class="q-select-hint">應選 ${q.select} 項</span>`
      : '';

    let optionsHtml = '';
    Object.entries(q.options).forEach(([key, text]) => {
      optionsHtml += `
        <label class="option" data-key="${key}">
          <input type="checkbox" name="q${q.id}" value="${key}">
          <span><span class="opt-key">(${key})</span> ${text}</span>
        </label>`;
    });

    let diagramHtml = '';
    if (q.diagram) {
      diagramHtml = `
        <div class="diagram-box">
          ${diagramSVG()}
          <div class="diagram-caption">遺傳工程實驗示意圖（甲～丁為各階段成分，E、F 為基因轉殖後的細菌）</div>
        </div>`;
    }

    card.innerHTML = `
      <div class="q-head">
        <div class="q-num">${q.id}</div>
        <div class="q-text">${q.text}${selectHint}<span class="result-tag" style="display:none"></span></div>
      </div>
      ${diagramHtml}
      <div class="options">${optionsHtml}</div>
      <div class="btn-row">
        <button class="btn check-btn">對答案</button>
        <button class="btn secondary clear-btn">清除選擇</button>
      </div>
      <div class="explanation">
        <div><span class="label">答案：</span><span class="answer-text"></span></div>
        <div style="margin-top:6px;"><span class="label">解析：</span><span class="exp-text"></span></div>
      </div>
    `;

    list.appendChild(card);

    const checkBtn = card.querySelector('.check-btn');
    const clearBtn = card.querySelector('.clear-btn');
    const explanation = card.querySelector('.explanation');
    const resultTag = card.querySelector('.result-tag');

    checkBtn.addEventListener('click', () => {
      const checked = [...card.querySelectorAll('input[type="checkbox"]:checked')]
        .map(el => el.value);

      const correctSet = new Set(q.answer);
      const checkedSet = new Set(checked);

      card.querySelectorAll('.option').forEach(opt => {
        const key = opt.dataset.key;
        const isCorrect = correctSet.has(key);
        const isChecked = checkedSet.has(key);
        opt.classList.remove('correct', 'wrong', 'missed');
        if (isCorrect && isChecked) {
          opt.classList.add('correct');
        } else if (!isCorrect && isChecked) {
          opt.classList.add('wrong');
        } else if (isCorrect && !isChecked) {
          opt.classList.add('missed');
        }
        opt.classList.add('disabled');
        opt.querySelector('input').disabled = true;
      });

      const isFullyCorrect =
        checkedSet.size === correctSet.size &&
        [...checkedSet].every(k => correctSet.has(k));

      resultTag.style.display = 'inline-block';
      resultTag.textContent = isFullyCorrect ? '答對了！' : '再檢查一下';
      resultTag.className = 'result-tag ' + (isFullyCorrect ? 'good' : 'bad');

      const answerLabels = q.answer.map(k => `(${k})`).join('');
      card.querySelector('.answer-text').textContent = answerLabels;
      card.querySelector('.exp-text').textContent = q.explanation;
      explanation.classList.add('show');

      checkBtn.disabled = true;

      if (!answeredSet.has(q.id)) {
        answeredSet.add(q.id);
        updateScoreBar();
      }
    });

    clearBtn.addEventListener('click', () => {
      card.querySelectorAll('input[type="checkbox"]').forEach(el => {
        el.checked = false;
        el.disabled = false;
      });
      card.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('correct', 'wrong', 'missed', 'disabled');
      });
      explanation.classList.remove('show');
      resultTag.style.display = 'none';
      checkBtn.disabled = false;

      if (answeredSet.has(q.id)) {
        answeredSet.delete(q.id);
        updateScoreBar();
      }
    });
  });

  updateScoreBar();
}

function updateScoreBar() {
  document.getElementById('score-bar').textContent =
    `已作答 ${answeredSet.size}／${questions.length}`;
}

document.getElementById('reset-btn').addEventListener('click', () => {
  answeredSet.clear();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

render();
