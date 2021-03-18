let dom = {
  btnOK: document.querySelector("#btnOK"),
  inputText: document.querySelector(".inputText"),
  date: document.querySelector('.date'),
  time: document.querySelector('.time'),
  activeTasks: document.querySelector(".active"),
  totalTasks: document.querySelector(".total"),
  tasksContainer: document.querySelector("#tasksContainer"),
};
let globalVars = {
  count: 0,
  finished: undefined,
};
let dateAndTime = {
  getCurentDate() {
    let date = new Date();
    let year= date.getFullYear();
    let days = date.getDate();
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
  },
  getCurrentTime() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    if (hours<10) {
      hours = `0${hours}`
    }
    if (minutes<10) {
      minutes = `0${minutes}`
    }
    if (seconds<10) {
      seconds = `0${seconds}`
    }
    dom.time.innerHTML = `${hours}:${minutes}:${seconds}`;
    // return `${hours}:${minutes}:${seconds}`
  }
};
let display = {
  totalTasks() {
    dom.totalTasks.innerHTML = `ОБЩО: ${globalVars.count} задачи`;
  },
  finishedTasks() {
    dom.activeTasks.innerHTML = `ЗАВЪРШЕНИ: ${globalVars.finished} задачи`;
  },
  countFinishedTasks() {
    globalVars.finished = 0;
    
    function findFinished(node) {
      if (node.classList.contains("green")) {
        globalVars.finished++;
      }
    };
    function traverseDOM(node) {
      let children = node.children;
      for (let i = 0; i < children.length; i++) {
        let el = children[i];
        findFinished(el);
        traverseDOM(el);
      }
    } 
    traverseDOM(dom.tasksContainer);
  }
};
function TasksFactory (identificator) {
  let checkBox = document.createElement("I");
  checkBox.className = "fa fa-check-circle";
  let trash = document.createElement("I");
  trash.className = "fa fa-trash-alt";
  // let newTaskText = dom.inputText.value;
  let textNode = document.createTextNode(dom.inputText.value);  
  let li = document.createElement("LI");
  li.id = identificator;
  li.appendChild(checkBox);   
  li.appendChild(textNode);
  li.appendChild(trash);   
  dom.tasksContainer.appendChild(li)
};
let tasks = {
  generateRandomNumber() {
    return ( Math.round(Math.random() * ( 999 - 100 ) + 100 ) )
  },
  create() {
    if (dom.inputText.value === "") {
      alert("Не може да създавате празни задачи.");
      dom.inputText.focus();
    } else if (globalVars.count > 14) {
      alert("Най-много по 15 задачи на ден.");
    } else { 
      globalVars.count++;
      let randomNumber = tasks.generateRandomNumber();
      let identificator = 'id'+randomNumber;
      new TasksFactory(identificator);
      dom.inputText.value="";
      display.totalTasks();
    }
  },
  markFinished(id){
    let select = document.querySelector(`#${id}`);
    if (select.className === ""){
      select.classList.add('green');
    } else if (select.className === 'green'){
      select.classList.remove("green");
    }
    display.countFinishedTasks();
    display.finishedTasks();
  },
  delete(id){
    document.getElementById(`${id}`).remove(); 
    globalVars.count--;
    display.countFinishedTasks();
    display.finishedTasks();
    display.totalTasks();
  }
};
setInterval(dateAndTime.getCurrentTime, 1000);
dom.date.innerHTML = dateAndTime.getCurentDate();

dom.inputText.focus();
dom.btnOK.addEventListener('click', tasks.create);
dom.inputText.addEventListener("keypress", function(e) {
  if (e.key === 'Enter') {
    tasks.create()
    dom.inputText.value = "";
  }
});
document.addEventListener("click", function(e) {
  let id;
  if (e.target.tagName === "LI") {
    id = e.target.id;
    tasks.markFinished(id);
  } else if (e.target.className === "fa fa-check-circle" ){ 
    id = e.target.parentElement.id;
    tasks.markFinished(id);
  } else if (e.target.className === "fa fa-trash-alt") {
    id = e.target.parentElement.id;
    tasks.delete(id);
  }
});
