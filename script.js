const input = document.getElementById('input');
const ul = document.createElement('ul');
document.querySelector('.me').appendChild(ul);

    // Load tasks on page load
    load();

    function myTasks() {
      let inputValue = input.value.trim();

      if (inputValue === '') {
        alert('Please enter a task');
        return;
      }

      addTaskToDOM(inputValue);
      save(inputValue); 
      input.value = '';
    }

    function addTaskToDOM(taskText) {
      const li = document.createElement('li');
      li.textContent = taskText;

      li.addEventListener('click', function () {
        li.classList.toggle('completed');
      });

      const delBtn = document.createElement('span');
      delBtn.textContent = " ❌";
      delBtn.style.cursor = "pointer";
      delBtn.onclick = function () {
        li.remove();
        removeFromStorage(taskText);
      };

      li.appendChild(delBtn);
      ul.appendChild(li);
    }
    

    function save(taskText) {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function load() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(taskText => {
        addTaskToDOM(taskText);
      });
    }

    function clearAll1() {
      ul.textContent = '';
      localStorage.removeItem('tasks');
    }

    function removeFromStorage(taskText) {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTasks = tasks.filter(task => task !== taskText);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }