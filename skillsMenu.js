let inverseVariationBtn = document.getElementById('inverseVariation');
let quadraticFormula1Btn = document.getElementById('quadraticFormula1');
let quadraticFormula2Btn = document.getElementById('quadraticFormula2');
let quadraticFormula3Btn = document.getElementById('quadraticFormula3');

inverseVariationBtn.addEventListener('click', function() {
  window.location.href = 'skills/inverseVariation/inverseVariation.html';
});

quadraticFormula1Btn.addEventListener('click', function() {
  window.location.href = 'skills/quadraticFormula/quadraticFormula.html?level=1';
});

quadraticFormula2Btn.addEventListener('click', function() {
  window.location.href = 'skills/quadraticFormula/quadraticFormula.html?level=2';
});

quadraticFormula3Btn.addEventListener('click', function() {
  window.location.href = 'skills/quadraticFormula/quadraticFormula.html?level=3';
});