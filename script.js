// Get DOM elements we'll need
const inputField = document.querySelector('.todo-input input');
const addButton = document.querySelector('.todo-input button');
const todoList = document.querySelector('.todo-list');

// Load todos from browser storage when page loads
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Display existing todos when page loads
renderTodos();

// EVENT LISTENERS
// When user clicks the Add button
addButton.addEventListener('click', addTodo);

// Allow pressing Enter key to add todo
inputField.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// FUNCTIONS

// Add a new todo
function addTodo() {
  const taskText = inputField.value.trim();
  
  // Don't add empty tasks
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }
  
  // Create todo object
  const todo = {
    id: Date.now(), // unique ID
    text: taskText,
    completed: false
  };
  
  // Add to todos array
  todos.push(todo);
  
  // Save to browser storage
  saveTodos();
  
  // Clear input field
  inputField.value = '';
  
  // Refresh display
  renderTodos();
  
  // Focus back on input for quick entry
  inputField.focus();
}

// Display all todos on the page
function renderTodos() {
  // Clear the list
  todoList.innerHTML = '';
  
  // Loop through each todo and create a list item
  todos.forEach((todo) => {
    const li = document.createElement('li');
    
    // Add completed class if marked done
    if (todo.completed) {
      li.classList.add('completed');
    }
    
    // Add text and buttons (grouped in an actions container)
    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="actions">
        <button class="edit-btn">✎</button>
        <button class="delete-btn">✕</button>
      </div>
    `;
    
    // When user clicks the todo item, mark as completed
    li.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        deleteTodo(todo.id);
      } 
      else if (e.target.classList.contains('edit-btn')) {
        editTodo(todo.id);
      }
      else {
        toggleTodo(todo.id);
      }
    });
    
    todoList.appendChild(li);
  });
}

// Mark todo as completed/uncompleted
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

// Delete a todo
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        inputField.value = todo.text;
        deleteTodo(id);
    }   
}

// Save todos to browser storage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
