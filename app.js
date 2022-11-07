// globsl
let todos = [];
let users = [];
const todoList = document.querySelector("#todo-list");

// attach events
document.addEventListener("DOMContentLoaded", initApp);

// basic logic
function getUserName(userId) {
  const user = users.find((user) => user.id === userId);
  return user.name;
}

function printTodo({ id, userId, title, completed }) {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  li.dataset.id = id;
  li.innerHTML = `<span>${title} <i>by</i> <b>${getUserName(
    userId
  )}</b></span>`;

  const status = document.createElement("input");
  status.type = "checkbox";
  status.checked = completed;

  const close = document.createElement("span");
  close.innerHTML = "&times;";
  close.className = "close";

  li.prepend(status);
  li.append(close);

  todoList.prepend(li);
}

// event logic
function initApp() {
  Promise.all([getAllTodos(), getAllUsers()]).then((values) => {
    [todos, users] = values;

    todos.forEach((todo) => printTodo(todo));
  });
}

// async logic
async function getAllTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await response.json();

  return todos;
}

async function getAllUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return users;
}
