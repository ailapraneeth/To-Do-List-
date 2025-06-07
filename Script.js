let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => renderTask(task.text, task.completed, index));
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task-text").innerText,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(text, completed = false, index = null) {
  let li = document.createElement("li");
  if (completed) li.classList.add("completed");

  let span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;
  span.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  let actions = document.createElement("div");
  actions.className = "task-actions";

  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.onclick = () => {
    let newText = prompt("Edit task:", text);
    if (newText) {
      span.textContent = newText;
      saveTasks();
    }
  };

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  actions.append(editBtn, deleteBtn);
  li.append(span, actions);
  taskList.appendChild(li);
}

function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") return alert("Task cannot be empty.");
  renderTask(taskText);
  saveTasks();
  taskInput.value = "";
}

window.onload = loadTasks;
