
let input = document.getElementById("input");
let btn = document.getElementById("btn");
let result = document.getElementById("result");

// Add Event Listener for Button Convert

btn.addEventListener("click", () => {
  if(input.value === ""){
      result.innerHTML = "TextBox is Empty"
      result.style.color = "#e53935"
  }
  else {
    if (isNaN(input.value)) {
      result.innerHTML = ConvertString();
    } else {
      result.innerHTML = ConvertNum();
    }
    input.value = ""  
    result.style.color = "#000000"  
  }
});

// Function Convert String

function ConvertString() {
  let val = input.value;
  let binaryStr = "";
  for (var i = 0; i < val.length; i++) {
    binaryStr += val[i].charCodeAt(0).toString(2) + " ";
  }
  return binaryStr;
}

// Function Convert Number

function ConvertNum() {
  let num = parseInt(input.value);
  let res = num.toString(2);
  if (res.length == 1) {
    res = "000" + res;
  } else if (res.length == 2) {
    res = "00" + res;
  } else if (res.length == 3) {
    res = "0" + res;
  }

  return res;
}
