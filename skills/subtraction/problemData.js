// problemData.js

const title = 'Subtraction'

const assignmentName = 'Subtraction';

const problemTypes = [1, 2, 3];

const problemTemplates = {
  1: 'Find the difference between {a} and {b}.',
  2: 'Evaluate: {a} - {b}',
  3: 'What is {a} minus {b}?'
};

const solutionTemplate = 
  `
  {problemString}<br> 
  <div class="centered-content">
    $$ {a} - {b} = {a-b} $$
    <br>Answer: $$ {a-b} $$
  </div>
  `;

export { title, assignmentName, problemTypes, problemTemplates, solutionTemplate };