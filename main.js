let currentMode = 'beginner';
let timeLimitForMode = 30;
let maxQuestions = 5;
let gameQuestions = [];
let consecutiveCorrect = 0; 
let currentActiveQuestion = null; 

let currentQuestionIndex = 0;
let hp = 3;
let score = 0;
let timerInterval;
let timeLeft = 30;
let isBgmPlaying = false;
let answersLog = [];

let typingTimeout = null; // タイピング演出用

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
  if (!audioCtx) audioCtx = new AudioContext();
}

function playSound(type) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  if (type === 'correct') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    osc.start(); osc.stop(audioCtx.currentTime + 0.3);
  } else if (type === 'wrong') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    osc.start(); osc.stop(audioCtx.currentTime + 0.3);
  } else if (type === 'hit') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
    osc.start(); osc.stop(audioCtx.currentTime + 0.2);
  }
}

function toggleBgm() {
  initAudio();
  const btn = document.getElementById('bgm-toggle-btn');
  const titleAudio = document.getElementById('audio-title');
  const gameAudio = document.getElementById('audio-game');
  const inGame = document.getElementById('screen-game').classList.contains('active');
  const activeAudio = inGame ? gameAudio : titleAudio;
  const inactiveAudio = inGame ? titleAudio : gameAudio;
  if (isBgmPlaying) {
    activeAudio.pause(); inactiveAudio.pause();
    btn.innerText = '🎵 BGM: OFF';
    isBgmPlaying = false;
  } else {
    activeAudio.play().catch(e => console.log(e));
    btn.innerText = '🎵 BGM: ON';
    isBgmPlaying = true;
  }
}

function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  if (isBgmPlaying) {
    const titleAudio = document.getElementById('audio-title');
    const gameAudio = document.getElementById('audio-game');
    if (screenId === 'screen-game') {
      titleAudio.pause(); gameAudio.currentTime = 0; gameAudio.play().catch(e=>{});
    } else if (screenId === 'screen-title' || screenId === 'screen-difficulty') {
      gameAudio.pause();
      if(titleAudio.paused) titleAudio.play().catch(e=>{});
    } else if (screenId === 'screen-result') {
      gameAudio.pause();
    }
  }
}

function goToDifficulty() { switchScreen('screen-difficulty'); }

function startGame(mode) {
  const p1 = document.getElementById('usb-pledge');
  const p2 = document.getElementById('sticky-pledge');
  const p3 = document.getElementById('fatigue-pledge');
  
  if (p1 && !p1.checked) {
    alert("USBを捨てる覚悟がないと防衛できません！\n「私物USB」の誓約にチェックを入れてください！");
    return;
  }
  if (p2 && !p2.checked) {
    alert("今すぐモニターの付箋を剥がしてください！\n「付箋パスワード」の誓約にチェックを入れてください！");
    return;
  }
  if (p3 && !p3.checked) {
    alert("限界寸前でも気合で乗り切るのが教員です！\n「疲労度」の誓約にチェックを入れてください！");
    return;
  }
  
  initAudio();
  currentMode = mode;
  currentQuestionIndex = 0;
  hp = 3; score = 0; answersLog = []; consecutiveCorrect = 0;
  
  // ダサいデザインの初期化
  document.body.classList.remove('degrade-1', 'degrade-2');
  if (mode === 'beginner') {
    timeLimitForMode = Infinity; maxQuestions = 5; 
    gameQuestions = questionsData.slice(0, 10).sort(() => 0.5 - Math.random()).slice(0, 5);
  } else if (mode === 'intermediate') {
    timeLimitForMode = 45; maxQuestions = 8; 
    gameQuestions = questionsData.slice(10, 22).sort(() => 0.5 - Math.random()).slice(0, 8);
  } else if (mode === 'advanced') {
    timeLimitForMode = 25; maxQuestions = 12; 
    gameQuestions = questionsData.slice(22, 39).sort(() => 0.5 - Math.random()).slice(0, 12);
  } else if (mode === 'survival') {
    timeLimitForMode = 20; maxQuestions = Infinity; gameQuestions = []; 
  }
  updateHUD();
  switchScreen('screen-game');
  loadQuestion();
}

