const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterAll = document.getElementById('filterAll');
const filterCompleted = document.getElementById('filterCompleted');
const filterUncompleted = document.getElementById('filterUncompleted');
const filterButtons = document.querySelectorAll('.filter-btn');

// сохранение списка задач в localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(item => {
        tasks.push({
            text: item.querySelector('label').textContent,
            completed: item.querySelector('input[type=\"checkbox\"]').checked,
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// восстановление задач из localStorage при перезагрузке страницы
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        JSON.parse(savedTasks).forEach(task => {
            createTask(task.text, task.completed);
        });
    }
}

// создание новой задачи
function createTask(taskText, completed = false) {
    const listItem = document.createElement('li');

    // чекбокс
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
        saveTasks();
    });

    // текст задачи
    const label = document.createElement('label');
    label.textContent = taskText;

    // кнопка "Удалить"
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(listItem);
        saveTasks();
    });

    // сборка элемента
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteBtn);

    taskList.appendChild(listItem);
    saveTasks();
}

// функция фильтра
function applyFilter(filter) {
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type=\"checkbox\"]');
        switch (filter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                task.style.display = checkbox.checked ? 'flex' : 'none';
                break;
            case 'uncompleted':
                task.style.display = !checkbox.checked ? 'flex' : 'none';
                break;
        }
    });
}

// обнова фильтра визуально
function updateActiveFilter(button) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// оброботчик кнопоки все, вып, не вып
filterAll.addEventListener('click', () => {
    applyFilter('all');
    updateActiveFilter(filterAll);
});

filterCompleted.addEventListener('click', () => {
    applyFilter('completed');
    updateActiveFilter(filterCompleted);
});

filterUncompleted.addEventListener('click', () => {
    applyFilter('uncompleted');
    updateActiveFilter(filterUncompleted);
});

// добавить задачу
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    createTask(taskText);
    taskInput.value = '';
});

// задачи загружаются при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    applyFilter('all');
});
