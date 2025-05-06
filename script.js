let tasks = [];

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  // Attach original index to each task before sorting
  const sortedTasks = tasks
    .map((task, i) => ({ ...task, originalIndex: i }))
    .sort((a, b) => a.completed - b.completed);

  sortedTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleTask(task.originalIndex);

    const text = document.createElement('span');
    text.className = 'text';
    text.textContent = task.description;

    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = '🗑️';
    deleteBtn.onclick = () => deleteTask(task.originalIndex);

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}


    function addTask() {
      const input = document.getElementById('newTask');
      const description = input.value.trim();
      
      if (description) {
        tasks.push({ description, completed: false });
        input.value = '';
        renderTasks();
      }
    }

    function toggleTask(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }

    document.getElementById('newTask').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addTask();
      }
    });
