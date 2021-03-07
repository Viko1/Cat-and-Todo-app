//Selectors
const toDoInput = document.querySelector('.todo-input');
const toDoButton = document.querySelector('.todo-button');
const toDoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
toDoButton.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterToDo);
document.addEventListener('DOMContentLoaded', getToDos);

//Functions
function addToDo(e) {

  e.preventDefault();

  const toDoDiv = document.createElement('div');
  toDoDiv.classList.add('todo');

  const newToDo = document.createElement('li');
  newToDo.innerText = toDoInput.value;

  newToDo.classList.add('todo-item');

  toDoDiv.appendChild(newToDo);

  saveToLocal(toDoInput.value);

  const doneButton = document.createElement('button');
  doneButton.innerHTML = '<i class="fa fa-check-square"></i>';
  doneButton.classList.add('done-btn');
  toDoDiv.appendChild(doneButton);

  const delButton = document.createElement('button');
  delButton.innerHTML = '<i class="fa fa-trash"></i>';
  delButton.classList.add('del-btn');
  toDoDiv.appendChild(delButton);

  //Append to list
  toDoList.appendChild(toDoDiv);

  //Clear to do input field after adding item
  toDoInput.value = '';
}

function deleteCheck(e) {
  const item = e.target;
  //Delete Button
  if (item.classList[0] === 'del-btn') {
    const toDo = item.parentElement;
    toDo.classList.add('slideAway');
    removeLocalToDos(toDo);
    toDo.addEventListener('transitionend', function () {
      toDo.remove();
    });
  }

  //Assign the class "done"
  if (item.classList[0] === 'done-btn') {
    const toDo = item.parentElement;
    toDo.classList.toggle('done');
  }
}

function filterToDo(e) {
  const toDos = toDoList.childNodes;
  toDos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('done')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('done')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
    }
  });
}

function saveToLocal(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getToDos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {

    //Create a div class todo
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('todo');

    //Create a list element
    const newToDo = document.createElement('li');
    newToDo.innerText = todo;

    //Assign the todo-item class to the list
    newToDo.classList.add('todo-item');

    //Appends list class todo-item to div class todo
    toDoDiv.appendChild(newToDo);

    //Completed button
    const doneButton = document.createElement('button');
    doneButton.innerHTML = '<i class="fa fa-check-square"></i>';
    doneButton.classList.add('done-btn');
    toDoDiv.appendChild(doneButton);

    //Delete button
    const delButton = document.createElement('button');
    delButton.innerHTML = '<i class="fa fa-trash"></i>';
    delButton.classList.add('del-btn');
    toDoDiv.appendChild(delButton);

    //Append to list
    toDoList.appendChild(toDoDiv);
  });
}

function removeLocalToDos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
