let btnLeft = document.getElementById("btn-left");
let btnRight = document.getElementById("btn-right");
let box_img = document.getElementById("box-img");

// Scroll Box Img OncliK Button

btnLeft.onclick = () => {
  box_img.scrollLeft -= 50;
};

btnRight.onclick = () => {
  box_img.scrollLeft += 50;
};

// Change Body Background Image Onclick img

let img_1 = document.getElementById("img-1");
let img_2 = document.getElementById("img-2");
let img_3 = document.getElementById("img-3");
let img_4 = document.getElementById("img-4");
let img_5 = document.getElementById("img-5");
let img_6 = document.getElementById("img-6");
let img_7 = document.getElementById("img-7");

// Add Active Class
toggleItem(document.querySelectorAll(".img"));

img_1.onclick = () => {
  document.body.style.backgroundImage = `url(../${img_1.getAttribute("src")})`;
};

img_2.onclick = () => {
  document.body.style.backgroundImage = `url(../${img_2.getAttribute("src")})`;
};

img_3.onclick = () => {
  document.body.style.backgroundImage = `url(../${img_3.getAttribute("src")})`;
};

img_4.onclick = () => {
  document.body.style.backgroundImage = `url(../${img_4.getAttribute("src")})`;
};

img_5.onclick = () => {
  document.body.style.backgroundImage = `url(../${img_5.getAttribute("src")})`;
};

img_6.onclick = () => {
  document.body.style.backgroundImage = `url(../${img_6.getAttribute("src")})`;
};

img_7.onclick = () => {
  document.body.style.backgroundImage = `url(../${img_7.getAttribute("src")})`;
};

// Add Class Active Onclick

function toggleItem(elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function (e) {
      var current = this;
      for (var i = 0; i < elem.length; i++) {
        if (current != elem[i]) {
          elem[i].classList.remove("active");
        } else {
          current.classList.add("active");
        }
      }
      e.preventDefault();
    });
  }
}
