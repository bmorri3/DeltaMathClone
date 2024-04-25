// utilities.js

export function random(max=200) {
  return Math.floor(Math.random()*max) + 1;
}

export function toggleIconCorrect() {
  icon.style.color = 'rgb(64, 222, 28)';
}

export function toggleIconIncorrect() {
  icon.style.color = 'rgb(250, 31, 19)';
}

export function correct() {
  icon.setAttribute('class', 'fa-solid fa-check');
  toggleIconCorrect();
}

export function incorrect(){
  icon.setAttribute('class', 'fa-solid fa-xmark');
  toggleIconIncorrect();
}

export function refresh() {
  setTimeout(() => {
    location.reload();
  }, 1500)
}

export function insertDateTime() {
  const currentDate = new Date();
  const options = { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  const formattedDate = currentDate.toLocaleString('en-US', options);
  document.getElementById('datetime').textContent = formattedDate;
}

export function adjustContainerHeight() {
  // Get the problem element
  let textElement = document.getElementById('problem');

  // Get the computed height of the problem element
  let textHeight = textElement.scrollHeight + 350;

  // Set the height of the textContainer to the computed height of the problem element
  textContainer.style.height = `${textHeight}px`;
}

// Get the input element
let yInput = document.getElementById('yInput');

// Listen for keydown event on the input element
yInput.addEventListener('keydown', function(event) {
  // Check if the pressed key is Enter (keyCode 13)
  if (event.key === 'Enter') {
    // Prevent the default action of the Enter key (form submission)
    event.preventDefault();
    // Programmatically trigger a click event on the "Submit Answer" button
    document.getElementById('getProblem').click();
  }
});