function updateHUD() {
  document.getElementById('hud-hp').innerText = '👨'.repeat(hp) + '👨‍🦲'.repeat(3 - hp);
  document.getElementById('hud-score').innerText = score;
  
  const audioGame = document.getElementById('audio-game');
  if (audioGame) {
    if (hp === 1) audioGame.playbackRate = 0.5; // 毛根が残り1で絶望のBGM
    else audioGame.playbackRate = 1.0;
  }
  
  // デザイン退化ギミック
  if (hp === 2) {
    document.body.classList.add('degrade-1');
    document.body.classList.remove('degrade-2');
  } else if (hp <= 1) {
    document.body.classList.add('degrade-2');
    document.body.classList.remove('degrade-1');
  } else {
    document.body.classList.remove('degrade-1', 'degrade-2');
  }
}

// WOWエフェクト：テキストタイピング演出
function typeText(elementId, text, speed = 15) {
  const el = document.getElementById(elementId);
  el.innerText = '';
  clearTimeout(typingTimeout);
  let i = 0;
  function type() {
    if (i < text.length) {
      el.innerText += text.charAt(i);
      i++;
      typingTimeout = setTimeout(type, speed);
    }
  }
  type();
}

// WOWエフェクト：ダメージフラッシュ
function triggerDamageFlash() {
  const overlay = document.getElementById('flash-overlay');
  if(overlay) {
    overlay.classList.remove('flash-active');
    void overlay.offsetWidth; // reflow
    overlay.classList.add('flash-active');
  }
}

function loadQuestion() {
  if (hp <= 0 || (currentMode !== 'survival' && currentQuestionIndex >= maxQuestions)) {
    endGame(); return;
  }
  if (currentMode === 'survival') {
    currentActiveQuestion = questionsData[Math.floor(Math.random() * questionsData.length)];
  } else {
    currentActiveQuestion = gameQuestions[currentQuestionIndex];
  }
  const q = currentActiveQuestion;

  document.getElementById('q-category').innerText = q.category;
  if (currentMode === 'survival') document.getElementById('q-progress').innerText = `サバイバル: ${currentQuestionIndex + 1}問目`;
  else document.getElementById('q-progress').innerText = `Q ${currentQuestionIndex + 1} / ${maxQuestions}`;
  
  // 偽広告のランダム出現（20%の確率）
  if (Math.random() < 0.2) {
    document.getElementById('fake-ad-banner').style.display = 'block';
    setTimeout(() => { document.getElementById('fake-ad-banner').style.display = 'none'; }, 4000);
  } else {
    document.getElementById('fake-ad-banner').style.display = 'none';
  }
  
  // タイピングエフェクトで問題文を表示
  typeText('q-text', `【${q.title}】\n${q.desc}`, 15);
  




  // ブラウザ枠で囲む
  const mockContent = q.mockUI || q.code;
  const wrappedMockUI = `
    <div class="browser-mock">
      <div class="browser-header">
        <div class="browser-dots"><span></span><span></span><span></span></div>
        <div class="browser-tabs">
          <div class="browser-tab active">
            <svg viewBox="0 0 24 24" width="14" height="14"><path fill="#1a73e8" d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/></svg>
            情報セキュリティ - ${q.category}
          </div>
        </div>
      </div>
      <div class="browser-address-bar">
        <div style="display:flex; gap:12px; color:#5f6368; align-items:center;">
          <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.946 7.946 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.946 7.946 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
        </div>
        <div class="url">
          <svg viewBox="0 0 24 24" width="14" height="14" style="margin-right:6px;"><path fill="#5f6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          https://school-system.ed.jp/secure/${q.category.replace(/ /g, '-').toLowerCase()}
        </div>
        <div class="avatar-small">教</div>
      </div>
      <div class="browser-body">
        ${mockContent}
      </div>
    </div>
  `;
  document.getElementById('q-mock-ui').innerHTML = wrappedMockUI;
  
  const optionsGrid = document.getElementById('options-grid');
  const interactiveActions = document.getElementById('interactive-actions');

  if (q.type === 'interactive') {
    optionsGrid.style.display = 'none';
    interactiveActions.style.display = 'block';
    const btn = interactiveActions.querySelector('button');
    btn.disabled = false;
    btn.className = 'action-btn'; 
  } else {
    optionsGrid.style.display = '';
    interactiveActions.style.display = 'none';
    optionsGrid.innerHTML = '';
    q.choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.onclick = () => selectOption(q, index, btn);
      btn.innerHTML = `<span class="opt-index">${index + 1}</span><span class="opt-text">${choice}</span>`;
      optionsGrid.appendChild(btn);
    });
  }

  document.getElementById('dialogue-box').innerText = "「正しい設定を選ぶニャ！」";
  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  const bar = document.getElementById('timer-bar');
  if (timeLimitForMode === Infinity) {
    bar.style.width = '100%'; bar.classList.remove('warning'); return;
  }
  let actualTimeLimit = (currentMode === 'survival') ? Math.max(5, timeLimitForMode - (consecutiveCorrect * 0.5)) : timeLimitForMode;
  timeLeft = actualTimeLimit;
  bar.style.width = '100%'; bar.classList.remove('warning');
  timerInterval = setInterval(() => {
    timeLeft -= 0.1;
    const pct = (timeLeft / actualTimeLimit) * 100;
    bar.style.width = `${pct}%`;
    if (pct < 30) bar.classList.add('warning');
    if (timeLeft <= 0) { clearInterval(timerInterval); handleTimeout(); }
  }, 100);
}

