let getProbBtn = document.getElementById('getProblem');
let icon = document.getElementById('question-mark');

let problemType = ['numeric', 'verbal'];

let X1 = random();
let X2 = random();
let Y1 = random();

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
  icon.setAttribute('class', 'fa fa-check-circle');
  toggleIconCorrect();
}

function incorrect(){
  icon.setAttribute('class', 'fa fa-times-circle');
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

function outputProblem(type) {
  let correctY2;
  // problem.innerHTML = "HERE";
  switch(type) {
    case 'numeric':
      problem.innerHTML = `X and Y vary inversely. What is the value of Y if ${Y1} when X is ${X1}, what is the value of Y when X is ${X2}?`;
      break;

    case 'verbal':
      problem.innerHTML = `Current and resistance vary inversely. If the resistance is ${Y1} Amps when the current is ${X1} Ohms, what is the current (in Amps) when the current is ${X2} Ohms?`;
      break;
  }
  
  function checkSolution() {
    correctY2 = X1 * Y1 / X2;
    correctY2 = correctY2.toFixed(2);
    let inputY2 = parseFloat(yInput.value).toFixed(2);
    

    if(inputY2 == correctY2) {
      correct();
      refresh();
    }
    else {
      incorrect();
      refresh();
    }
  }
  changeEventListener(checkSolution);
}

function determineProblemType() {
  problem.innerHTML = "in GetProblemType";
  let prob_type =  problemType[Math.floor(Math.random()*problemType.length)];
  getProbBtn.innerText = 'Submit Answer';
  outputProblem(prob_type);
}

getProbBtn.addEventListener('click', determineProblemType);