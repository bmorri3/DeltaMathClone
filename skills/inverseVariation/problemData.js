// problemData.js

const title = 'Inverse Variation'

const assignmentName = 'Inverse Variation (alternate)';

const problemTypes = ['numeric', 'verbal'];

const problemTemplates = {
  numeric: 'X and Y vary inversely. What is the value of Y if {Y1} when X is {X1}, what is the value of Y when X is {X2}? Round answers to the nearest hundredth.',
  verbal: 'Current and resistance vary inversely. If the resistance is {Y1} Amps when the current is {X1} Ohms, what is the current (in Amps) when the resistance is {X2} Ohms? Round answers to the nearest hundredth.'
};

const solutionTemplate = 
  `
  <br>
  {problemString}<br>
  <br>
  <div class="centered-content">
    X and Y vary inversely.<br>
    X*Y = k, the constant of variation.<br>
    $$ k = {X1} \\cdot {Y1} $$
    $$k = {k} $$
    $$ X2 \\cdot Y2 = k $$
    $$ X2 = {X2} $$
    $$ {X2} \\cdot Y2 = {k} $$
    $$ Y2 = {k} \\div {X2} $$
    $$ Y2 = {correctY2} $$
    <br>
    Final Answer:
    $$ {correctY2} $$
  </div>
  `;

export { title, assignmentName, problemTypes, problemTemplates, solutionTemplate };