function handleFakeAdClick() {
  document.getElementById('fake-ad-banner').style.display = 'none';
  playSound('hit');
  hp--; 
  updateHUD();
  triggerDamageFlash();
  showModal('💥 ウイルス感染！', '偽の広告をクリックしてしまいました！校長の毛根が抜け落ちました！', 'wrong');
  if (hp <= 0) setTimeout(endGame, 2000);
}

function handleTimeout() {
  playSound('wrong');
  document.getElementById('dialogue-box').innerText = "「時間切れ！流出が発生したニャー！！」";
  hp--; consecutiveCorrect = 0; updateHUD();
  triggerDamageFlash(); // ダメージフラッシュ
  
  if (currentMode !== 'survival') answersLog.push({ q: currentActiveQuestion, correct: false, reason: "時間切れ" });
  setTimeout(() => { currentQuestionIndex++; loadQuestion(); }, 2000);
}

function selectOption(q, selectedIndex, btnElement) {
  clearInterval(timerInterval);
  const isCorrect = (selectedIndex === q.answerIndex);
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
  processAnswerResult(q, isCorrect, btnElement, () => {
    document.querySelectorAll('.option-btn')[q.answerIndex].classList.add('correct');
  });
}

function submitInteractive() {
  clearInterval(timerInterval);
  const q = currentActiveQuestion;
  let isCorrect = true;
  for (const [elementId, expectedValue] of Object.entries(q.correctValues)) {
    const el = document.getElementById(elementId);
    if (!el) { isCorrect = false; break; }
    if (el.type === 'checkbox') {
      if (el.checked !== expectedValue) isCorrect = false;
    } else {
      if (el.value !== expectedValue) isCorrect = false;
    }
  }
  const btnElement = document.querySelector('#interactive-actions button');
  btnElement.disabled = true;
  processAnswerResult(q, isCorrect, btnElement, () => {});
}

function processAnswerResult(q, isCorrect, btnElement, showCorrectAction) {
  if (isCorrect) {
    playSound('correct');
    btnElement.classList.add('correct');
    let baseScore = (currentMode === 'advanced' || currentMode === 'survival') ? 2000 : 1000;
    let timeBonus = (timeLimitForMode !== Infinity && timeLeft > 0) ? Math.ceil(timeLeft * 100) : 500;
    score += (baseScore + timeBonus);
    consecutiveCorrect++;
    
    // シュールな褒め言葉
    const praises = [
      "【評価UP】冬のボーナス査定がわずかに上昇しました！",
      "【安堵】今日の定時退社が確定しました！",
      "【歓喜】校長の血圧が正常値に戻りました！",
      "【平和】教育委員会からの着信が止まりました！"
    ];
    const praise = praises[Math.floor(Math.random() * praises.length)];
    document.getElementById('dialogue-box').innerText = praise;
    
    if (currentMode !== 'survival') answersLog.push({ q: q, correct: true });
  } else {
    playSound('hit');
    btnElement.classList.add('wrong');
    document.getElementById('screen-game').animate([
      { transform: 'translate(10px, 10px)' }, { transform: 'translate(-10px, -10px)' },
      { transform: 'translate(5px, 5px)' }, { transform: 'translate(0, 0)' }
    ], { duration: 300 });
    document.getElementById('dialogue-box').innerText = "「ギャー！設定ミスでデータが爆散したニャ！！」";
    hp--; consecutiveCorrect = 0;
    triggerDamageFlash(); // ダメージフラッシュ
    triggerIncidentLog(); // インシデント警告ログ
    
    // 教育委員会の通知スライドイン
    const eduNotif = document.getElementById('edu-notification');
    if (eduNotif) {
      eduNotif.classList.add('show');
      setTimeout(() => eduNotif.classList.remove('show'), 3000);
    }
    
    if (currentMode !== 'survival') answersLog.push({ q: q, correct: false, reason: "設定ミス" });
    showCorrectAction();

    const goNext = () => {
      updateHUD();
      setTimeout(() => { currentQuestionIndex++; loadQuestion(); }, 2000);
    };

    // 確率でトラップ発動（ミスした時だけ）
    const r = Math.random();
    if (r < 0.33) {
      document.getElementById('incoming-call-screen').style.display = 'flex';
      window.resolveTrap = goNext;
    } else if (r < 0.66) {
      document.getElementById('screen-lock-trap').style.display = 'flex';
      document.getElementById('lock-password').value = '';
      window.resolveTrap = goNext;
    } else {
      goNext();
    }
    return; // updateHUDとsetTimeoutはgoNext内で実行されるのでここでリターン
  }
  updateHUD();
  setTimeout(() => { currentQuestionIndex++; loadQuestion(); }, 2000);
}

