
// the saved object in the device
var taskArray;

// in case it has previous value stored in device then retrieve it, otherwise create an empty object
if (localStorage.getItem("todoList")) {
  taskArray = JSON.parse(localStorage.getItem("todoList"));
}
else {
  taskArray = {
    notCompletedTasks: [],
    completedTasks: []
  }
}




// getting the previous todo lists saved in case present
getSavedTodoLists();
// getting the previous todo lists saved in case present
function getSavedTodoLists() {

    // if both empty then return
    if (!taskArray.completedTasks.length && !taskArray.notCompletedTasks.length) return;


   for (var i = 0; i < taskArray.notCompletedTasks.length; ++i) {
     var value = taskArray.notCompletedTasks [i];
     addTask (value,"not-completed-tasks");
  }

  for (var i = 0; i < taskArray.completedTasks.length; ++i) {
    var value = taskArray.completedTasks [i];
    addTask (value,"completed-tasks");
 }


}

function updateSavedObject() {
  localStorage.setItem("todoList", JSON.stringify(taskArray));

  console.log(taskArray);
}

// setting clicking on add-button event
document.getElementById('add-button').addEventListener('click', function() {
  var value = document.getElementById("input-field").value;
  if (value) {
    addItem(value);
  }
});

// setting the click of enter event
document.getElementById("input-field").addEventListener('keydown', function (e) {
  var value = document.getElementById("input-field").value;

    if (e.code === "Enter" && value) {
      addItem(value);
    }
})

function addItem(value) {
  // have to be a mid function her because in addTask when completed-tasks is passed, we don't push the value to the
  // notCompletedTasks Array
  addTask(value,"not-completed-tasks");
  taskArray.notCompletedTasks.push(value);

  //restoring the input field value to null
  document.getElementById("input-field").value = "";

  updateSavedObject();
}
// clicking on add-button
function addTask(value, targetList) {

  // mostly targetList will be not-completed-tasks, the only time it changes to completed-tasks is when rendering from a saved
  // object and needs to add an item to the completed html list
  var list = document.getElementById(targetList);

  // pushing the value (text) of the task to the taskarray for not completed
  //taskArray.notCompletedTasks.push(value);


  var item = document.createElement("li");
  item.classList.add("task-item")
  item.innerText = value;

  var buttons = document.createElement("div");
  buttons.classList.add("buttons-div");

  var remove = document.createElement("i");
  remove.classList.add("manipulate-button-complete");
  remove.classList.add("fa");
  remove.classList.add("fa-remove")
  // remove click Event
  remove.onclick = removeTask;

  var complete = document.createElement("i");
  complete.classList.add("manipulate-button-remove");
  complete.classList.add("fa");
  complete.classList.add("fa-check-circle")
  // complete click Event
  complete.onclick = completeTask;


  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);
  list.insertBefore(item, list.childNodes[0]);

}

function removeTask(e) {
  var item = this.parentNode.parentNode;
  // parent is ul
  var parent = item.parentNode;
  var id = parent.id;

  parent.removeChild(item);

  // Removing the item from the appropriate array in the taskArray object
  // the text of the specific task
  var taskText = item.innerText;
  if (id === "not-completed-tasks") {
    // delete the element having the text from notCompletedTasks array
    taskArray.notCompletedTasks.splice(taskArray.notCompletedTasks.indexOf(taskText), 1);
  }
  else {
    taskArray.completedTasks.splice(taskArray.completedTasks.indexOf(taskText), 1);
  }

  // update the saved object in the device
  updateSavedObject();

}

function completeTask (e) {
  var item = this.parentNode.parentNode;
  // parent is ul
  var parent = item.parentNode;
  var id = parent.id;

  parent.removeChild(item);

  // deciding and picking the goal list where the item (task) is going
  var goal;
  if (id === "not-completed-tasks") {
      goal = document.getElementById("completed-tasks");
  }
  else {
    goal = document.getElementById("not-completed-tasks");
  }

  // insert the node into the goal List
  goal.insertBefore(item, goal.childNodes[0]);


  // Saving the task on the appropriate array in the taskArray object
  // the text of the specific task
  var taskText = item.innerText;
  if (id === "not-completed-tasks") {
    // delete the element having the text from notCompletedTasks array
    taskArray.notCompletedTasks.splice(taskArray.notCompletedTasks.indexOf(taskText), 1);
    // adding the text to completedTasks array
    taskArray.completedTasks.push(taskText);
  }
  else {
    taskArray.completedTasks.splice(taskArray.completedTasks.indexOf(taskText), 1);
    taskArray.notCompletedTasks.push(taskText);
  }

  // update the saved object in the device
  updateSavedObject();

}
