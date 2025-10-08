
const themeBtn = document.getElementById('theme-btn');
const themes = ['light', 'dark', 'rocket'];
let currentThemeIndex = 0;

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
themeBtn.addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  setTheme(themes[currentThemeIndex]);
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme && themes.includes(savedTheme)) {
  currentThemeIndex = themes.indexOf(savedTheme);
  setTheme(savedTheme);
} else {
  setTheme('rocket');
}

const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const checkBtn = document.getElementById('check-btn');
const rocketEl = document.getElementById('rocket');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highscore');
const popup = document.getElementById('result-popup');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');
const difficultyEl = document.getElementById('difficulty');

let score = 0;
let highScore = localStorage.getItem('highscore') || 0;
highScoreEl.textContent = highScore;
let correctAnswer = 0;

function generateQuestion() {
  let max = 10;
  if (difficultyEl.value === 'normal') max = 50;
  if (difficultyEl.value === 'hard') max = 100;
  const a = Math.floor(Math.random() * max) + 1;
  const b = Math.floor(Math.random() * max) + 1;
  const ops = ['+', '-', '*'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  questionEl.innerHTML = `<span dir="ltr">${a} ${op} ${b}</span>`;
  correctAnswer = eval(`${a}${op}${b}`);
}

checkBtn.addEventListener('click', () => {
  const userAns = Number(answerEl.value);
  if (userAns === correctAnswer) {
    score++;
    scoreEl.textContent = score;
    rocketEl.style.transform = `translateY(-${score * 5}px)`;
    generateQuestion();
    answerEl.value = '';
  } else {
    endGame();
  }
});

function endGame() {
  finalScoreEl.textContent = score;
  popup.classList.remove('hidden');
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highscore', highScore);
    highScoreEl.textContent = highScore;
  }
}

restartBtn.addEventListener('click', () => {
  score = 0;
  scoreEl.textContent = score;
  rocketEl.style.transform = 'translateY(0)';
  popup.classList.add('hidden');
  generateQuestion();
  answerEl.value = '';
  answerEl.focus();
});

generateQuestion();
