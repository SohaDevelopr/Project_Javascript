// Start Write Code Javascript

let text = document.getElementById("text");
let word_count = document.getElementById("word-count");
let letter_count = document.getElementById("letter-count");

// Event Listener Textarea
text.addEventListener("input", () => {
  let countLetter = text.value.length;
  let arrStr = text.value.split(" ");
  let countWords = arrStr.length;
  word_count.textContent = `Total Words : ${countWords}`;
  letter_count.textContent = `Total Letters : ${countLetter}`;
});