function endGame() {
  document.body.classList.remove('degrade-1', 'degrade-2');
  clearInterval(timerInterval);
  const totalQuestions = currentQuestionIndex; 
  let accuracy = 0;
  if (currentMode === 'survival') {
    document.getElementById('res-accuracy').innerText = totalQuestions + ' 連続防衛';
    document.getElementById('res-accuracy').previousElementSibling.innerText = '防衛記録';
    accuracy = (totalQuestions >= 15) ? 100 : (totalQuestions >= 10 ? 80 : (totalQuestions >= 5 ? 60 : 20));
  } else {
    const correctCount = answersLog.filter(a => a.correct).length;
    accuracy = totalQuestions > 0 ? Math.floor((correctCount / maxQuestions) * 100) : 0;
    document.getElementById('res-accuracy').innerText = accuracy + '%';
    document.getElementById('res-accuracy').previousElementSibling.innerText = '防衛成功率';
  }
  document.getElementById('res-score').innerText = score;
  
  const resultScreen = document.getElementById('screen-result');
  const resultTitle = document.getElementById('result-title');
  const backBtn = resultScreen.querySelector('.start-btn');

  if (hp <= 0) {
    // 謝罪会見モード（ゲームオーバー）
    switchScreen('screen-result');
    resultScreen.classList.add('apology-flash');
    resultTitle.innerHTML = '🚨 緊急謝罪会見 🚨<br><span style="font-size:0.5em;color:#fff;">(全校生徒・保護者へ生中継中)</span>';
    document.getElementById('normal-actions').style.display = 'none';
    
    // 始末書生成
    const failedQuestions = answersLog.filter(a => !a.correct).map(a => a.q.title);
    const reasons = failedQuestions.length > 0 ? failedQuestions.join("」および「") : "数々の怠慢";
    document.getElementById('apology-letter-container').style.display = 'block';
    document.getElementById('apology-text').innerText = 
      `教育委員会 殿\n\n私儀、このたび「${reasons}」等の重大な過失により、本校の機密データを全世界へ大公開し、校長先生の毛根を完全に死滅させてしまいました。\n\nもはや教壇に立つ資格はなく、ここに辞表を提出いたします。\n\n令和◯年✕月`;
    
    document.getElementById('hanko-btn-container').style.display = 'block';
  } else {
    // 無慈悲なエンディングへ遷移
    switchScreen('screen-credits');
    document.getElementById('credits-scroll').classList.add('credits-anim');
    
    // 結果画面用の設定（エンディング後に表示される用）
    resultScreen.classList.remove('apology-flash');
    resultTitle.innerText = '🎉 任務完了（定時退社） 🎉';
    document.getElementById('normal-actions').style.display = 'flex';
    document.getElementById('apology-letter-container').style.display = 'none';
    document.getElementById('hanko-btn-container').style.display = 'none';
  }
  
  const discBox = document.getElementById('disciplinary-box');
  const discTitle = document.getElementById('disciplinary-title');
  const discDesc = document.getElementById('disciplinary-desc');
  if (accuracy === 100) {
    discBox.style.borderColor = 'var(--color-gold)'; discTitle.style.color = 'var(--color-gold)';
    discTitle.innerText = "🎖️ 表彰状"; discDesc.innerText = "完璧なセキュリティ意識！模範的教員として表彰するニャ！明日からも防衛頼むニャ！";
  } else if (accuracy >= 80) {
    discBox.style.borderColor = 'var(--color-green)'; discTitle.style.color = 'var(--color-green)';
    discTitle.innerText = "⚠️ 口頭注意"; discDesc.innerText = "ヒヤリハットがあったニャ。一歩間違えれば大事故だったニャ。気をつけるニャ。";
  } else if (accuracy >= 60) {
    discBox.style.borderColor = 'var(--text-main)'; discTitle.style.color = '#fff';
    discTitle.innerText = "📝 始末書提出"; discDesc.innerText = "インシデント報告書と始末書を提出するニャ！再発防止策を原稿用紙10枚書くニャ！";
  } else if (accuracy >= 40) {
    discBox.style.borderColor = 'var(--color-purple)'; discTitle.style.color = 'var(--color-purple)';
    discTitle.innerText = "💸 減給処分"; discDesc.innerText = "由々しき事態ニャ。ボーナス10分の1カットニャ…家族にどう説明するニャ…";
  } else {
    discBox.style.borderColor = 'var(--color-red)'; discTitle.style.color = 'var(--color-red)';
    discTitle.innerText = "🔥 懲戒免職"; discDesc.innerText = "致命的な情報流出をやらかしたニャ！！明日から来なくていいニャ…さようならニャ…";
  }

  // レーダーチャートのデータ生成と描画
  let baseScore = accuracy;
  if (currentMode === 'survival') baseScore = accuracy; // accuracy is max 100 for survival based on questions
  const radarData = [
    Math.min(100, Math.max(10, baseScore + (Math.random()*30 - 10))),
    Math.min(100, Math.max(10, baseScore + (Math.random()*30 - 15))),
    Math.min(100, Math.max(10, baseScore + (Math.random()*30 - 15))),
    Math.min(100, Math.max(10, baseScore + (Math.random()*30 - 15))),
    Math.min(100, Math.max(10, baseScore + (Math.random()*30 - 15)))
  ];
  drawRadarChart('radarChart', radarData);
}

