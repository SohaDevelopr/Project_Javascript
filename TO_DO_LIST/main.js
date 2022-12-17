// Start Write Code JS

const tasks = document.getElementById("tasks");
const input = document.getElementById("input");
const btnAdd = document.getElementById("add");

// Identification Array Object

let task = {
  "title": "مهمة",
  "isDone": false
};

let listTasks = [
  {
    "title": "مهمة",
    "isDone": false
  },
];

// Storage Array in LocalStorage
listTasks = JSON.parse(localStorage.getItem("myTask"));

// Function Show All Element Array in Webpage
function fillTasksOnThePage() {
  tasks.innerHTML = "";
  let index = 0;
  for (task of listTasks) {
    let content = `       
            <div class="task" dir="rtl">
                <div class="txt">
                ${
                  task.isDone
                    ? `
                <button onclick="completeTask(${index})"><i class="fa-regular fa-circle-xmark" style= "color: red;"></i></button>
                <h2 class="done">${task.title}</h2>
                `
                    : `                
                <button onclick="completeTask(${index})"><i class="fa-regular fa-circle-check"></i></button>
                <h2>${task.title}</h2>
                `
                }
                </div>
                <div class="icon">
                    <button onclick="editTask(${index})"><i class="fa-regular fa-pen-to-square" onMouseOver="this.style.color='#8c78be'"
                    onMouseOut="this.style.color='black'" ></i></button>
                    <button onclick="deleteTask(${index})"><i class="fa-regular fa-trash-can" onMouseOver="this.style.color='red'"
                    onMouseOut="this.style.color='black'" ></i></button>
                </div>
            </div> 
        `;
    tasks.innerHTML += content;
    index++;
  }
}

fillTasksOnThePage();

// Event Add New Object in Array When Click Button

btnAdd.addEventListener("click", function () {
  if (input.value !== "") {
    let taskObj = {
      "title": `${input.value}`,
      "isDone": false
    };

    listTasks.push(taskObj);
    storeTask();
    fillTasksOnThePage();
    input.value = "";
    // Add Animation for new task
    var element = document.querySelector(".task:last-child");
    element.style.animation = "animeTask .3s ease";
  }
});

//Function Check Complete Task

function completeTask(index) {
  let task = listTasks[index];
  if (task.isDone) {
    task.isDone = false;
  } else {
    task.isDone = true;
  }
  storeTask();
  fillTasksOnThePage();
}

// Function Edit Task

function editTask(index) {
  if (input.value !== "") {
    let newTitle = input.value;
    listTasks[index].title = newTitle;
    storeTask();
    fillTasksOnThePage();
    input.value = "";
  }
}

// Function Delete Task

function deleteTask(index) {
  listTasks.splice(index, 1);
  storeTask();
  fillTasksOnThePage();
}

// ================ STORAGE FUNCTION ==================
function storeTask() {
  let taskString = JSON.stringify(listTasks);
  localStorage.setItem("myTask", taskString);
}
