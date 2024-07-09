// Get HTML elements
const columns = document.querySelectorAll('.column');
const newTaskInput = document.getElementById('newTaskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const filterInput = document.getElementById('filterInput');
const filterBtn = document.getElementById('filterBtn');

// Function to handle drag start
function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

// Function to handle drag over
function handleDragOver(event) {
  event.preventDefault();
}

// Function to handle drop
function handleDrop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  const targetColumn = event.target.closest('.column');

  if (targetColumn) {
    const targetColumnId = targetColumn.id;
    const sourceElement = document.getElementById(data);

    if (targetColumnId !== sourceElement.closest('.column').id) {
      targetColumn.querySelector('.cards').appendChild(sourceElement);
    }
  }
}

// Function to create a new task element with tags
function createTask(text) {
  const task = document.createElement('div');
  task.classList.add('task');
  task.setAttribute('draggable', true);
  task.textContent = text;
  task.id = 'task-' + Date.now(); // Generate a unique ID for each task

  // Add tag input field
  const tagInput = document.createElement('input');
  tagInput.classList.add('tag-input');
  tagInput.placeholder = 'Add tags';
  task.appendChild(tagInput);

  // Add tags display area
  const tags = document.createElement('div');
  tags.classList.add('tags');
  task.appendChild(tags);

  // Event listener for adding tags
  tagInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addTag(task, tagInput.value);
      tagInput.value = '';
    }
  });

  // Add event listeners for drag-and-drop
  task.addEventListener('dragstart', handleDragStart);
  task.addEventListener('dragover', handleDragOver);
  task.addEventListener('drop', handleDrop);

  // Append the task to the "To Do" column
  document.querySelector('#todo .cards').appendChild(task);
}

// Function to add a tag to a task
function addTag(task, tagText) {
  const tag = document.createElement('span');
  tag.classList.add('tag');
  tag.textContent = tagText;
  task.querySelector('.tags').appendChild(tag);
}

// Function to filter tasks
function filterTasks(filter) {
  const tasks = document.querySelectorAll('.task');

  tasks.forEach((task) => {
    const taskText = task.textContent.toLowerCase();
    const tags = Array.from(task.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

    // Check if the task text or any of its tags contains the filter
    if (taskText.includes(filter.toLowerCase()) || tags.includes(filter.toLowerCase())) {
      task.style.display = 'block'; // Show the task
    } else {
      task.style.display = 'none'; // Hide the task
    }
  });
}

// Event listeners
addTaskBtn.addEventListener('click', () => {
  const text = newTaskInput.value.trim();
  if (text !== '') {
    createTask(text);
    newTaskInput.value = '';
  }
});

filterBtn.addEventListener('click', () => {
  const filter = filterInput.value;
  filterTasks(filter);
});

// Event listeners for the "In Progress" and "Done" columns
const inProgressColumn = document.getElementById('inprogress');
inProgressColumn.addEventListener('dragover', handleDragOver);
inProgressColumn.addEventListener('drop', handleDrop);

const doneColumn = document.getElementById('done');
doneColumn.addEventListener('dragover', handleDragOver);
doneColumn.addEventListener('drop', handleDrop);
