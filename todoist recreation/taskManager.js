
//add task button

const addTaskButtons = document.getElementsByClassName('addTaskButton');

let taskButtonsArray = Array.from(addTaskButtons)

taskButtonsArray.forEach(taskButton => {
    taskButton.onclick = function(){
        const cursorStyle = window.getComputedStyle(taskButton).cursor;
        
        if (cursorStyle != "not-allowed"){
            const taskNameField = taskButton.closest(".addTask").querySelector(".taskNameInput textarea");
            const taskName = taskNameField.value;
            taskNameField.value = "";

            const taskDescriptionField = taskButton.closest(".addTask").querySelector(".taskDescriptionInput textarea");
            const taskDescription = taskDescriptionField.value;
            
            console.log(taskName);
            console.log(taskDescription);

            var section = taskButton.closest(".section"); 

            if (section == null){
                section = taskButton.closest(".mainSection");
            }
            var tasks = section.querySelector(".tasks");
            console.log(tasks)

            //save task
            const postTasksRequest = new XMLHttpRequest();
            const url = "http://localhost:8080/task"
            postTasksRequest.open("POST", url);
            postTasksRequest.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
            
            const body = JSON.stringify({
                taskName: taskName
            })
            postTasksRequest.onload = () => {
                if (postTasksRequest.readyState == 4 && postTasksRequest.status == 200) {
                  const response = JSON.parse(postTasksRequest.responseText);
                  const id = response.id
                  console.log(id)

                  const htmlTask = `
                        <div id=`+id+` class="outerTask">
                            <span class="material-symbols-outlined">drag_indicator</span>
                            <div class="innerTask">
                                <div class="taskInfo">
                                    <div class="left">
                                        <input onclick="checkTask(this)" type="radio">
                                        <p>`+taskName+`</p>
                                    </div>
                                    <div class="right">
                                        <span class="material-symbols-outlined">border_color</span>
                                    <span class="material-symbols-outlined">event</span>
                                    <span class="material-symbols-outlined">chat_bubble</span>
                                    </div>
                                    
                                </div>
                                <hr>
                            </div>
                            <div class="right">
                                <span class="material-symbols-outlined">more_horiz</span>
                            </div>
                        </div>
                    `;

                  tasks.insertAdjacentHTML('beforeend', htmlTask);
                } else {
                  console.log(`Error: ${postTasksRequest.status}`);
                }
              };
            postTasksRequest.send(body);
        }
    }
})

//add task window button

const selectAddTasks = document.getElementsByClassName("selectAddTask");
let selectAddTaskArray = Array.from(selectAddTasks);
console.log(selectAddTasks);

selectAddTaskArray.forEach(selectAddTask =>{
    selectAddTask.addEventListener('click', () => {
        var section = selectAddTask.closest(".section")

        if (section == null){
            section = selectAddTask.closest(".mainSection")
        }
        var addTask = section.querySelector(".addTask");
        addTask.style.display = "block"
        selectAddTask.style.display = "none";
    });
})

//cancel task button
const cancleButtons = document.getElementsByClassName("cancelButton");
let cancelButtonArray = Array.from(cancleButtons);
console.log(cancelButtonArray);

cancelButtonArray.forEach(cancelButton =>{
    cancelButton.addEventListener('click', () => {
        var section = cancelButton.closest(".section")

        if (section == null){
            section = cancelButton.closest(".mainSection")
        }
        var addTask = section.querySelector(".addTask");
        addTask.style.display = "none"
        
        var selectAddTask = section.querySelector(".selectAddTask")
        selectAddTask.style.display = "flex";
    });
})

//cancel task by escape key

document.addEventListener('keydown', (event) => {
    if (event.key == 'Escape'){
        var sections = document.querySelectorAll(".section")
        var mainSection = document.querySelector(".mainSection")

        console.log(sections)
        sections.forEach(section => {
            console.log(section)

            var addTask = section.querySelector(".addTask");
            addTask.style.display = "none"

            var selectAddTask = section.querySelector(".selectAddTask")
            selectAddTask.style.display = "flex";
        })
        var addTask = mainSection.querySelector(".addTask");
        addTask.style.display = "none"

        var selectAddTask = mainSection.querySelector(".selectAddTask")
        selectAddTask.style.display = "flex";        
    }
})

//add task by enter button
//won't be don yet 

//check task

var checkButtons = document.querySelectorAll(".tasks .innerTask input[type=\"radio\"]")

checkButtons.forEach(checkButton => {
        checkButton.onclick = function() {checkTask(checkButton)};
})
function checkTask(checkButton){
    var outerTask = checkButton.closest(".outerTask")
    outerTask.remove(); 

    var id = outerTask.id;

    const getTasksRequest = new XMLHttpRequest();
    const url = "http://localhost:8080/task/" + id;
    getTasksRequest.open("PUT", url);
    getTasksRequest.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    getTasksRequest.send();
}

//getting tasks
const getTasksRequest = new XMLHttpRequest();
const url = "http://localhost:8080/task"
getTasksRequest.open("GET", url);
getTasksRequest.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
getTasksRequest.send();

getTasksRequest.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        const response = getTasksRequest.responseText;
        const responseObject = JSON.parse(response);
        console.log(responseObject);
        
        var mainSection = document.querySelector(".mainSection .tasks");
        responseObject.forEach(task =>{
            var taskName = task.taskName
            var id = task.id;
            const htmlTask = `
                    <div id=`+id+` class="outerTask">
                        <span class="material-symbols-outlined">drag_indicator</span>
                        <div class="innerTask">
                            <div class="taskInfo">
                                <div class="left">
                                    <input onclick="checkTask(this)" type="radio">
                                    <p>`+taskName+`</p>
                                </div>
                                <div class="right">
                                    <span class="material-symbols-outlined">border_color</span>
                                <span class="material-symbols-outlined">event</span>
                                <span class="material-symbols-outlined">chat_bubble</span>
                                </div>
                                
                            </div>
                            <hr>
                        </div>
                        <div class="right">
                            <span class="material-symbols-outlined">more_horiz</span>
                        </div>
                    </div>
                `;
            console.log(taskName)
            mainSection.insertAdjacentHTML('beforeend', htmlTask);
        })
    }
}