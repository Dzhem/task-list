// globsl
let todos = [];
let users = [];
const todoList = document.querySelector("#todo-list");
const userSelect = document.getElementById("user-todo");
const form = document.querySelector("form");

// attach events
document.addEventListener("DOMContentLoaded", initApp);
form.addEventListener("submit", handleSubmit);

// basic logic
function getUserName(userId) {
  const user = users.find((user) => user.id === userId);
  return user.name;
}

function printTodo({ id, userId, title, completed }) {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  li.dataset.id = id;
  li.innerHTML = `<span class="todo-text">${title} <i>by</i> <b>${getUserName(
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

function createUserOption(user) {
  const option = document.createElement("option");
  option.value = user.id;
  option.innerText = user.name;

  userSelect.append(option);
}

// event logic
function initApp() {
  Promise.all([getAllTodos(), getAllUsers()]).then((values) => {
    [todos, users] = values;

    todos.forEach((todo) => printTodo(todo));
    users.forEach((user) => createUserOption(user));
  });
}

function handleSubmit(event) {
  event.preventDefault();

  if (form.todo.value !== "" && form.user.value !== "select user") {
    createTodo({
      userId: Number(form.user.value),
      title: form.todo.value,
      completed: false,
    });
  }
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

async function createTodo(todo) {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resTodo = await response.json();
  console.log(resTodo);

  printTodo(resTodo);
}
