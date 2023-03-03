const toggleDiv = document.querySelector(".toggle"),
  profile = document.querySelector(".profile"),
  followBtn = document.querySelector(".profile button");
let isClick = false;
toggleDiv.addEventListener("click", () => {
  if (!isClick) {
    profile.classList.add("show", "open");
    toggleDiv.classList.add("opacity");
    isClick = true;
  } else {
    profile.classList.remove("show", "open");
    toggleDiv.classList.remove("opacity");
    isClick = false;
  }
});

followBtn.addEventListener("click", () => {
  followBtn.classList.toggle("followBtn");
});
