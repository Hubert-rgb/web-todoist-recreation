var addTaskButtons = document.getElementsByClassName('addTaskButton');
console.log(addTaskButtons);

let array = Array.from(addTaskButtons)
console.log(array)

array.forEach(element => {
    console.log(element)
    element.onclick = function(){console.log(2)}
})