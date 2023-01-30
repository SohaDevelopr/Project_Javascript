// Javascript Code

const popup_box = document.getElementById("popup-box"),
  btn_add = document.getElementById("btn-add"),
  close_win = document.getElementById("close-win"),
  titleTag = popup_box.querySelector("input"),
  descTag = popup_box.querySelector("textarea"),
  popupTitle = popup_box.querySelector("header p"),
  addBtn = popup_box.querySelector("#btnAdd"),
  contect = document.getElementById("contect");

// List Months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let isUpdate = false,updateId;

// Event Listener Button Add Note
btn_add.addEventListener("click", () => {
  popup_box.style.display = "block";
});

// Close Widonw Add/Update Note
close_win.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  popupTitle.innerHTML = "Add a new Note";
  addBtn.innerHTML = "Add Note";
  popup_box.style.display = "none";
});

// List Notes

let note = {
  "title": "This is a Title",
  "description": `These book cover makers are great if you are a self published author wanting to make your
     own book cover in seconds! No Photoshop or Illustrator needed.`,
  "date": "April 3, 2023",
};

let notes = [
  {
    "title": "This is a Title",
    "description": `These book cover makers are great if you are a self published author wanting to make your
      own book cover in seconds! No Photoshop or Illustrator needed.`,
    "date": "April 3, 2023",
  },
];

// Store Note in Local Storage

notes = JSON.parse(localStorage.getItem("myNote"));
console.log(notes);


// ========== Function Show Notes in The Page ==========
function fillNotesOnThePage() {
  contect.innerHTML = "";
  let index = 0;
  for (note of notes) {
    let contect_note = `       
            <div class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>

            <div class="bottom-contect">
                <span>${note.date}</span>
                <div class="settings">
                <button onclick="deleteNote(${index})"><i class="fa-regular fa-trash-can"></i></button>
                <button onclick="editNote(${index})"><i class="fa-regular fa-pen-to-square"></i></button>
                </div>
            </div>

            </div>
          `;
    contect.innerHTML += contect_note;
    index++;
  }
}

storeNote();
fillNotesOnThePage();


// ========== Add New Note ==========
addBtn.addEventListener("click", () => {
  let noteObj = {
    "title": `${titleTag.value.trim()}`,
    "description": `${descTag.value.trim()}`,
    "date": getDate(),
  };
  if (!isUpdate) {
    notes.unshift(noteObj);
  } else {
    isUpdate = false;
    notes[updateId] = noteObj;
  }
  close_win.click();
  storeNote();
  fillNotesOnThePage();
  // Add Animation To The New Note
  var element = document.querySelector(".note:first-child");
  element.style.animation = "anime .3s ease";
  
});

// ========== Function Update Note ==========

function editNote(index) {
  isUpdate = true;
  updateId = index;
  btn_add.click();
  popupTitle.innerHTML = "Update a Note";
  addBtn.innerHTML = "Update Note";
  titleTag.value = notes[index].title.trim();
  descTag.value = notes[index].description.trim();
  notes[index].date = getDate();
  storeNote();
  fillNotesOnThePage();
}

// ========== Function Delete Note ==========

function deleteNote(index) {
  notes.splice(index, 1);
  storeNote();
  fillNotesOnThePage();
}

// ========== Function Get Current Date ==========

function getDate() {
  let currentDate = new Date(),
    month = months[currentDate.getMonth()],
    day = currentDate.getDate(),
    year = currentDate.getFullYear();
  return `${month} ${day}, ${year}`;
}

// ================ STORAGE FUNCTION ==================
function storeNote() {
  let noteString = JSON.stringify(notes);
  localStorage.setItem("myNote", noteString)
}
