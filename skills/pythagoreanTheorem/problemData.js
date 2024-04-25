// problemData.js

const title = 'Pythagorean Theorem'

const assignmentName = 'Pythagorean Theorem';

const problemTypes = [1, 2, 3];

const problemTemplates = {
  1: 'Triangle ABC is a right triangle, and angle C is the right angle. If AB is {c} and BC is {b}, find the length of AC. Round to the nearest hundredth if necessary.',
  2: 'Triangle ABC is a right triangle, and angle C is the right angle. If AC is {a} and AB is {c}, find the length of BC. Round to the nearest hundredth if necessary.',
  3: 'Triangle ABC is a right triangle, and angle C is the right angle. If AC is {b} and BC is {a}, find the length of AB. Round to the nearest hundredth if necessary.'
};

const solutionTemplate = {
  1: `
  {problemString}<br><br>
  You are given two of three sides of a right triangle. Your job is to find the length of the missing side.
  <br><br>Angle C is the right angle. Therefore, side AB is the hypotenuse.
  <br>$$ a^2 + b^2 = c^2 $$
  <div class="centered-content">
    You are missing side AC.
    $$ AC^2 + {b}^2 = {c}^2 $$
    $$ AC^2 = {c}^2 - {b}^2$$
    $$ AC = \\sqrt{{c}^2 - {b}^2} $$
    $$ AC = {a}$$
  </div>`,
  2: `
  {problemString}<br><br>
  You are given two of three sides of a right triangle. Your job is to find the length of the missing side.
  <br><br>Angle C is the right angle. Therefore, side AB is the hypotenuse.
  <br>$$ a^2 + b^2 = c^2 $$
  <div class="centered-content">
    You are missing side BC.
    $$ {a}^2 + BC^2 = {c}^2 $$
    $$ BC^2 = {c}^2 - {a}^2 $$
    $$ BC = \\sqrt{{c}^2 - {a}^2} $$
    $$ BC = {b} $$
  </div>`,
  3: `
  {problemString}<br><br>
  You are given two of three sides of a right triangle. Your job is to find the length of the missing side.
  <br><br>Angle C is the right angle. Therefore, side AB is the hypotenuse.
  <br>$$ a^2 + b^2 = c^2 $$
  <div class="centered-content">
    You are missing side AB.
    $$ {a}^2 + {b}^2 = AB^2 $$
    $$ AB = \\sqrt{{a}^2 + {b}^2} $$
    $$ AB = {c} $$
  </div>`
};


export { title, assignmentName, problemTypes, problemTemplates, solutionTemplate };