
// DATA & TIME
function getCurentDate() {
  let date = new Date();
  let year= date.getFullYear();
  let days = date.getDate();
  // if (month==1) {
  //     month="Януари"
  // } else if (month==2) {
  //     month="Февруари"
  // } else if (month==3) {
  //     month="Март"
  // } else if (month==4) {
  //     month="Април"
  // } else if (month==5) {
  //     month="Май"
  // } else if (month==6) {
  //     month="Юни"
  // } else if (month==7) {
  //     month="Юли"
  // } else if (month==8) {
  //     month="Август"
  // } else if (month==9) {
  //     month="Септември"
  // } else if (month==10) {
  //     month="Октомври"
  // } else if (month==11) {
  //     month="Ноември"
  // } else if (month==12) {
  //     month="Декември"
  // } 
  let months = new Array(12);
  months[0] = "Яну";
  months[1] = "Фев";
  months[2] = "Март";
  months[3] = "Апр";
  months[4] = "Май";
  months[5] = "Юни";
  months[6] = "Юли";
  months[7] = "Авг";
  months[8] = "Сеп";
  months[9] = "Окт";
  months[10] = "Ное";
  months[11] = "Дек";
  let month = months[date.getMonth()];
  
  let weekdays = new Array(7);
  weekdays[0] = "Нд";
  weekdays[1] = "Пн";
  weekdays[2] = "Вт";
  weekdays[3] = "Ср";
  weekdays[4] = "Чт";
  weekdays[5] = "Пт";
  weekdays[6] = "Сб";
  let weekday = weekdays[date.getDay()];
  
  return (`${weekday} ${days} ${month} ${year}`)
}
function getCurrentTime() {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let x=0;
  if (hours<10) {
    hours = `${x}${hours}`
  }
  if (minutes<10) {
    minutes = `${x}${minutes}`
  }
  if (seconds<10) {
    seconds = `${x}${seconds}`
  }
  let time = document.querySelector('.time');
  time.innerHTML = `${hours}:${minutes}:${seconds}`;
  return `${hours}:${minutes}:${seconds}`
};
let time = setInterval(getCurrentTime, 1000);

let date = document.querySelector('.date');
date.innerHTML = getCurentDate();

//  TRAVERSE DOM & COUNT FINISHED TASKS
let finished;

function countFinishedTasks() {
  finished = 0;
  let startNode = document.querySelector("#tasksContainer");
  
  function doSomething(node) {
    if (node.classList.contains("green")) {
      finished++;
    }
  };
  function traverseDOM(node) {
    let children = node.children;
    for (let i = 0; i < children.length; i++) {
      let el = children[i];
      doSomething(el);
      traverseDOM(el);
    }
  } 
  traverseDOM(startNode);
}

// NEW TASKS

let btnOK = document.querySelector("#btnOK");
let inputText = document.querySelector(".inputText");
let count = 0;

function createTasks() {
  count++;
  
  let checkBox = document.createElement("I");
  checkBox.className = "fa fa-check-circle";
  let trash = document.createElement("I");
  trash.className = "fa fa-trash-alt";
  let newTaskText = inputText.value;
  let textnode = document.createTextNode(newTaskText);  
  let li = document.createElement("LI");
  li.id = `id${count}`;
  li.appendChild(checkBox);   
  li.appendChild(textnode);
  li.appendChild(trash);   
  document.querySelector("#tasksContainer").appendChild(li)
  inputText.value="";
  
  let btnTrash = document.querySelector(`#id${count}>.fa-trash-alt`);
  let btnCheckBox = document.querySelector(`#id${count}>.fa-check-circle`);
  let totalTasks = document.querySelector(".total");
  totalTasks.innerHTML = `ОБЩО: ${count} задачи`;
  
  // DISPLAY FINISHED

  function displayFinished() {
    let activeTasks = document.querySelector(".active");
    activeTasks.innerHTML = `ЗАВЪРШЕНИ: ${finished} задачи`;
  }
  // DELETE TASKS

  function removeTasks(){
    let deleteObj = document.getElementById(`${li.id}`);
    deleteObj.remove(); 
    count--;
    totalTasks.innerHTML = `ОБЩО: ${count} задачи`;
    countFinishedTasks();
    displayFinished();
  }
  
  // MARK FINISHED TASKS
  
  function makeItGreen(){
    // let makeGreen = document.querySelector(`#${li.id}>.fa-check-circle`);
    let liStroke = document.querySelector(`#${li.id}`);
    if (liStroke.className === "") {
      liStroke.className = "green";
      countFinishedTasks();
      displayFinished();
    } else if (liStroke.className === "green") {
      liStroke.className = "";
      countFinishedTasks()
      displayFinished(); 
    }
  }
  btnTrash.addEventListener('click', removeTasks)
  btnCheckBox.addEventListener(`click`, makeItGreen)
};

btnOK.addEventListener('click', createTasks);

inputText.addEventListener("keypress", function(e) {
  if (e.key === 'Enter') {
    createTasks()
    inputText.value = "";
  }
});

