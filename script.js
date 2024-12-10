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
            text: item.firstChild.textContent,
            completed: item.classList.contains('completed'),
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// восстановление задач из localStorage при перезагрузке страницы
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        JSON.parse(savedTasks).forEach(task => { //при помощи parse json снова в массив
            createTask(task.text, task.completed);
        });
    }
}

// создание новой задачи
function createTask(taskText, completed = false) {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // кнопка "Удалить"
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(listItem);
        saveTasks(); 
    });

    // отметить выполненные задачи
    listItem.addEventListener('click', () => {
        listItem.classList.toggle('completed'); //переключение статуса задачи
        saveTasks(); 
    });

    // добавить класс completed, если задача уже выполнена
    if (completed) {
        listItem.classList.add('completed');
    }

    // добавить кнопку удалить
    listItem.appendChild(deleteBtn);

    // добавить новый элемент списка (li) в список задач (ul)
    taskList.appendChild(listItem);

    saveTasks();
}

// функция фильтра
function applyFilter(filter) {
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'uncompleted':
                task.style.display = !task.classList.contains('completed') ? 'flex' : 'none';
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
    taskInput.value = ''; // очистить ввод
});

// задачи загружаются при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    applyFilter('all'); // все задачи после загрузки
});
