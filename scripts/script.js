'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const completeBtn = li.querySelector('.todo-complete');
        completeBtn.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

        const deleteBtn = li.querySelector('.todo-remove');
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });

    });
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    if (headerInput.value !== '') {
        todoData.push(newTodo);
        headerInput.value = '';
        render();
    }

    localStorage.mySave = JSON.stringify(todoData);

});

render();
const dataPage = function() {
    let sa = localStorage.mySave;
    return sa;
};
dataPage();