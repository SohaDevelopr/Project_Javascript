let circle = document.getElementById("circle"),
gradientColor = document.getElementById("gradient-color"),
generateBtn = document.getElementById("generate-btn")
;

circle.onclick = () => {
  circle.style.setProperty("--after-opacity", "1");
  navigator.clipboard.writeText(output);
  setTimeout(() => {
    circle.style.setProperty("--after-opacity", "0");
  },1000);
};

let hexString = "0123456789abcdef";

let randomColor = () => {
    let hexCode = "#"
    for(var i=0; i<6; i++){
      hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }

    return hexCode;
}

var output = "background: linear-gradient(#2196f3, #e3f2fd);";

let generateGrad = () => {
    let colorOne = randomColor();
    let colorTwo = randomColor();
    let angle = Math.floor(Math.random() * 360);
    gradientColor.style.background = `linear-gradient(${angle}deg , ${colorOne} , ${colorTwo})`
    // console.log(colorOne,colorTwo)
    output = `background: linear-gradient(${angle}deg , ${colorOne} , ${colorTwo});`
}

generateBtn.addEventListener("click", generateGrad);

// window.onload = generateGrad;