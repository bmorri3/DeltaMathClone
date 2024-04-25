import { title, assignmentName, problemTypes, problemTemplates, solutionTemplate } from './problemData.js';

let getProbBtn = document.getElementById('getProblem');
let backBtn = document.getElementById('back');
let newProbBtn = document.getElementById('new-problem');
let solutionBtn = document.getElementById('solution');
let icon = document.getElementById('question-mark');
document.getElementById('assignment_name').textContent = assignmentName;

let a, b, lengths, answer, problemString, type;
let showingSolution = false;

// Function to parse the query parameters from the URL
function getQueryParams() {
  let params = {};
  let queryString = window.location.search.slice(1);
  let pairs = queryString.split('&');
  pairs.forEach(pair => {
    let [key, value] = pair.split('=');
    params[key] = decodeURIComponent(value);
  });
  return params;
}

// Get the query parameters
let queryParams = getQueryParams();

// Get the value of the 'level' parameter
let level = queryParams['level'];

function generateSubtraction(type) {
  const function_name = "subtractionType" + type + "()";

  return eval(function_name);
}

function convertToInt(arr) {
  return parseInt(arr.join(""));
}

function subtractionType1() {
  const MAX_NUM_1_DIGITS = 4;
  const MIN_NUM_1_DIGITS = 3;
  const MIN_NUM_2_DIGITS = 2;

  let numDigits1 = rand(MIN_NUM_1_DIGITS, MAX_NUM_1_DIGITS);
  let numDigits2 = rand(MIN_NUM_2_DIGITS, numDigits1);

  let num1 = 0;
  let num2 = 0;

  while (num1 - num2 <= 50 || num1 % 10 === 0 || num2 % 10 === 0) {
    let digits1 = Array(numDigits1 + 1).fill(-1);
    let digits2 = Array(numDigits2 + 1).fill(-1);
    let randomDigit = rand(1, Math.min(numDigits2, numDigits1 - 1));

    let idx = 1;
    while (idx <= numDigits1) {
      if (idx === randomDigit) {
        digits1[idx] = rand(0, 8);
        digits2[idx] = rand(digits1[idx] + 1, 9);
        if (idx + 1 <= numDigits2) {
          digits2[idx + 1] = rand(0, 8);
          digits1[idx + 1] = rand(digits2[idx + 1] + 1, 9);
        } else {
          digits1[idx + 1] = rand(1, 9);
        }
        idx++;
      } else if (idx <= numDigits2) {
        digits1[idx] = rand(1, 9);
        digits2[idx] = rand(0, digits1[idx]);
      } else if (idx <= numDigits1 - 1) {
        digits1[idx] = rand(0, 9);
      } else {
        digits1[idx] = rand(1, 9);
      }
      idx++;
    }
    digits1 = digits1.slice(1).reverse();
    digits2 = digits2.slice(1).reverse();
    num1 = convertToInt(digits1);
    num2 = convertToInt(digits2);
  }

  return `${num1}-${num2}`;
}

function subtractionType2() {
  const MAX_NUM_1_DIGITS = 4;
  const MIN_NUM_1_DIGITS = 3;
  const MIN_NUM_2_DIGITS = 2;

  let numDigits1 = rand(MIN_NUM_1_DIGITS, MAX_NUM_1_DIGITS);
  let numDigits2 = rand(MIN_NUM_2_DIGITS, numDigits1);

  let num1 = 0;
  let num2 = 0;

  while (num1 - num2 <= 50 || num1 % 10 === 0 || num2 % 10 === 0) {
    let digits1 = Array(numDigits1 + 1).fill(-1);
    let digits2 = Array(numDigits2 + 1).fill(-1);
    let randomDigit = rand(1, Math.min(numDigits2 - 1, numDigits1 - 2));

    let idx = 1;
    while (idx <= numDigits1) {
      if (idx === randomDigit) {
        digits1[idx] = rand(0, 8);
        digits2[idx] = rand(digits1[idx] + 1, 9);
        digits1[idx + 1] = 0;
        digits2[idx + 1] = rand(digits1[idx + 1] + 1, 9);
        if (idx + 2 <= numDigits2) {
          digits2[idx + 2] = rand(0, 8);
          digits1[idx + 2] = rand(digits2[idx + 2] + 1, 9);
        } else {
          digits1[idx + 2] = rand(1, 9);
        }
        idx += 2;
      } else if (idx <= numDigits2) {
        digits1[idx] = rand(1, 9);
        digits2[idx] = rand(0, digits1[idx]);
      } else if (idx <= numDigits1 - 1) {
        digits1[idx] = rand(0, 9);
      } else {
        digits1[idx] = rand(1, 9);
      }
      idx++;
    }
    digits1 = digits1.slice(1).reverse();
    digits2 = digits2.slice(1).reverse();
    num1 = convertToInt(digits1);
    num2 = convertToInt(digits2);
  }

  return `${num1}-${num2}`;
}

