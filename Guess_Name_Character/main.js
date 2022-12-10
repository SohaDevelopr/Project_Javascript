

// Javascrpit

const input = document.getElementById("input");
const box_img = document.getElementById("box-img");
const img = document.getElementById("img");
const submit = document.getElementById("submit");
const newPlay = document.getElementById("newPlay");
const result = document.getElementById("result");

var arr = [
    "img-1.jfif",
    "img-2.jfif",
    "img-3.jfif",
    "img-4.jfif",
    "img-5.jfif",
    "img-6.jfif",
    "img-7.png",
    "img-8.jfif",
    "img-9.jfif",
    "img-10.png",
    "img-11.jfif",
    "img-12.png",
    "img-13.png",
    "img-14.png",
    "img-15.jfif",
  ];

function GuessImage(list) {
  var myPic = Math.floor(Math.random() * list.length);
  return `imgs/${list[myPic]}`;
}

submit.addEventListener("click", function () {
  var list = arr
  var getSrc = img.getAttribute("src");
  var massage = ["صح عليك جبتها صح", "ماعليه حاول مرة ثانية"];
  result.style.color = "#439A97";
  if (input.value == "") {
    result.innerHTML = "الحقل فارغ";
    result.style.color = "#D2001A";
  } else if (getSrc === `imgs/${list[0]}` && input.value == "جودي") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (getSrc === `imgs/${list[1]}` && input.value == "ماري") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (getSrc === `imgs/${list[2]}` && input.value == "جيري") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (getSrc === `imgs/${list[3]}` && input.value == "توم") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (getSrc === `imgs/${list[4]}` && input.value == "دورا") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (getSrc === `imgs/${list[5]}` && input.value == "ماشا") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (
    getSrc === `imgs/${list[6]}` &&
    input.value == "النمر الوردي"
  ) {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (getSrc === `imgs/${list[7]}` && input.value == "ميكي ماوس") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (getSrc === `imgs/${list[8]}` && input.value == "بطوط") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (getSrc === `imgs/${list[9]}` && input.value == "بسيط") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (getSrc === `imgs/${list[10]}` && input.value == "سبونج بوب") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (getSrc === `imgs/${list[11]}` && input.value == "مدام نفيخة") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (getSrc === `imgs/${list[12]}` && input.value == "غامبول") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (getSrc === `imgs/${list[13]}` && input.value == "دارون") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else if (getSrc === `imgs/${list[14]}` && input.value == "كونان") {
    result.innerHTML = massage[0];
    box_img.style.filter = "blur(0px)";
  } else {
    result.innerHTML = massage[1];
    result.style.color = "#D2001A";
  }
});

newPlay.addEventListener("click", function () {
  input.placeholder = "ادخل تخمينك";
  input.value = "";
  input.innerHTML;
  img.src = GuessImage(arr);
  img.innerHTML;
  result.innerHTML = "";
  box_img.style.filter = "blur(3px)";
});