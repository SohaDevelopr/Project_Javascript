let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let output = document.getElementById("output");
let check_output = document.getElementById("check-output");
let messeage = document.getElementById("messeage");

// Function Randow Number
function RandowNumber() {
  return Math.floor(Math.random() * 101);
}

let num1 = RandowNumber();
let num2 = RandowNumber();
input1.textContent = `${num1}`;
input2.textContent = `${num2}`;

messeage.style.color = "#4db6ac";

// Add Event Listener for Button
check_output.addEventListener("click", () => {
  let total = num1 + num2;
  messeage.style.backgroundColor = "#fcfcfc";
  if (output.value === "") {
    messeage.innerHTML = "Please, Enter Your Answer ";
    messeage.style.color = "#ef5350";
  } else {

    if (total == output.value) {
      messeage.innerHTML = `Correct Answer! ${total}`;
      messeage.style.color = "#4db6ac";
      output.style.border = "none";
      output.style.color = "#4db6ac";
      // Refresh Page
      setTimeout(() => {window.location.reload();}, 1000);
    } else {
      messeage.innerHTML = "Incorrect Answer" + "</br>" + "Try again";
      messeage.style.color = "#ef5350";
      output.style.border = "1.5px solid #ef5350";
      output.style.color = "#ef5350";
    }

  }
});
