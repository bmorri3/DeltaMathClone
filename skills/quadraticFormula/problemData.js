// problemData.js

const title = 'Quadratic Formula'

const assignmentName = 'Quadratic Formula';

const problemTypes = [1, 2, 3];

const problemTemplates = 
  `
  Use the quadratic formula to solve. Express your answer in simplest form. Round to the neares hundredth if necessary.<br>\
  <br>\
  <div class="centered-content">$$\{a}x^2 {b}x {c}$$</div>
  `;

const solutionTemplate = 
  `
  <br>
  Use the quadratic formula to solve. Express your answer in simplest form. Round to the neares hundredth if necessary.<br>\
  <br>\
  <div class="centered-content">$$\{a}x^2 + {b}x + {c}$$</div><br>
  <br>
  <div class="centered-content">
    $$x=\\frac{{-b \\pm \\sqrt{{b^2 4ac}}}}{{2a}}$$
    <br>
    $$x=\\frac{{-({b}) \\pm \\sqrt{{{b}^2 4({a})({c})}}}}{{2({a})}}$$
    <br>
    $$x=\\{{answer1}, {answer2}\\}$$
  </div>
  `;

export { title, assignmentName, problemTypes, problemTemplates, solutionTemplate };