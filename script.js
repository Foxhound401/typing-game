const RANDOM_QUOTE_API = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const startButtonElement = document.getElementById('startButton');
const wordPerMinuteElement = document.getElementById('wordPerMinute');

let TOTAL_TIME = 0;
let WPM = 0;
let firstKeyStroke = true;

quoteInputElement.addEventListener('input', () => {
  console.log('changed');
  if (firstKeyStroke) startTimer();
  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  const arrayValue = quoteInputElement.value.split('');
  const arrayWord = quoteInputElement.value.split(' ');

  const wpm =
    TOTAL_TIME > 0 ? Math.floor((arrayWord.length / TOTAL_TIME) * 60) : '...';

  wordPerMinuteElement.innerText = wpm;

  let correct = true;
  arrayQuote.forEach((characterSpan, i) => {
    const character = arrayValue[i];
    if (character == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    } else {
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('incorrect');
      correct = false;
    }
  });

  if (correct) renderResult();
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API)
    .then((res) => res.json())
    .then((data) => {
      return data.content;
    });
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = '';
  quote.split('').forEach((character) => {
    const characterSpan = document.createElement('span');

    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;

  const buttons = startButtonElement.querySelectorAll('button');
  buttons[0].disabled = true;
  firstKeyStroke = true;
  quoteInputElement.hidden = false;
}

let refreshIntervalId = '';
function startTimer() {
  firstKeyStroke = false;
  // timerElement.innerText = 0;
  refreshIntervalId = setInterval(() => {
    TOTAL_TIME += 1;
    // timer.innerText = TOTAL_TIME;
  }, 1000);
}

function renderResult() {
  console.log(TOTAL_TIME);
  clearInterval(refreshIntervalId);
  const buttons = startButtonElement.querySelectorAll('button');
  buttons[0].disabled = false;
  quoteInputElement.hidden = true;
}

function startGame() {
  TOTAL_TIME = 0;
  renderNewQuote();
}
