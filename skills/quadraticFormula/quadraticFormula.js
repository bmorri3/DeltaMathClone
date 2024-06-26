  import { title, assignmentName, problemTypes, problemTemplates, solutionTemplate } from './problemData.js';

  let getProbBtn = document.getElementById('getProblem');
  let backBtn = document.getElementById('back');
  let newProbBtn = document.getElementById('new-problem');
  let solutionBtn = document.getElementById('solution');
  let icon = document.getElementById('question-mark');
  document.getElementById('assignment_name').textContent = assignmentName;

  let a, b, c, problemString, answer1, answer2;
  let showingSolution = false;

  getProbBtn.addEventListener('click', runProblem);

  newProbBtn.addEventListener('click', function() {
    // Hide solutionContainer
    solutionContainer.style.display = 'none';

    // Show answer-container
    document.getElementById('answer-container').style.display = 'flex';
    // Show the "Submit Answer" button
    document.getElementById('getProblem').style.display = 'block';

    // Show the question mark.
    icon.setAttribute('class', 'fa-solid fa-question');
    icon.style.color = '';

    solutionBtn.textContent = 'Show Solution';
    showingSolution = false;

    // Call runProblem to generate a new problem
    runProblem();
  });


  solutionBtn.addEventListener('click', showSolution);

  // Navigate to skillsMenu.html when back button is clicked
  backBtn.addEventListener('click', function() {
    window.location.href = '../../skillsMenu.html';
  });

  function changeEventListener(funcName) {
    getProbBtn.removeEventListener('click', runProblem);
    getProbBtn.addEventListener('click', funcName);
  }

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

  const MAX_NUM_1_DIGITS = 4;
  const MIN_NUM_1_DIGITS = 3;
  const MIN_NUM_2_DIGITS = 2;

  function rand(a, b) {
      return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  function gcd(a, b) {
      return b ? gcd(b, a % b) : Math.abs(a);
  }

  function discriminant(a, b, c) {
      return b ** 2 - 4 * a * c;
  }

  function perfectSquareFactors(n) {
    let factorProduct = 1;

    if (Math.abs(n) === 1) return 0;

    const squarePrimes = [4, 9, 25, 49, 81, 121, 169, 289, 361, 529, 841, 961];
    for (const square of squarePrimes) {
      if (n % square === 0) {
        factorProduct *= Math.sqrt(square);
      }
    }

    if (factorProduct === 1) return 0;
    else return factorProduct;
  }

  function isPerfectSquare(n) {
    return n === Math.floor(Math.sqrt(n)) ** 2;
  }

  function discriminantInRange(d) {
    return d > 0 && d <= 1000;
  }

  function areMutuallyPrime(a, b, c = -1) {
      if (b === 0) b = a;
      if (c === 0) return true;

      if (c === -1) return gcd(a, b) === 1;
      else return gcd(a, gcd(b, c)) === 1;
  }

  function quadraticType1() {
      a = rand(1, 5);
      b = rand(-20, 20);
      while (b % 2 === 0) {
        b = rand(-20, 20);
      }
      c = rand(-100, 100);
      let d = discriminant(a, b, c);
      let result = { 'a': a, 'b': b, 'c': c };

      while (!discriminantInRange(d) || isPerfectSquare(d) || perfectSquareFactors(d)) {
        c = rand(-100, 101);
        d = discriminant(a, b, c);
        result = { 'a': a, 'b': b, 'c': c };
      }

      return result;
  }

  function quadraticType2() {
      a = rand(1, 5);
      b = rand(-20, 20);
      while (b === 0 || !areMutuallyPrime(2 * a, b)) {
          b = rand(-20, 20);
      }
      c = rand(-100, 100);
      let d = discriminant(a, b, c);
      let result = { 'a': a, 'b': b, 'c': c };
      while (!discriminantInRange(d) || isPerfectSquare(d) || !perfectSquareFactors(d) || !areMutuallyPrime(b ** 2, (2 * a) ** 2, perfectSquareFactors(d))) {
        c = rand(-100, 100);
        d = discriminant(a, b, c);
        result = { 'a': a, 'b': b, 'c': c };
      }

      return result;
  }

  function quadraticType3() {
      a = rand(1, 5);
      b = rand(-20, 20);
      while (areMutuallyPrime(2 * a, b)) {
        a = rand(1, 5);
        b = rand(-20, 20);
      }
      c = rand(-100, 100);
      let d = discriminant(a, b, c);

      while (!discriminantInRange(d) || isPerfectSquare(d) || areMutuallyPrime(b ** 2, (2 * a) ** 2, perfectSquareFactors(d))) {
        c = rand(-100, 100);
        d = discriminant(a, b, c);
      }

      let result = { 'a': a, 'b': b, 'c': c };

      return result;
  }

  function generateQuadratic(type) {
    const function_name = "quadraticType" + type + "()";

    return eval(function_name);
  }


  function runProblem() {
    let prob_type = determineProblemType();
    
    // Clear text box
    document.getElementById('solution1').value = "";
    document.getElementById('solution2').value = "";

    outputProblem(prob_type);

    changeEventListener(checkSolution);
  }


  function outputProblem(type) {

    let coefficients = generateQuadratic(level)

    // Call insertDateTime function when the page loads
    insertDateTime();

    let bString;
    if (b < -1) {
      bString = b;
    } else if (b === -1) {
      bString = "-";
    } else if (b === 1) {
      bString = "+";
    } else if (b > 1) {
      bString = "+" + b;
    }

    problemString = problemTemplates
      .replace(/{a}/g, a === 1 ? "" : a)
      .replace(/{b}/g, bString)
      .replace(/{c}/g, c< 0 ? c: "+" + c);

    problem.innerHTML = problemString

    MathJax.typesetPromise().then(() => {
      MathJax.typeset();
    });

    adjustContainerHeight(350);
  }

  function calculateSolution() {
    let d = discriminant(a, b, c);
    if(d >= 0) {
      let solution1 = (-1*b + Math.sqrt(d))/(2*a);
      solution1 = solution1.toFixed(2);
      let solution2 = (-1*b - Math.sqrt(d))/(2*a);
      solution2 = solution2.toFixed(2);
      return [solution1, solution2].sort();
    }
    else
      return; 
  }

  function checkSolution() {
    let answers = calculateSolution();
    answer1 = answers[0]
    answer2 = answers[1]
    let solutions = [solution1.value, solution2.value].sort()

    let parsedAnswers = answers.map(parseFloat);
    let parsedSolutions = solutions.map(parseFloat);

    if(parsedAnswers[0] == parsedSolutions[0] && parsedAnswers[1] == parsedSolutions[1]) {
      correct();
    }
    else {
      incorrect();
    }

    // Hide the answer-container
    document.getElementById('answer-container').style.display = 'none';
    // Hide the getProblem button
    getProbBtn.style.display = 'none';

    document.getElementById('userSolution').textContent = `Your Solution:`;
    let inputValueSpan = document.createElement('span');
    inputValueSpan.textContent = "$$" + "{" + solution1.value + "," + solution2.value + "}" + "$$";
    inputValueSpan.style.fontSize = '1.2rem';
    inputValueSpan.style.display = 'block';
    inputValueSpan.style.textAlign = 'center';
    document.getElementById('userSolution').appendChild(inputValueSpan);
    
    // Render the LaTeX using MathJax
    MathJax.typesetPromise([inputValueSpan]).then(() => {
      MathJax.typeset([inputValueSpan]);
    });

    // Show the solution and user solution    
    showSolution(level)
    solutionContainer.style.display = 'block';
  }

  function showSolution(type) {
    let answers = calculateSolution();

    if (!showingSolution) {
      // Hide the answer-container
      document.getElementById('answer-container').style.display = 'none';
      // Hide the getProblem button
      getProbBtn.style.display = 'none';

      let bString;
      if (b < -1) {
        bString = b;
      } else if (b === -1) {
        bString = "-";
      } else if (b === 1) {
        bString = "+";
      } else if (b > 1) {
        bString = "+" + b;
      }
      
      let solutionString = solutionTemplate
      .replace(/{a}/, a === 1 ? "" : a)
      .replace(/{b}/, bString)
      .replace(/{c}/, c< 0 ? c: "+" + c)
      .replace(/{a}/g, a)
      .replace(/{b}/g, b)
      .replace(/{c}/g, c)
      .replace(/{answer1}/g, answers[0])
      .replace(/{answer2}/g, answers[1])
      .replace(/{problemString}/g, problemString);

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

      // Render the LaTeX in the problem string
      MathJax.typesetPromise().then(() => {
        MathJax.typeset();        
      });
      adjustContainerHeight(350);
    }    
  }


  function determineProblemType() {
    getProbBtn.innerText = 'Submit Answer';

    return "";
  }

  // Get the input element
  let solution1 = document.getElementById('solution1');
  let solution2 = document.getElementById('solution2');

  // Listen for keydown event on the input element
  solution2.addEventListener('keydown', function(event) {
    // Check if the pressed key is Enter
    if (event.key === 'Enter') {
      // Prevent the default action of the Enter key (form submission)
      event.preventDefault();
      // Programmatically trigger a click event on the "Submit Answer" button
      document.getElementById('getProblem').click();
    }
  });

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

  function adjustContainerHeight(amt) {
    // Get the problem element
    let textElement = document.getElementById('problem');

    // Get the computed height of the problem element
    let textHeight = textElement.scrollHeight + amt;

    // Set the height of the textContainer to the computed height of the problem element
    textContainer.style.height = `${textHeight}px`;
  }

  runProblem()