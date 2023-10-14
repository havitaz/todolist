let todoList = [];

function drawTodoList(list) {
    const toDoListView = document.querySelector('#todo-list-view');
    toDoListView.innerHTML = '';

    list.forEach((item, index) => {
        const todoNode = document.createElement('div');
        todoNode.innerText = item.title;

        if (item.isDone) {
            todoNode.classList.add('done');
        }

        todoNode.onclick = function() {
            isDone(todoNode, index);
        };

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = "<i class='fa-solid fa-xmark'></i>";
        removeBtn.onclick = function() {
            todoList.splice(index, 1);
            localStorage.setItem('todoList', JSON.stringify(todoList));
            drawTodoList(todoList);
            isDone(todoNode, index); // removeBtn 클릭 시 isDone 함수 호출
        };
        todoNode.appendChild(removeBtn);

        toDoListView.appendChild(todoNode);
    });
}


function addTodo(ev) {
    if ((!ev || ev.keyCode === 13) && document.getElementById('inputa').value.trim() !== '') {
        const todoTitle = document.getElementById('inputa').value;
        todoList.push({ title: todoTitle, isDone: false });
        localStorage.setItem('todoList', JSON.stringify(todoList));
        drawTodoList(todoList);
        document.getElementById('inputa').value = '';
    }
}

function isDone(todo, index) {
    todoList[index].isDone = !todoList[index].isDone;
    if (todoList[index].isDone) {
        todo.classList.add('done');
    } else {
        todo.classList.remove('done');
    }
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

window.onload = function() {
    todoList = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [];
    drawTodoList(todoList);

    todoList.forEach((item, index) => {
        const todoNode = document.getElementById('todo-list-view').children[index];
        if (item.isDone) {
            todoNode.classList.add('done');
        }
    });

    document.getElementById('inputa').addEventListener('keydown', function(ev) {
        addTodo(ev);
    });
};

window.onbeforeunload = function() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
};