function subtractionType3() {
  const MAX_NUM_1_DIGITS = 4;
  const MIN_NUM_1_DIGITS = 4;
  const MIN_NUM_2_DIGITS = 3;

  let numDigits1 = rand(MIN_NUM_1_DIGITS, MAX_NUM_1_DIGITS);
  let numDigits2 = rand(MIN_NUM_2_DIGITS, numDigits1);

  let num1 = 0;
  let num2 = 0;

  let borrow2Idx = rand(1, 2);

  while (num1 - num2 <= 50) {
    let digits1 = Array(numDigits1).fill(-1);
    let digits2 = Array(numDigits2).fill(-1);

    digits1[0] = rand(1, 8);
    digits2[0] = rand(digits1[0] + 1, 9);
    if (borrow2Idx === 1) {
      digits1[1] = 0;
      digits2[1] = rand(1, 9);
      digits1[2] = rand(2, 9);
      digits2[2] = rand(digits1[2], 9);
    } else {
      digits1[1] = rand(2, 9);
      digits2[1] = rand(digits1[1], 9);
      digits1[2] = 0;
      digits2[2] = rand(1, 9);
    }

    if (numDigits2 === 3) {
      digits1[3] = rand(1, 9);
    } else {
      digits1[3] = rand(2, 9);
      digits2[3] = rand(1, digits1[3] - 1);
    }

    digits1 = digits1.reverse();
    digits2 = digits2.reverse();
    num1 = convertToInt(digits1);
    num2 = convertToInt(digits2);
  }

  return `${num1}-${num2}`;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

function outputProblem() { 
  let problem = generateSubtraction(level);
  let numbers = problem.split("-");
  a = parseInt(numbers[0]);
  b = parseInt(numbers[1]);
  
  // Call insertDateTime function when the page loads
  insertDateTime();
  problemString = problemTemplates[type]
    .replace('{a}', a)
    .replace('{b}', b);


  let problemElement = document.getElementById('problem');
  problemElement.innerHTML = problemString;

  adjustContainerHeight(350);
}

function calculateSolution() {
  return a - b;
}

// Inside the checkSolution function

function checkSolution() {
  answer = calculateSolution();

  let checkInputY2 = parseFloat(input.value);
  if(checkInputY2 == answer) {
    correct();
  }
  else {
    incorrect();
  }

  // Display the user's solution as LaTeX using MathJax
  let userSolutionContainer = document.getElementById('userSolution');
  userSolutionContainer.textContent = `Your Solution:`;

  let inputValueSpan = document.createElement('span');
  inputValueSpan.textContent = "$$ " + input.value + " $$";
  inputValueSpan.style.fontSize = '1.15rem';
  inputValueSpan.style.display = 'block';
  inputValueSpan.style.textAlign = 'center';
  document.getElementById('userSolution').appendChild(inputValueSpan);

  // Append the span element to the container
  userSolutionContainer.appendChild(inputValueSpan);

  // Render the LaTeX using MathJax
  MathJax.typesetPromise([inputValueSpan]).then(() => {
    MathJax.typeset([inputValueSpan]);
  });

  showSolution();

  // Hide the answer-container
  document.getElementById('answer-container').style.display = 'none';
  // Hide the getProblem button
  getProbBtn.style.display = 'none';

  // Show the solution container
  solutionContainer.style.display = 'block';

  adjustContainerHeight(200);
}

function showSolution() {
  calculateSolution();

  if (!showingSolution) {
    // Hide the answer-container
    document.getElementById('answer-container').style.display = 'none';
    // Hide the getProblem button
    getProbBtn.style.display = 'none'; 

    let solutionString = solutionTemplate
      .replace(/{problemString}/, problemString)
      .replace(/{a}/g, a)
      .replace(/{b}/g, b)
      .replace(/{a-b}/g, a-b);

    // Set the innerHTML of the problem element to the solution HTML
    problem.innerHTML = solutionString;

    // Change button text to "Show Problem"
    solutionBtn.textContent = 'Show Problem';
    showingSolution = true;

    MathJax.typesetPromise().then(() => {
      MathJax.typeset();
    });
    adjustContainerHeight(175)
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
    
    // Render the LaTeX in the problem string
    MathJax.typesetPromise().then(() => {
      MathJax.typeset();        
    });
    adjustContainerHeight(350)
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
  type =  problemTypes[Math.floor(Math.random()*problemTypes.length)];
  getProbBtn.innerText = 'Submit Answer';
}

function runProblem() {
  determineProblemType();
  
  // Clear text box
  document.getElementById('input').value = "";

  outputProblem();

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
    checkSolution();
  }
});

runProblem()