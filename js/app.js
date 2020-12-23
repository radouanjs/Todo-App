// Tasks variables
let descriptionInp = document.querySelector("#description");
let addBtn = document.querySelector("#add");
let tasksList = document.querySelector(".tasks-list");

// Statistics variables
let totalTsks = document.querySelector("#total");
let compTsks = document.querySelector("#comp");
let incompTsks = document.querySelector("#incomp");

// create a databas
let db;

db = JSON.parse(localStorage.getItem('data')) || [];
updateUi(db);
function calculateTotalTask(todos){
    return todos.length;
}
function calculateCompTask(todos){
    let sum = 0;
    todos.forEach(todo => {
        if(todo.completed === true){
            sum ++;
        }
    });
    return sum;
}
function calculateIncompTask(todos){
    let sum = 0;
    todos.forEach(todo => {
        if(todo.completed === false){
            sum ++;
        }
    });
    return sum;
}

function updateUi(todos){
    
    tasksList.innerHTML = "";
    todos.forEach((todo, index) => {

        LINE_THROUGH = todo.completed === true ? "line-through" : "";
        CHECKMARK = todo.completed === true ? "fa-check-square" : "fa-square"

        let html = `
           <div class="task-item flex j-c-sb" id="${index}">
              <div class="task-des flex">
                  <i class="fa ${CHECKMARK}" id="mark"></i>
                  <p class="${LINE_THROUGH}">${todo.description}</p>
              </div>
              <div class="task-options flex j-c-sb">
                  <i class="fa fa-edit" id="edit"></i>
                  <i class="fa fa-times" id="delete"></i>
              </div>
           </div>
        `;
        tasksList.insertAdjacentHTML("afterbegin", html);
    });
    
    totalTsks.textContent = calculateTotalTask(todos);
    compTsks.textContent = calculateCompTask(todos);
    incompTsks.textContent = calculateIncompTask(todos);

    localStorage.setItem('data', JSON.stringify(db));
}
// Function that adds a new ToDo
function addToDo(){
    if(descriptionInp.value === "") return;
    // Get todo info
    let toDo = {
        description: descriptionInp.value,
        completed: false
    };

    db.push(toDo);
    updateUi(db);
    descriptionInp.value = "";
}

function deleteEdit(e){
    let element = e.target;

    let parent = element.parentNode;
    let grandParent = parent.parentNode;
    let id = +grandParent.id;

    if(element.id === "delete"){
        db.splice(id, 1);
    }
    if(element.id === "edit"){
        let description =  db[id].description;
        descriptionInp.value = description;
        db.splice(id, 1);
    }
    if(element.id === "mark"){
        if(db[id].completed === true){
            db[id].completed = false;
        }else if(db[id].completed === false){
            db[id].completed = true;
        }
    }
    updateUi(db);
}


addBtn.addEventListener('click', addToDo);
tasksList.addEventListener('click', deleteEdit);