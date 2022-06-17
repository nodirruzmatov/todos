const elTodoForm = document.querySelector(".todo__form");
const elTodoInput = document.querySelector(".todo__input");
const elTodoList = document.querySelector(".todo__list");
const elTodoAll = document.querySelector(".todo__all-btn");
const elTodoDone = document.querySelector(".todo__done-btn");
const elTodoUndone = document.querySelector(".todo__undo-btn");
const elTodoButtons = document.querySelector(".todo__buttons");

// !count elements
const elCountAll = document.querySelector(".count-all");
const elCountDone = document.querySelector(".count-done");
const elCountundo = document.querySelector(".count-undo");

const todos = [];

// todo: listen to count elements
elTodoButtons.addEventListener("click", (ent) => {
  if (ent.target.matches(".todo__all-btn")) {
    elTodoAll.addEventListener("click", () => {
      elTodoList.innerHTML = null;
      renderTodos(todos, elTodoList);
    });
  } else if (ent.target.matches(".todo__done-btn")) {
    elTodoDone.addEventListener("click", (ent) => {
      elTodoList.innerHTML = null;

      const todosDone = todos.filter((todo) => todo.isDo === true);

      renderTodos(todosDone, elTodoList);
    });
  } else if (ent.target.matches(".todo__undo-btn")) {
    elTodoUndone.addEventListener("click", (ent) => {
      elTodoList.innerHTML = null;

      const todosUndo = todos.filter((todo) => todo.isDo === false);

      renderTodos(todosUndo, elTodoList);
    });
  }
});

// todo: listen list delete and checkbox
elTodoList.addEventListener("click", (ent) => {
  const deleteId = ent.target.dataset.deleteBtnId * 1;
  const checkboxId = ent.target.dataset.deleteBtnId * 1;
  const foundTodoId = todos.findIndex((todo) => todo.id === deleteId);

  if (ent.target.matches(".deletebtn")) {
    todos.splice(foundTodoId, 1);
  } else if (ent.target.matches(".checkbtn")) {
    const foundCkeckId = todos.find((todo) => todo.id === checkboxId);

    foundCkeckId.isDo = !foundCkeckId.isDo;

    elTodoList.innerHTML = null;

    renderTodos(todos, elTodoList);
  }

  elTodoList.innerHTML = null;

  renderTodos(todos, elTodoList);
});

// todo:create element
const renderTodos = (arr, htmlElement) => {
  arr.forEach((todo) => {
    const newItem = document.createElement("li");
    const newCheckbox = document.createElement("input");
    const newDeleteBtn = document.createElement("button");

    newDeleteBtn.classList.add("deletebtn");
    newCheckbox.classList.add("checkbtn");
    newCheckbox.type = "checkbox";

    newItem.textContent = todo.name;
    newDeleteBtn.textContent = "delete";
    elCountAll.textContent = todos.length;
    elCountDone.textContent = todos.filter((todo) => todo.isDo).length;
    elCountundo.textContent = todos.filter((todo) => !todo.isDo).length;

    newDeleteBtn.dataset.deleteBtnId = todo.id;
    newCheckbox.dataset.deleteBtnId = todo.id;

    if (todo.isDo) {
      newCheckbox.checked = true;

      newItem.style.textDecoration = "line-through";
    }

    elTodoList.appendChild(newItem);
    newItem.appendChild(newCheckbox);
    newItem.appendChild(newDeleteBtn);
  });
};

// todo: listen form
elTodoForm.addEventListener("submit", (ent) => {
  ent.preventDefault();

  const inputValue = elTodoInput.value;

  const todo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    name: inputValue,
    isDo: false,
  };

  elTodoInput.value = "";

  todos.push(todo);

  elTodoList.innerHTML = null;

  renderTodos(todos, elTodoList);
});
