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
  {problemString}<br>\
  <br>
  <div class="centered-content">
    X and Y vary inversely.<br>\
    X*Y = k, the constant of variation.<br>\
    k = {X1} * {Y1}<br>\
    k = {k}<br>\
    <br>\
    X2 * Y2 = k<br>\
    Since X2 = {X2}<br>\
    {X2} * Y2 = {k}<br>\
    Y2 = {k} / {X2}<br>\
    Y2 = {correctY2}<br>\
    <br>\
    Final Answer:<br>
    {correctY2}
  </div>
  `;

export { title, assignmentName, problemTypes, problemTemplates, solutionTemplate };