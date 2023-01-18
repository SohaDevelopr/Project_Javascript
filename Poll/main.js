// Definition Checkbox By Id
const checkbox_1 = document.getElementById("check1");
const checkbox_2 = document.getElementById("check2");
const checkbox_3 = document.getElementById("check3");

// Definition Box Progress By Id
let progress_1 = document.getElementById("pgs-1");
let progress_2 = document.getElementById("pgs-2");
let progress_3 = document.getElementById("pgs-3");

// Definition Box Percent By Id
let percent_1 = document.getElementById("per-1");
let percent_2 = document.getElementById("per-2");
let percent_3 = document.getElementById("per-3");

// intiail value progress by percent
let checkbox_value_1 = 65;
let checkbox_value_2 = 12;
let checkbox_value_3 = 23;

const btn = document.getElementById("btn");

// Function Select Only One Option
function selectOnlyThis(id) {
    for (var i = 1;i <= 3; i++)
    {
        document.getElementById("check" + i).checked = false;
    }
    document.getElementById(id).checked = true;
}

// Effect Click Button Submit
btn.addEventListener("click", () => {
  if (checkbox_1.checked == true) {
    progress_1.style.setProperty(
      "--afterWidth",
      `${checkbox_value_1 < 100 ? checkbox_value_1++ : 100}%`
    );
    percent_1.textContent = `${
      checkbox_value_1 < 100 ? checkbox_value_1++ : 100
    }%`;
  }


  if (checkbox_2.checked == true) {
    progress_2.style.setProperty(
      "--afterWidth",
      `${checkbox_value_2 < 100 ? checkbox_value_2++ : 100}%`
    );
    percent_2.textContent = `${
      checkbox_value_2 < 100 ? checkbox_value_2++ : 100
    }%`;
  }

  if (checkbox_3.checked == true) {
    progress_3.style.setProperty(
      "--afterWidth",
      `${checkbox_value_3 < 100 ? checkbox_value_3++ : 100}%`
    );
    percent_3.textContent = `${
      checkbox_value_3 < 100 ? checkbox_value_3++ : 100
    }%`;
  }
});
