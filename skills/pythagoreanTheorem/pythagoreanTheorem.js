import { title, assignmentName, problemTypes, problemTemplates, solutionTemplate } from './problemData.js';

let getProbBtn = document.getElementById('getProblem');
let backBtn = document.getElementById('back');
let newProbBtn = document.getElementById('new-problem');
let solutionBtn = document.getElementById('solution');
let icon = document.getElementById('question-mark');
document.getElementById('assignment_name').textContent = assignmentName;

let a, b, c, lengths, answer, problemString, type;
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

function areaInRange(xa, ya, xb, yb, xc, yc) {
  const ac = Math.sqrt((xc - xa) ** 2 + (yc - ya) ** 2);
  const bc = Math.sqrt((xc - xb) ** 2 + (yc - yb) ** 2);
  const area = 0.5 * ac * bc;

  return 10 <= area && area <= 50;
}

function pointsInRange(xa, ya, xb, yb, xc, yc) {
  return (
    -10 < xa && xa < 10 &&
    -10 < ya && ya < 10 &&
    -10 < xb && xb < 10 &&
    -10 < yb && yb < 10 &&
    -10 < xc && xc < 10 &&
    -10 < yc && yc < 10
  );
}

function checkSlopes(a, b, c) {
  const ac_dy = c[1] - a[1];
  const ac_dx = c[0] - a[0];
  const bc_dy = c[1] - b[1];
  const bc_dx = c[0] - b[0];

  if ((ac_dy === 0 && bc_dx === 0) || (ac_dx === 0 && bc_dy === 0)) {
    if (a[0] === 0 || a[1] === 0 || b[0] === 0 || b[1] === 0) {
      return false;
    } else {
      return true;
    }
  }

  if (ac_dx === 0 || ac_dy === 0 || bc_dx === 0 || bc_dy === 0) {
    return false;
  }

  if (ac_dy / ac_dx === -1 * (bc_dx / bc_dy)) {
    return true;
  } else {
    return false;
  }
}

function getSideLength(a, b) {
  return Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
}

function checkSideLengths(length_a, length_b) {
  const length_c = Math.sqrt(length_a ** 2 + length_b ** 2);
  if (
    length_a >= 2 &&
    length_b >= 2 &&
    !(Number.isInteger(length_a) && Number.isInteger(length_b) && Number.isInteger(length_c))
  ) {
    return true;
  } else {
    return false;
  }
}

function checkArea(length_a, length_b) {
  return 20 <= length_a * length_b && length_a * length_b <= 100;
}

function checkAngles(length_a, length_b) {
  return 10 <= (Math.atan(length_a / length_b) * 180) / Math.PI && (Math.atan(length_a / length_b) * 180) / Math.PI <= 80;
}

function conditionsMet(a, b, c) {
  const length_ac = getSideLength(a, c);
  const length_bc = getSideLength(b, c);

  return (
    checkSlopes(a, b, c) &&
    checkSideLengths(length_ac, length_bc) &&
    checkArea(length_ac, length_bc) &&
    checkAngles(length_ac, length_bc)
  );
}

function generateRightTriangle() {
  const function_name = "rightTriangleType" + level + "()";
  
  return eval(function_name);
}

function rightTriangleType1() {
  const triples = [
    [6, 8],
    [8, 6],
    [5, 12],
    [12, 5],
  ];
  const randomTriple = triples[Math.floor(Math.random() * triples.length)];

  let triangle = [];

  while (triangle.length === 0) {
    const xc = Math.floor(Math.random() * 19) - 9;
    const yc = Math.floor(Math.random() * 19) - 9;
    const xa = xc;
    const ya = yc - randomTriple[0];
    const xb = xc - randomTriple[1];
    const yb = yc;

    if (pointsInRange(xa, ya, xb, yb, xc, yc) && !(xc === 0 || yc === 0) && areaInRange(xa, ya, xb, yb, xc, yc)) {
      triangle = [
        [xa, ya],
        [xb, yb],
        [xc, yc],
      ];
    }
  }

  return triangle;
}

function rightTriangleType2() {
  let triangle = [];

  while (triangle.length === 0) {
    const coordinateSet = new Set();
    for (let x = -9; x < 10; x++) {
      for (let y = -9; y < 10; y++) {
        coordinateSet.add(`${x},${y}`);
      }
    }

    const ax = Math.floor(Math.random() * 19) - 9;
    const ay = Math.floor(Math.random() * 19) - 9;
    const a = [ax, ay];
    let bx = Math.floor(Math.random() * 19) - 9;
    let by = Math.floor(Math.random() * 19) - 9;

    while (
      Math.abs(bx - ax) < 2 ||
      Math.abs(by - ay) < 2 ||
      (Math.abs(bx - ax) + Math.abs(by - ay) < 12 && (bx - ax + by - ay) % 2 === 0)
    ) {
      bx = Math.floor(Math.random() * 19) - 9;
      by = Math.floor(Math.random() * 19) - 9;
    }

    const b = [bx, by];

    coordinateSet.delete(`${a[0]},${a[1]}`);
    coordinateSet.delete(`${b[0]},${b[1]}`);

    while (triangle.length === 0 && coordinateSet.size > 0) {
      const randomCoordinate = Array.from(coordinateSet)[Math.floor(Math.random() * coordinateSet.size)];
      const [cx, cy] = randomCoordinate.split(",").map(Number);
      const c = [cx, cy];
      coordinateSet.delete(randomCoordinate);

      if (conditionsMet(a, b, c)) {
        triangle = [
          [a[0], a[1]],
          [b[0], b[1]],
          [c[0], c[1]],
        ];
        
        return triangle.sort((a, b) => a - b);
      }
    }
  }
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
  let points = generateRightTriangle(level)

  a = getSideLength(points[0], points[1])
  b = getSideLength(points[1], points[2])
  c = getSideLength(points[2], points[0])

  lengths = [a, b, c].sort((a, b) => a - b)
  console.log("lengths:", lengths)
  console.log("lengths[0], lengths[1], lengths[2]:", lengths[0], lengths[1], lengths[2])
  // Call insertDateTime function when the page loads
  insertDateTime();
  problemString = problemTemplates[type]
    .replace('{a}', level == 1 ? lengths[0] : lengths[0].toFixed(2))
    .replace('{b}', level == 1 ? lengths[1] : lengths[1].toFixed(2))
    .replace('{c}', level == 1 ? lengths[2] : lengths[2].toFixed(2));

  problem.innerHTML = problemString

  adjustContainerHeight(350);
}

function calculateSolution() {
  console.log("type:", type)
  console.log("lengths[type-1]:", lengths[type-1])
  return lengths[type-1];
}

function checkSolution() {
  answer = calculateSolution();

  let checkInputY2 = parseFloat(input.value).toFixed(2);
  console.log("checkInputY2, answer:", checkInputY2, answer)
  if(checkInputY2 == answer.toFixed(2)) {
    correct();
  }
  else {
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
  inputValueSpan.style.fontSize = '1.35rem';
  inputValueSpan.style.display = 'block';
  inputValueSpan.style.textAlign = 'center';
  document.getElementById('userSolution').appendChild(inputValueSpan);

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

    let solutionString = solutionTemplate[type]
      .replace(/{problemString}/, problemString)
      .replace(/{a}/g, level == 1 ? lengths[0] : lengths[0].toFixed(2))
      .replace(/{b}/g, level == 1 ? lengths[1] : lengths[1].toFixed(2))
      .replace(/{c}/g, level == 1 ? lengths[2] : lengths[2].toFixed(2));

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