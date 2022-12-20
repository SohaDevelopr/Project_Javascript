let counter = document.getElementById("counter");
let increase = document.getElementById("increase");
let decrease = document.getElementById("decrease");

let conut = 0;

// Event Listener Button Increase
increase.addEventListener("click", () => {
  counter.textContent = `${(conut += 1)}`;
  anime({
    targets: "#counter",
    translateY: [35, 0],
  });
});

// Event Listener Button Decrease

decrease.addEventListener("click", () => {
  counter.textContent = `${(conut -= 1)}`;
  anime({
    targets: "#counter",
    translateY: [-35, 0],
  });
});
