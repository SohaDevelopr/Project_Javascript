let changeBtn = document.querySelectorAll(".box-edit .change");
let btnArray = Array.from(changeBtn);
let edits = document.querySelectorAll(".box-edit .edit");
let editsArray = Array.from(edits);
let output = document.getElementById("output");

let htmlStart = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Browser</title>
</head>
<body>

</body>
</html>
`;
// INITIAL VALE FOR EDIT HTML
editsArray[0].value = htmlStart;

// TAB LAYOUT
btnArray.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    btnArray.forEach((ele) => {
      ele.classList.remove("active");
    });

    e.currentTarget.classList.add("active");

    editsArray.forEach((edit) => {
      edit.style.display = "none";
    });
    document.querySelector(e.currentTarget.dataset.cont).style.display =
      "block";
  });
});

// ========== FUNCTION RUN CODE INSIDE TEXT AREA IN IFRAME ==========

function run() {
  let htmlCode = editsArray[0].value;
  let cssCode = editsArray[1].value;
  let jsCode = editsArray[2].value;

  output.contentDocument.body.innerHTML =
    htmlCode + "<style>" + cssCode + "</style>";
  output.contentWindow.eval(jsCode);
}

// ========== FUNCTION RESTART PAGE ==========

function restart() {
  window.location.reload();
}
// ========== FUNCTION DARK MODE ==========
function darkMode() {
  document.body.classList.toggle("dark-mode");
}

// ========== FUNCTION DOWNLOAD FILES ==========
function download() {
  const fileHtml = new Blob([editsArray[0].value], { type: "text/html" });
  const file_1_Url = URL.createObjectURL(fileHtml);
  const link_1 = document.createElement("a");
  link_1.download = "index.html";
  link_1.href = file_1_Url;
  link_1.click();

  const fileCss = new Blob([editsArray[1].value], { type: "text/css" });
  const file_2_Url = URL.createObjectURL(fileCss);
  const link_2 = document.createElement("a");
  link_2.download = "style.css";
  link_2.href = file_2_Url;
  link_2.click();

  const fileJs = new Blob([editsArray[1].value], { type: "text/javascript" });
  const file_3_Url = URL.createObjectURL(fileJs);
  const link_3 = document.createElement("a");
  link_3.download = "main.js";
  link_3.href = file_3_Url;
  link_3.click();
}
