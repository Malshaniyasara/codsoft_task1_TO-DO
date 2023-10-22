const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

let tasks = getTasksFromLocalStorage();

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task}</span>
      <button class="edit" onclick="editTask(${index})">&#9998;</button>
      <button class="delete" onclick="deleteTask(${index})">&#10006;</button>
    `;
    taskList.appendChild(li);
  });
}

// Add a new task
addTaskButton.addEventListener('click', function () {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push(taskText);
    saveTasksToLocalStorage();
    renderTasks();
    taskInput.value = '';
  }
});

// Edit a task
function editTask(index) {
  const updatedTaskText = prompt('Edit the task:', tasks[index]);
  if (updatedTaskText !== null) {
    tasks[index] = updatedTaskText;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Delete a task
function deleteTask(index) {
  const confirmDelete = confirm('Are you sure you want to delete this task?');
  if (confirmDelete) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Initial rendering
renderTasks();