function openReview() {
  if (currentMode === 'survival') { alert("サバイバルモードでは事故報告書は生成されないニャ！"); return; }
  const list = document.getElementById('review-list'); list.innerHTML = '';
  answersLog.forEach((log, i) => {
    const item = document.createElement('div'); item.className = 'review-item';
    const status = log.correct ? '<span style="color:var(--color-green)">[防衛成功]</span>' : '<span style="color:var(--color-red)">[流出事故]</span>';
    item.innerHTML = `
      <h4>Q${i+1}: ${log.q.title} ${status}</h4>
      <p style="margin-bottom:10px; font-size:0.9rem;">${log.q.desc}</p>
      <p><strong>解説：</strong><br>${log.q.explanation.replace(/\n/g, '<br>')}</p>
    `;
    list.appendChild(item);
  });
  document.getElementById('review-modal').classList.add('active');
}
function closeReview() { document.getElementById('review-modal').classList.remove('active'); }

// =========================================
// 新規追加機能（インシデントログ ＆ レーダーチャート）
// =========================================
function triggerIncidentLog() {
  let logContainer = document.getElementById('incident-log-container');
  if(!logContainer) {
    logContainer = document.createElement('div');
    logContainer.id = 'incident-log-container';
    document.body.appendChild(logContainer);
  }
  const log = document.createElement('div');
  log.className = 'incident-log-msg';
  const ips = ['192.168.1.45', '203.0.113.8', '10.0.0.5', '172.16.254.1', '198.51.100.14'];
  const dataTypes = ['成績一覧表', '生徒指導記録', '健康診断データ', '保護者連絡網'];
  log.innerHTML = `<span class="material-symbols-outlined" style="color:var(--color-gold);">warning</span> <div>【緊急警告】重大な設定ミス！<br>外部IP(${ips[Math.floor(Math.random()*ips.length)]})へ「${dataTypes[Math.floor(Math.random()*dataTypes.length)]}」が流出！</div>`;
  logContainer.appendChild(log);
  setTimeout(() => { if (log.parentNode) log.parentNode.removeChild(log); }, 4500);
}

function drawRadarChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  const center = size / 2;
  const radius = size / 2 - 35;
  const labels = ['共有設定', '物理・端末', 'メール・AI', 'アカウント', '緊急対応'];
  
  ctx.clearRect(0, 0, size, size);
  
  // 背景のクモの巣描画
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath();
    for (let j = 0; j < 5; j++) {
      const angle = (Math.PI * 2 * j / 5) - Math.PI / 2;
      const x = center + radius * (i/5) * Math.cos(angle);
      const y = center + radius * (i/5) * Math.sin(angle);
      if (j === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }
  
  // 軸とラベル描画
  ctx.fillStyle = '#fff';
  ctx.font = '10px "Press Start 2P", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let j = 0; j < 5; j++) {
    const angle = (Math.PI * 2 * j / 5) - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(center + radius * Math.cos(angle), center + radius * Math.sin(angle));
    ctx.stroke();
    const lx = center + (radius + 20) * Math.cos(angle);
    const ly = center + (radius + 20) * Math.sin(angle);
    ctx.fillText(labels[j], lx, ly);
  }
  
  // データのポリゴン描画
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 2;
  for (let j = 0; j < 5; j++) {
    const val = data[j] / 100;
    const angle = (Math.PI * 2 * j / 5) - Math.PI / 2;
    const x = center + radius * val * Math.cos(angle);
    const y = center + radius * val * Math.sin(angle);
    if (j === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// =========================================
// 辞表提出（ハンコ長押し）ロジック
// =========================================
let hankoTimer;
let hankoProgress = 0;

document.addEventListener('DOMContentLoaded', () => {
  const hBtn = document.getElementById('btn-hanko');
  const hProg = document.getElementById('hanko-progress');
  if (hBtn && hProg) {
    const startHanko = (e) => {
      e.preventDefault();
      clearInterval(hankoTimer);
      hankoTimer = setInterval(() => {
        hankoProgress += 4;
        hProg.style.width = hankoProgress + '%';
        if (hankoProgress >= 100) {
          clearInterval(hankoTimer);
          hankoProgress = 0;
          hProg.style.width = '0%';
          playSound('correct'); 
          alert('辞表が受理されました。（タイトルへ戻ります）');
          switchScreen('screen-title');
        }
      }, 50);
    };
    const stopHanko = () => {
      clearInterval(hankoTimer);
      if (hankoProgress > 0 && hankoProgress < 100) {
        alert("印鑑がかすれています！心を込めて長押ししてください！");
      }
      hankoProgress = 0;
      hProg.style.width = '0%';
    };
    hBtn.addEventListener('mousedown', startHanko);
    hBtn.addEventListener('touchstart', startHanko);
    hBtn.addEventListener('mouseup', stopHanko);
    hBtn.addEventListener('mouseleave', stopHanko);
    hBtn.addEventListener('touchend', stopHanko);
  }
});

// =========================================
// その他のトラップ解除処理
// =========================================

function unlockScreen() {
  const pw = document.getElementById('lock-password').value;
  if (pw.toLowerCase() === 'password') {
    document.getElementById('screen-lock-trap').style.display = 'none';
    if (window.resolveTrap) { window.resolveTrap(); window.resolveTrap = null; }
  } else {
    alert('パスワードが違います！ヒント：password');
  }
}

function callITAdmin() {
  if (hp <= 1) {
    alert("これ以上HP（毛根）を減らすと校長が倒れてしまいます！自力で解いてください！");
    return;
  }
  hp--;
  updateHUD();
  alert("情報担当の先生「やれやれ...正解はこれですよ。」\n（呆れられて校長の毛根が1つ減った！）");
  const q = currentActiveQuestion;
  document.querySelectorAll('.option-btn')[q.answerIndex].classList.add('correct');
}



function answerCall() {
  document.getElementById('incoming-call-screen').style.display = 'none';
  alert("校長「君ぃ！さっきのインシデントはどうなっとるのかね！ブツブツ...」\n（平謝りしてなんとか電話を切った！）");
  if (window.resolveTrap) { window.resolveTrap(); window.resolveTrap = null; }
}

function escapeToHawaii() {
  document.body.innerHTML = `
    <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') no-repeat center center; background-size:cover; display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:999999;">
      <h1 style="color:#fff; font-size:4rem; text-shadow:2px 2px 10px rgba(0,0,0,0.8); font-family:serif; margin-bottom:20px;">現実逃避中...</h1>
      <p style="color:#fff; font-size:1.5rem; text-shadow:1px 1px 5px rgba(0,0,0,0.8); background:rgba(0,0,0,0.4); padding:10px 20px; border-radius:10px;">すべてを忘れて、波の音をお聞きください。</p>
    </div>
  `;
  const audio = document.getElementById('audio-game');
  const audioTitle = document.getElementById('audio-title');
  if (audio) audio.pause();
  if (audioTitle) audioTitle.pause();
}
