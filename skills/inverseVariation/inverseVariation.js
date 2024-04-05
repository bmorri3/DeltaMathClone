let getProbBtn = document.getElementById('getProblem');
let backBtn = document.getElementById('back');
let newProbBtn = document.getElementById('new-problem');
let solutionBtn = document.getElementById('solution');
let icon = document.getElementById('question-mark');

let problemType = ['numeric', 'verbal'];

let X1, X2, Y1; 

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
newProbBtn.addEventListener('click', determineProblemType);
solutionBtn.addEventListener('click', showSolution);

// Navigate to skillsPage.html when back button is clicked
backBtn.addEventListener('click', function() {
  window.location.href = '/skillsPage.html';
});

function outputProblem(type) {

  X1 = random();
  X2 = random();
  Y1 = random();

  let correctY2;

  // Call insertDateTime function when the page loads
  insertDateTime();

  switch(type) {
    case 'numeric':
      problem.innerHTML = `X and Y vary inversely. What is the value of Y if ${Y1} when X is ${X1}, what is the value of Y when X is ${X2}? Round answers to the nearest hundredth.`;
      break;

    case 'verbal':
      problem.innerHTML = `Current and resistance vary inversely. If the resistance is ${Y1} Amps when the current is ${X1} Ohms, what is the current (in Amps) when the current is ${X2} Ohms? Round answers to the nearest hundredth.`;
      break;
  }
  
  function checkSolution() {
    correctY2 = X1 * Y1 / X2;
    correctY2 = correctY2.toFixed(2);
    let inputY2 = parseFloat(yInput.value).toFixed(2);
    

    if(inputY2 == correctY2) {
      correct();
    }
    else {
      incorrect();
    }
  }
  changeEventListener(checkSolution);
}

function showSolution(type) {
  problem.innerHTML = `Show the solution here. ${Y1} when X is ${X1}`;
}

function determineProblemType() {
  problem.innerHTML = "in GetProblemType";
  let prob_type =  problemType[Math.floor(Math.random()*problemType.length)];
  getProbBtn.innerText = 'Submit Answer';
  outputProblem(prob_type);
}