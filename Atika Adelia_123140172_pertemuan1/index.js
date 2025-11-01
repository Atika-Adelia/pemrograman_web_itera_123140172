document.addEventListener('DOMContentLoaded', () => {

    const taskForm = document.getElementById('task-form');
    const taskNameInput = document.getElementById('task-name');
    const courseNameInput = document.getElementById('course-name');
    const deadlineInput = document.getElementById('deadline');
    const taskList = document.getElementById('task-list');
    const errorMessage = document.getElementById('error-message');
    const incompleteCountSpan = document.getElementById('incomplete-count');
    const filterStatusSelect = document.getElementById('filter-status');
    const searchTaskInput = document.getElementById('search-task');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';

        const filterStatus = filterStatusSelect.value;
        const searchQuery = searchTaskInput.value.toLowerCase();

        const filteredTasks = tasks.filter(task => {
            const statusMatch = (filterStatus === 'all') ||
                                (filterStatus === 'completed' && task.isCompleted) ||
                                (filterStatus === 'incomplete' && !task.isCompleted);

            const searchMatch = task.name.toLowerCase().includes(searchQuery) ||
                                task.course.toLowerCase().includes(searchQuery);

            return statusMatch && searchMatch;
        });

        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<p class="no-task">Tidak ada tugas yang sesuai dengan filter.</p>';
        } else {
            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.isCompleted ? 'completed' : ''}`;
                li.dataset.id = task.id; 

                const formattedDeadline = new Date(task.deadline).toLocaleDateString('id-ID', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                });

                li.innerHTML = `
                    <div class="task-details">
                        <h3>${task.name}</h3>
                        <p><strong>Mata Kuliah:</strong> ${task.course}</p>
                        <p><strong>Deadline:</strong> ${formattedDeadline}</p>
                    </div>
                    <div class="task-actions">
                        <button class="btn-complete">${task.isCompleted ? 'Batal' : 'Selesai'}</button>
                        <button class="btn-delete">Hapus</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }
        
        updateIncompleteCount();
    };

    const updateIncompleteCount = () => {
        const incompleteTasks = tasks.filter(task => !task.isCompleted).length;
        incompleteCountSpan.textContent = incompleteTasks;
    };

    const addTask = (name, course, deadline) => {
        const newTask = {
            id: Date.now(), 
            name,
            course,
            deadline,
            isCompleted: false,
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
    };
    
    const toggleTaskComplete = (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isCompleted = !task.isCompleted;
            saveTasks();
            renderTasks();
        }
    };

    const deleteTask = (taskId) => {
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasks();
        renderTasks();
    };
    
    const validateForm = () => {
        const taskName = taskNameInput.value.trim();
        const courseName = courseNameInput.value.trim();
        const deadline = deadlineInput.value;
        const today = new Date().toISOString().split('T')[0]; 

        if (taskName === '' || courseName === '' || deadline === '') {
            errorMessage.textContent = 'Semua field wajib diisi!';
            return false;
        }
        
        if (deadline < today) {
            errorMessage.textContent = 'Tanggal deadline tidak boleh di hari sebelumnya';
            return false;
        }

        errorMessage.textContent = ''; 
        return true;
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        if (validateForm()) {
            addTask(taskNameInput.value.trim(), courseNameInput.value.trim(), deadlineInput.value);
            taskForm.reset(); 
        }
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const taskItem = target.closest('.task-item'); 
        if (!taskItem) return;

        const taskId = Number(taskItem.dataset.id);

        if (target.classList.contains('btn-complete')) {
            toggleTaskComplete(taskId);
        } else if (target.classList.contains('btn-delete')) {
            if (confirm('Apakah kamu yakin ingin menghapus tugas ini?')) {
                deleteTask(taskId);
            }
        }
    });

    filterStatusSelect.addEventListener('change', renderTasks);
    searchTaskInput.addEventListener('input', renderTasks);
    renderTasks();
});