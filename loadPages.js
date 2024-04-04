let getProbBtn = document.getElementById('getProblem');
let icon = document.getElementById('question-mark');

let problemType = ['numeric', 'verbal'];



function random(max=200) {
  return Math.floor(Math.random()*max) + 1;
}

function toggleIconCorrect() {
  icon.style.color = 'rgb(64, 222, 28)';
}

function toggleIconIncorrect() {
  icon.style.color = 'rgb(250, 31, 19)';
}

function correct() {
  icon.setAttribute('class', 'fa-solid fa-check');
  toggleIconCorrect();
}

function incorrect(){
  icon.setAttribute('class', 'fa-solid fa-xmark');
  toggleIconIncorrect();
}

function changeEventListener(funcName) {
  getProbBtn.removeEventListener('click', determineProblemType);
  getProbBtn.addEventListener('click', funcName);
}

function refresh() {
  setTimeout(() => {
    location.reload();
  }, 1500)
}

function insertDateTime() {
  const currentDate = new Date();
  const options = { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  const formattedDate = currentDate.toLocaleString('en-US', options);
  document.getElementById('datetime').textContent = formattedDate;
}

getProbBtn.addEventListener('click', determineProblemType);