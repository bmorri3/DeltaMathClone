import { title, assignmentName, problemTypes, problemTemplates, solutionTemplate } from './problemData.js';

let getProbBtn = document.getElementById('getProblem');
let backBtn = document.getElementById('back');
let newProbBtn = document.getElementById('new-problem');
let solutionBtn = document.getElementById('solution');
let icon = document.getElementById('question-mark');
document.getElementById('assignment_name').textContent = assignmentName;

let X1, X2, Y1, correctY2, problemString;
let showingSolution = false;

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

  problemString = problemTemplates[type]
    .replace('{X1}', X1)
    .replace('{X2}', X2)
    .replace('{Y1}', Y1);

  problem.innerHTML = problemString

  adjustContainerHeight(350);
}

function calculateSolution() {
  correctY2 = X1 * Y1 / X2;
  correctY2 = correctY2.toFixed(2);
}

function checkSolution() {
  calculateSolution();

  let checkInputY2 = parseFloat(input.value).toFixed(2);
  
  if(checkInputY2 == correctY2) {
    console.log("HERE");
    correct();
  }
  else {
    console.log("HERE HERE");
    incorrect();
  }

  showSolution();

  // Hide the answer-container
  document.getElementById('answer-container').style.display = 'none';
  // Hide the getProblem button
  getProbBtn.style.display = 'none';

  document.getElementById('userSolution').textContent = `Your Solution:`;
  let inputValueSpan = document.createElement('span');
  inputValueSpan.textContent = "$$" + input.value + "$$";
  inputValueSpan.style.fontSize = '1.15rem';
  inputValueSpan.style.display = 'block';
  inputValueSpan.style.textAlign = 'center';
  document.getElementById('userSolution').appendChild(inputValueSpan);

  // Render the LaTeX using MathJax
  MathJax.typesetPromise([inputValueSpan]).then(() => {
    MathJax.typeset([inputValueSpan]);
  });

  // Show the solution and user solution    
  solutionContainer.style.display = 'block';
  adjustContainerHeight(250);
}

function showSolution(type) {
  calculateSolution();

  if (!showingSolution) {
    // Hide the answer-container
    document.getElementById('answer-container').style.display = 'none';
    // Hide the getProblem button
    getProbBtn.style.display = 'none';

    let solutionString = solutionTemplate
      .replace(/{problemString}/g, problemString)
      .replace(/{X1}/g, X1)
      .replace(/{X2}/g, X2)
      .replace(/{Y1}/g, Y1)
      .replace(/{correctY2}/g, correctY2)
      .replace(/{k}/g, X1 * Y1);

    // Set the innerHTML of the problem element to the solution HTML
    problem.innerHTML = solutionString;

    // Change button text to "Show Problem"
    solutionBtn.textContent = 'Show Problem';
    showingSolution = true;

    MathJax.typesetPromise().then(() => {
      MathJax.typeset();        
    });
    adjustContainerHeight(175);  
  } else {
    // Set the innerHTML of the problem element back to the problem string
    problem.innerHTML = problemString;

    // Show the answer-container
    document.getElementById('answer-container').style.display = 'flex';    
    // Show the getProblem button
    getProbBtn.style.display = 'block';
    // Hide the solutionContainer
    solutionContainer.style.display = 'none';

    // Change button text to "Show Solution" 
    solutionBtn.textContent = 'Show Solution';
    showingSolution = false;

    // MathJax.typesetPromise().then(() => {
    //   MathJax.typeset();
    // });
    adjustContainerHeight(350);
  }
}


function adjustContainerHeight(amt) {
  // Get the problem element
  let textElement = document.getElementById('problem');

  // Get the computed height of the problem element
  let textHeight = textElement.scrollHeight + amt;

  // Set the height of the textContainer to the computed height of the problem element
  textContainer.style.height = `${textHeight}px`;
}

function determineProblemType() {
  let prob_type =  problemTypes[Math.floor(Math.random()*problemTypes.length)];
  getProbBtn.innerText = 'Submit Answer';

  return prob_type;
}

function runProblem() {
  let prob_type = determineProblemType();
  
  // Clear text box
  document.getElementById('input').value = "";

  outputProblem(prob_type);

  changeEventListener(checkSolution);
}

getProbBtn.addEventListener('click', runProblem);

newProbBtn.addEventListener('click', function() {
  // Hide solutionContainer
  solutionContainer.style.display = 'none';

  // Show answer-container
  document.getElementById('answer-container').style.display = 'flex';
  // Show the "Submit Answer" button
  document.getElementById('getProblem').style.display = 'block';
  // Show the question mark
  icon.setAttribute('class', 'fa-solid fa-question');
  icon.style.color = '';

  solutionBtn.textContent = 'Show Solution';
  showingSolution = false;
  // Call runProblem to generate a new problem
  runProblem();
});

// Get the input element
let input = document.getElementById('input');

solutionBtn.addEventListener('click', showSolution);

// Navigate to skillsMenu.html when back button is clicked
backBtn.addEventListener('click', function() {
  window.location.href = '../../skillsMenu.html';
});

function changeEventListener(funcName) {
  getProbBtn.removeEventListener('click', runProblem);
  getProbBtn.addEventListener('click', funcName);
}

// Get the input element
input = document.getElementById('input');

// Listen for keydown event on the input element
input.addEventListener('keydown', function(event) {
  // Check if the pressed key is Enter (keyCode 13)
  if (event.key === 'Enter') {
    // Prevent the default action of the Enter key (form submission)
    event.preventDefault();
    // Programmatically trigger a click event on the "Submit Answer" button
    // document.getElementById('getProblem').click();
    checkSolution();
  }
});


runProblem()