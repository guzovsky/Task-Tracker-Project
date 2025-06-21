const form = document.getElementById("task-tracker-form");
const input = document.getElementById("input");
const submitBtn = document.getElementById("submit-btn");
const taskList = document.getElementById("task-list");

form.addEventListener('submit', function(e) {
    e.preventDefault();
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        updateTasks();
    }
});

input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});

function updateTasks() {

    input.style.height = "auto";

    /* Add New Task */
    const userTask = input.value.trim();
    const taskId = `task${Date.now()}`;

    const taskHTML = `
        <div class="task-container">
            <div class="task-item">
                <input type="checkbox" class="task-done" id="${taskId}">
                <label for="${taskId}" class="checkmark"></label>
                <span class="edit-task">✎</span>
            </div>
            <span class="task">${userTask}</span>
            <span class="trash-can">🗑</span>
        </div>
`;

    if (userTask !== "") {
        const taskTexts = Array.from(taskList.querySelectorAll(".task")).map(task => task.innerText);
        const taskTextsLowerCase = taskTexts.map(el => el.toLowerCase());
        const userTaskLowerCase = userTask.toLowerCase();

        if (taskTextsLowerCase.includes(userTaskLowerCase)) {
            alert("You already have this task!")
        } else {
            taskList.insertAdjacentHTML("beforeend", taskHTML);
            input.value = "";
        }
    }

    const lastTask = taskList.lastElementChild;

    /* Mark Task as Completed */
    const checkbox = lastTask.querySelector(".task-done");
    checkbox.addEventListener("change", () => {
        lastTask.querySelector(".task").classList.toggle("completed");
    })

    /* Delete Task */
    const trashCan = lastTask.querySelector(".trash-can");
    trashCan.addEventListener("click", () => {
        trashCan.classList.add("animate");
        lastTask.classList.add("fade-out");

        // Wait for the animation to finish before removing
        setTimeout(() => {
            lastTask.remove();
            trashCan.classList.remove("animate");
        }, 400); // match the animation duration in milliseconds
})


    /* Edit Task */
    const editIcon = lastTask.querySelector(".edit-task");
    editIcon.addEventListener("click", () => {
        const taskBeingEdited = lastTask.querySelector(".task");

        // Create an input with the current span text
        const newInput = document.createElement("textarea");
        newInput.maxLength="150";
        newInput.className="temporarily-input"
        newInput.value = taskBeingEdited.textContent;

        // Replace span with input
        taskBeingEdited.replaceWith(newInput);
        newInput.focus();

        // Make the input grow
        newInput.style.height = "auto";
        newInput.style.height = newInput.scrollHeight + "px";
        newInput.addEventListener("input", () => {
            newInput.style.height = "auto";
            newInput.style.height = newInput.scrollHeight + "px";
        });
        
        // When user presses Enter or clicks away
        function finishEdit() {
            const newSpan = document.createElement("span");
            newSpan.className = "task";
            newSpan.textContent = newInput.value;
            newInput.replaceWith(newSpan);
        }

        function submitEditedTask() {
                if (newInput.value.trim() !== "") {
                    const taskTexts2 = Array.from(taskList.querySelectorAll(".task")).map(task => task.innerText);
                    const taskTextsLowerCase2 = taskTexts2.map(el => el.toLowerCase());
                    const newInputValueLowerCase = newInput.value.toLowerCase();
                    if (taskTextsLowerCase2.includes(newInputValueLowerCase.trim())) {
                        newInput.replaceWith(taskBeingEdited);
                        alert("You already have this task!");
                    } else {
                        finishEdit();
                    }
                } else {
                    newInput.replaceWith(taskBeingEdited);
                }
        }

        newInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                submitEditedTask();
            }
        })

        newInput.addEventListener("blur", () => {
            if (newInput.value.trim() !== "") {
                const taskTexts2 = Array.from(taskList.querySelectorAll(".task")).map(task => task.innerText);
                const taskTextsLowerCase2 = taskTexts2.map(el => el.toLowerCase());
                const newInputValueLowerCase = newInput.value.toLowerCase();
                if (taskTextsLowerCase2.includes(newInputValueLowerCase.trim())) {
                    newInput.replaceWith(taskBeingEdited);
                    alert("You already have this task!");
                } else {
                    finishEdit();
                }
            } else {
                newInput.replaceWith(taskBeingEdited);
            }
        })
    })
}

submitBtn.addEventListener("click", updateTasks);