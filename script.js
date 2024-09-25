const darkModeBtn = document.getElementById('dark-mode');
const taskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode', isDarkMode);
  darkModeBtn.innerHTML = isDarkMode 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem('darkMode', isDarkMode);
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
      <div id="buttons-edit">
        <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
        <button class="complete-btn" data-index="${index}"><i class="fas fa-check"></i></button>
      </div>
    `;
    taskList.appendChild(li);
  });
  saveTasks();
  checkScrollNeeded();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function checkScrollNeeded() {
  const taskList = document.getElementById('task-list');
  if (tasks.length > 5) {
    taskList.style.overflowY = 'auto';
  } else {
    taskList.style.overflowY = 'visible';
  }
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (taskInput.value.trim()) {
    tasks.push({ text: taskInput.value.trim(), completed: false });
    taskInput.value = '';
    renderTasks();
  }
});

taskList.addEventListener('click', (e) => {
  const button = e.target.closest('button');
  if (button) {
    const index = parseInt(button.dataset.index);
    if (button.classList.contains('edit-btn')) {
      const newText = prompt('Editar tarea:', tasks[index].text);
      if (newText) {
        tasks[index].text = newText;
      }
    } else if (button.classList.contains('delete-btn')) {
      tasks.splice(index, 1);
    } else if (button.classList.contains('complete-btn')) {
      tasks[index].completed = !tasks[index].completed;
    }
    renderTasks();
  }
});

darkModeBtn.addEventListener('click', toggleDarkMode);

renderTasks();
checkScrollNeeded();

function applyDarkMode() {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.classList.remove('dark-mode');
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

applyDarkMode();
