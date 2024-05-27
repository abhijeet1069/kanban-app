let cardId = 0;

        function addTaskToTodo() {
            const input = document.getElementById('taskInputNavbar');
            const taskText = input.value.trim();
            if (taskText) {
                addTask('todoColumn', taskText);
                input.value = '';
            }
        }

        function addTask(columnId, taskText) {
            const column = document.getElementById(columnId);
            const card = document.createElement('div');
            card.className = 'kanban-card';
            card.textContent = taskText;
            card.draggable = true;
            card.id = 'card-' + cardId++;
            card.ondragstart = dragStart;
            column.querySelector('.kanban-cards').appendChild(card);
        }

        function dragStart(event) {
            event.dataTransfer.setData('text', event.target.id);
            event.dataTransfer.effectAllowed = 'move';
        }

        function allowDrop(event) {
            event.preventDefault();
        }

        function drop(event) {
            event.preventDefault();
            const data = event.dataTransfer.getData('text');
            const card = document.getElementById(data);
            event.target.appendChild(card);
        }

        document.querySelectorAll('.kanban-column .kanban-cards').forEach(column => {
            column.ondrop = drop;
            column.ondragover = allowDrop;
        });

        function addPane() {
            const newPaneId = 'column-' + document.querySelectorAll('.kanban-column').length;
            const newPane = document.createElement('div');
            newPane.className = 'kanban-column';
            newPane.id = newPaneId;
            newPane.innerHTML = `
                <h2>New Pane</h2>
                <div class="kanban-cards"></div>
            `;
            newPane.querySelector('.kanban-cards').ondrop = drop;
            newPane.querySelector('.kanban-cards').ondragover = allowDrop;
            document.getElementById('kanbanBoard').appendChild(newPane);
        }