let getProbBtn = document.getElementById('getProblem');
let backBtn = document.getElementById('back');
let newProbBtn = document.getElementById('new-problem');
let solutionBtn = document.getElementById('solution');
let icon = document.getElementById('question-mark');

let problemType = ['numeric', 'verbal'];

let X1, X2, Y1, correctY2, problemString; 

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

function outputProblem(type) {

  X1 = random();
  X2 = random();
  Y1 = random();

  // Call insertDateTime function when the page loads
  insertDateTime();

  switch(type) {
    case 'numeric':
      problemString = `X and Y vary inversely. What is the value of Y if ${Y1} when X is ${X1}, what is the value of Y when X is ${X2}? Round answers to the nearest hundredth.`;
      break;

    case 'verbal':
      problemString = `Current and resistance vary inversely. If the resistance is ${Y1} Amps when the current is ${X1} Ohms, what is the current (in Amps) when the resistance is ${X2} Ohms? Round answers to the nearest hundredth.`;
      break;
  }

  problem.innerHTML = problemString

  adjustContainerHeight();
}

function calculateSolution() {
  correctY2 = X1 * Y1 / X2;
  correctY2 = correctY2.toFixed(2);
}

function checkSolution() {
  calculateSolution();

  let inputY2 = parseFloat(yInput.value).toFixed(2);
  
  if(inputY2 == correctY2) {
    correct();
  }
  else {
    incorrect();
  }
}

function showSolution(type) {
  calculateSolution();

  problem.innerHTML = `\
  ${problemString}<br>\
  <br>
  X and Y vary inversely.<br>\
  X*Y = k, the constant of variation.<br>\
  k = ${X1} * ${Y1}<br>\
  k = ${X1 * Y1}<br>\
  <br>\
  X2 * Y2 = k<br>\
  Since X2 = ${X2}<br>\
  ${X2} * Y2 = ${X1 * Y1}<br>\
  Y2 = ${X1 * Y1} / ${X2}<br>\
  Y2 = ${correctY2}<br>\
  `;
  console.log(`${textContainer.style.height}`)
  // Adjust the height of the textContainer to fit the content
  adjustContainerHeight();
  console.log(`${textContainer.style.height}`)
}

function adjustContainerHeight() {
  // Get the problem element
  let textElement = document.getElementById('problem');
  console.log(`textElement.scrollHeight: ${textElement.scrollHeight}`)
  // Get the computed height of the problem element
  let textHeight = textElement.scrollHeight + 350;

  // Set the height of the textContainer to the computed height of the problem element
  textContainer.style.height = `${textHeight}px`;
  console.log(`textContainer.style.height: ${textContainer.style.height}`)
}

function determineProblemType() {
  let prob_type =  problemType[Math.floor(Math.random()*problemType.length)];
  getProbBtn.innerText = 'Submit Answer';

  return prob_type;
}

function runProblem() {
  console.log('runProblem() called');
  prob_type = determineProblemType();
  
  outputProblem(prob_type);

  changeEventListener(checkSolution);
}

getProbBtn.addEventListener('click', runProblem);
newProbBtn.addEventListener('click', runProblem);
solutionBtn.addEventListener('click', showSolution);

// Navigate to skillsMenu.html when back button is clicked
backBtn.addEventListener('click', function() {
  window.location.href = '../../skillsMenu.html';
});

function changeEventListener(funcName) {
  getProbBtn.removeEventListener('click', runProblem);
  getProbBtn.addEventListener('click', funcName);
}

runProblem()