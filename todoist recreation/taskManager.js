const addTaskButtons = document.getElementsByClassName('addTaskButton');

let taskButtonsArray = Array.from(addTaskButtons)

taskButtonsArray.forEach(taskButton => {
    taskButton.onclick = function(){
        const cursorStyle = window.getComputedStyle(taskButton).cursor;
        
        if (cursorStyle != "not-allowed"){
            const taskNameField = taskButton.closest(".addTask").querySelector(".taskNameInput textarea");
            const taskName = taskNameField.value;

            const taskDescriptionField = taskButton.closest(".addTask").querySelector(".taskDescriptionInput textarea");
            const taskDescription = taskDescriptionField.value;
            
            console.log(taskName);
            console.log(taskDescription);

            const htmlTask = `
                <div class="outerTask">
                    <span class="material-symbols-outlined">drag_indicator</span>
                    <div class="innerTask">
                        <div class="taskInfo">
                            <div class="left">
                                <input type="radio">
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

            var section = taskButton.closest(".section");
            console.log(section); 

            var addTaskWindow = taskButton.closest(".addTask");
            console.log(taskButton)
            addTaskWindow.remove();

            if (section != null){
                section.insertAdjacentHTML('beforeend', htmlTask);
            } else {
                section = taskButton.closest(".mainSection");
                section.insertAdjacentHTML('beforeend', htmlTask);
            }
            
            section.querySelectorAll()
        }
        //create add task section()
    }
})

