const input = document.getElementById("taskinput");
const addBtn = document.getElementById("taskbtn");
const list = document.getElementById("tasklist");
const counter = document.getElementById("taskCounter");

const clearAllBtn = document.getElementById("clearAll");
const clearCompletedBtn = document.getElementById("clearCompleted");

function updateCounter() {
    const total = document.querySelectorAll("#tasklist li").length;
    const completed = document.querySelectorAll("#tasklist .completed").length;
    counter.textContent = `${completed} de ${total} tarefas concluídas`;
}

function createTask(text) {
    if (text === "") return;

    const li = document.createElement("li");
    li.textContent = text;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateCounter();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";

    editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const newText = prompt("Editar tarefa:", li.firstChild.textContent);
        if (newText) {
            li.firstChild.textContent = newText;
        }
    });

    li.appendChild(editBtn);

    list.appendChild(li);

    input.value = "";

    updateCounter();
}

addBtn.addEventListener("click", () => {
    createTask(input.value.trim());
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        createTask(input.value.trim());
    }
});

clearAllBtn.addEventListener("click", () => {
    list.innerHTML = "";
    updateCounter();
});

clearCompletedBtn.addEventListener("click", () => {
    const completedTasks = document.querySelectorAll(".completed");
    completedTasks.forEach(task => task.remove());
    updateCounter();
});