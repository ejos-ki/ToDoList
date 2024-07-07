/*
        File Type :    Vanilla JavaScript (JS)
        Used in   :    index.html
        Code by   :    Jeo D. Latorre


        Function Count: 14

        { NOTE: To Jump to specific Section for Windows ctrl + F then find the one specified in square brackets }
        Sections:
            1.  File and Link Imports Section                    [ ImpSec ]   
            2.  Variable Initialization and Declarations Section [ VarSec ]
            3.  Event listeners Section                          [ EventSec ]
            4.  Function Call Section                            [ FuncCallSec ]
            5.  User interaction Section                         [ InterActSec ]
            6.  Data Storing Section                             [ StoringtSec ]
            7.  Data and Style rendering Section                 [ RendertSec ]
            8.  Chart creation section                           [ ChartSec ]
            9.  Progress Update Section                          [ ProgSec ]
           10.  Other function Section                           [ Others ]

*/


//   File and Link Imports Section [ ImpSec ]
import dayjs from  'https://unpkg.com/dayjs@1.11.10/esm/index.js'       // Utilized to get current date and Formats
import 'https://cdn.jsdelivr.net/npm/chart.js'                          // Utilized to create Chart
import { domVar, storageVar } from './Variables.js';                    // Call for variables 

//   History Checker 
if (!storageVar.isVisit) {
    alert("This project utilizes your browser's local storage. Data saved here cannot be accessed in other browsers");

    storageVar.history.isVisit = true;
    localStorage.setItem('changeHistory', JSON.stringify(storageVar.history));
}


//   Variable Initialization and Declarations Section [ VarSec ]
//   [ VarSec ] ---------------- Flag Variables
let currentClickedToday = null,
    currentClickedGen   = null,
    counterToday        = 0, 
    counterGen          = 0;

//   [ VarSec ] ---------------- Format Variables
const today             = dayjs(),
      dayAndWeek        = today.format('dddd - MMMM D, YYYY'),
      todayDate         = today.format('YYYY-MM-DD'),
      currentDateFormat = today.format('MMMM DD, YYYY');

//   [ VarSec ] ---------------- DOM Variables value
domVar.currentDateAndDay.textContent = dayAndWeek;
domVar.createDateGeneral.value       = todayDate;
domVar.createDateGeneral.min         = todayDate;

//   Event listeners Section [ EventSec ]
//   [ EventSec ] ---------------- Form Related Event Listeners SUBMIT
formGeneral         .addEventListener('submit', storeData); 

//   [ EventSec ] ---------------- Form Related Event Listeners CLICK
domVar.createGenList.addEventListener('click', () => createFormStatus(true));            
domVar.blur         .addEventListener('click', () => createFormStatus(false));
domVar.closeCreateGeneral.addEventListener('click', () => {
    createFormStatus(false);
    domVar.createInputGeneral.value = "";
});

domVar.createInputGeneral.addEventListener('keydown', (event) => {                          //   [ EventSec ] ---------------- Form Related Event Listeners KEYDOWN
    if(event.key === ",") {
        event.preventDefault(); 
        alert(`Please avoid commas ","`)
    }

    domVar.guide2.style.visibility = "visible";
    domVar.guide2.style.position = "static";
});

for (let i = 1; i < 8; i++) {                                                               //   [ EventSec ] ---------------- ToDo List area - Week event listener click
    let container = domVar[`dayContainer${i}`];
    
    container.addEventListener('click', event => {
        const task = event.target.closest('.dateList');
        doActionGen(task);
    });
}

//   Function Call Section [ FuncCallSec ]
showData(storageVar.dayOfWeek, storageVar.date, storageVar.todoDescription);            
showTodayList(storageVar.date, storageVar.todoDescription);
reloadStyle();

if(domVar.todayContainer.childElementCount  != 0) {                                         //   [ EventSec ] ---------------- ToDo List area - Today event listener click
    const taskToday      = document.getElementById("taskToday"),
          dataInfoToday  = taskToday.getElementsByTagName("li");

    for(let task of dataInfoToday) 
        task.addEventListener('click', () => {
            const index = Array.prototype.indexOf.call(dataInfoToday, task);
            doActionToday(task, index);
        });
}



//   Other function Section [ Others ]
function createFormStatus(isVisible) {
    if(isVisible) {
        domVar.createToDoList.style.visibility = "visible";
        domVar.blur.style.visibility = "visible";
        domVar.guide2.style.visibility = "hidden";
        domVar.guide2.style.position = "absolute";
    } else {
        domVar.createToDoList.style.visibility = "hidden";
        domVar.blur.style.visibility = "hidden";
        domVar.guide2.style.visibility = "hidden";
    }
}

function indexOfWeek(whatDay) {
    if      (whatDay === "Sunday")    return 1;
    else if (whatDay === "Monday")    return 2;
    else if (whatDay === "Tuesday")   return 3;
    else if (whatDay === "Wednesday") return 4;
    else if (whatDay === "Thursday")  return 5;
    else if (whatDay === "Friday")    return 6;
    else                              return 7;
}

function getIndexDate(dateSelected) {
    for(let i = 0; i < storageVar.date.length; i++)
        if(dateSelected.innerText === storageVar.date[i])
            return i;
        
    return -1;
}

function getIndexState(listSelected) {
    let formattedList = listSelected.innerText.replace(/·/g, '').trim();
    let getIndex = -1;

    for(let i = 0; i < storageVar.date.length; i++)
        if(currentDateFormat === storageVar.date[i]) {
            getIndex = i;
            break;
        }

    for(let i = 0; i < storageVar.todoDescription[getIndex].length; i++)
        if(formattedList === storageVar.todoDescription[getIndex][i]){
            return [getIndex, i];}
}


//   User interaction Section [ InterActSec ]
function doActionToday(task, LIIndex) {
    const text = task.querySelector('p');
    const actionDiv = task.querySelector('.action');


    let getIndex = getIndexState(text);

    if(currentClickedToday != null && currentClickedToday != task ) {   
        const currentActionDiv = currentClickedToday.querySelector('.action');
        currentActionDiv.remove();
        counterToday ++;
    }

    if(counterToday === 0 && text.style.color === "") {
        text.insertAdjacentHTML("beforeend",
            `<div class="action">
                <svg class="done" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-check-fill" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5m-2.6 5.854a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
                </svg> 
                
                <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
                </svg>
            </div>`);

            currentClickedToday = task;
            counterToday --;
    } else if (counterToday === 0) {
        text.insertAdjacentHTML("beforeend",
        `<div class="action">
             <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
            </svg>
        </div>`);

        currentClickedToday = task;
        counterToday --;
    } else {
        actionDiv.remove();

        currentClickedToday = null;
        counterToday ++;
    }

    const doneButton = task.querySelector('.done');
    const deleteButton = task.querySelector('.delete');

    if (doneButton) {
        doneButton.addEventListener('click', () => {
            text.style.color = "greenYellow";

            storageVar.descriptionState[getIndex[0]][LIIndex] = "greenYellow";
            
            reloadStyle();
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            task.remove(); 

            const outerIndex = getIndex[0];
            let newTodoDescription = [];
            let newDescriptionState = [];

            for(let i = 0; i < storageVar.todoDescription[outerIndex].length; i++) 
                if(i != LIIndex)
                    newTodoDescription.push(storageVar.todoDescription[getIndex[0]][i]);

            for(let i = 0; i < storageVar.descriptionState[outerIndex].length; i++) 
                if(i != LIIndex)
                    newDescriptionState.push(storageVar.descriptionState[outerIndex][i]);

            storageVar.todoDescription[getIndex[0]] = newTodoDescription;
            storageVar.descriptionState[getIndex[0]] = newDescriptionState;


            localStorage.setItem("storedToDos", JSON.stringify(storageVar.todoList));

            location.reload();
            resizeCanvas();
            
            if(storageVar.todoDescription[getIndex[0]].length === 0) {
                let newDescriptionState = [],
                    newTodoDescription  = [],
                    newDayOfWeek        = [],
                    newGetColor         = [],        
                    newDate             = [];     

                for(let i = 0; i < storageVar.date.length; i++)
                    if(i != getIndex[0]) {
                        newDescriptionState .push(storageVar.descriptionState[i]);
                        newTodoDescription  .push(storageVar.todoDescription[i]);
                        newDayOfWeek        .push(storageVar.dayOfWeek[i]);
                        newGetColor         .push(storageVar.getColor[i]);
                        newDate             .push(storageVar.date[i]);
                    }

                let newTodoList = {
                    descriptionState: newDescriptionState,
                    todoDescription: newTodoDescription,
                    dayOfWeek: newDayOfWeek,
                    getColor: newGetColor,
                    date: newDate
                }

                localStorage.setItem("storedToDos", JSON.stringify(newTodoList));
            }
        });
    }
}

function doActionGen(task) {
    const doneButton = task.querySelector('.done');
    const deleteButton = task.querySelector('.delete');
    const icon = task.querySelector(".icon")

    const mydate = task.querySelector("p");
    let getIndex = getIndexDate(mydate);

    if(currentClickedGen != null &&  currentClickedGen != task) {  
        const formerIcon = currentClickedGen.querySelector(".icon")

        formerIcon.style.visibility = "hidden";
        formerIcon.style.position = "absolute";

        counterGen ++;
    }

    // Dynanmic styling 
    if(counterGen === 0 && task.style.color === "") {
        icon.style.visibility = "visible";
        icon.style.position = "relative";

        counterGen --;

        currentClickedGen = task;
    } else if (counterGen === 0 ) {
        icon.style.visibility = "visible";
        icon.style.position = "relative";
        doneButton.style.visibility = "hidden";
        doneButton.style.position = "absolute"
        counterGen--;

        currentClickedGen = task;
    } else {
        icon.style.visibility = "hidden";
        icon.style.position = "absolute";

        counterGen ++;
        currentClickedGen = null;
    }

    // Dynamic styling of action
    if (doneButton) 
        doneButton.addEventListener('click', () => {
            task.style.color = "greenYellow";
            storageVar.getColor[getIndex] = "greenYellow";

            for(let i = 0; i < storageVar.descriptionState[getIndex].length; i++)
                storageVar.descriptionState[getIndex][i] = "greenYellow";

            reloadStyle();
        });

    if (deleteButton) 
        deleteButton.addEventListener('click', () => {
            task.remove()

            let newDescriptionState = [],
                newTodoDescription  = [],
                newDayOfWeek        = [],
                newGetColor         = [],        
                newDate             = [];     

            for(let i = 0; i < storageVar.date.length; i++)
                if(i != getIndex) {
                    newDescriptionState .push(storageVar.descriptionState[i]);
                    newTodoDescription  .push(storageVar.todoDescription[i]);
                    newDayOfWeek        .push(storageVar.dayOfWeek[i]);
                    newGetColor         .push(storageVar.getColor[i]);
                    newDate             .push(storageVar.date[i]);
                }

            let newTodoList = {
                descriptionState: newDescriptionState,
                todoDescription: newTodoDescription,
                dayOfWeek: newDayOfWeek,
                getColor: newGetColor,
                date: newDate
            }

            localStorage.setItem("storedToDos", JSON.stringify(newTodoList));
            location.reload();
            resizeCanvas();
        });
}



//   Data Storing Section [ StoringtSec ]
function storeData() {
    const userDate = domVar.createDateGeneral.value;
    const userList = domVar.createInputGeneral.value;
    const getDate = dayjs(userDate).format('MMMM DD, YYYY');
    const getWeek = dayjs(userDate).format('dddd');
    const todos = userList
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line.trim() !== '');

    let todosState = [];
    for(let i = 0; i < todos.length; i++)
        todosState[i] = "";

    let dateExist = false;
    let getIndex = 0;

    for(let i = 0; i < storageVar.date.length; i++){
        if(storageVar.date[i] === getDate) {
            getIndex = i;
            dateExist = true;
            break;
        }
    }

    if(!dateExist) {
        storageVar.dayOfWeek.push(getWeek);
        storageVar.date.push(getDate);
        storageVar.todoDescription.push(todos);
        storageVar.getColor.push("");
        storageVar.descriptionState.push(todosState);
    } else {
        let sentence = storageVar.todoDescription[getIndex];
        sentence += `,${todos}`

        const newSentence = sentence.split(',');
    
        let sentenceState = storageVar.descriptionState[getIndex];
        let newTodosState = [];

        for(let i = 0; i < todos.length; i++)
            newTodosState[i] = "";

        sentenceState += `,${newTodosState}`
        const newSentenceState = sentenceState.split(',');

        storageVar.todoDescription[getIndex] = newSentence;
        storageVar.descriptionState[getIndex] = newSentenceState;
        storageVar.getColor[getIndex] = "";
    }

    localStorage.setItem("storedToDos", JSON.stringify(storageVar.todoList));
}


//   Data and Style rendering Section [ RendertSec ]
function showData(day, datePicked, todoListPicked) {
    let upperHTMLConnect = 
`<li class="dateList">
    <div class="icon">
        <svg class="done" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-check-fill" viewBox="0 0 16 16">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5m-2.6 5.854a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
        </svg> 
                                        
        <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
        </svg>
    </div>`;

    for(let i = 0; i < day.length; i++) {
        let sentence = "";
        let indexDay = indexOfWeek(day[i])

        switch(indexDay) {  
            case 1: sentence += `${upperHTMLConnect}
                                <p>     ${datePicked[i]}      </p>
                                <ul class="todoListWeek">\n`;
                        
                    for(let j = 0; j < todoListPicked[i].length; j++) 
                        sentence += `<li>   ${todoListPicked[i][j]}    </li>\n`
                        
                    sentence += `</ul>\n</li>`;
    
                    domVar.dayContainer1.insertAdjacentHTML("beforeend", sentence);
                    break;
    
            case 2: sentence += `${upperHTMLConnect}
                                <p>     ${datePicked[i]}      </p>
                                <ul class="todoListWeek">\n`;
                        
                    for(let j = 0; j < todoListPicked[i].length; j++) 
                        sentence += `<li>   ${todoListPicked[i][j]}    </li>\n`
                        
                    sentence += `</ul>\n</li>`;
                    
                    domVar.dayContainer2.insertAdjacentHTML("beforeend", sentence);
                    break;
                              
            case 3: sentence += `${upperHTMLConnect}
                                <p>     ${datePicked[i]}      </p>
                                <ul class="todoListWeek">\n`;
                        
                    for(let j = 0; j < todoListPicked[i].length; j++) 
                        sentence += `<li>   ${todoListPicked[i][j]}    </li>\n`
                        
                    sentence += `</ul>\n</li>`;
    
                    domVar.dayContainer3.insertAdjacentHTML("beforeend", sentence);
                    break;
    
            case 4: sentence += `${upperHTMLConnect}
                                <p>     ${datePicked[i]}      </p>
                                <ul class="todoListWeek">\n`;
                        
                    for(let j = 0; j < todoListPicked[i].length; j++) 
                        sentence += `<li>   ${todoListPicked[i][j]}    </li>\n`
                        
                    sentence += `</ul>\n</li>`;
    
                    domVar.dayContainer4.insertAdjacentHTML("beforeend", sentence);
                    break;
    
            case 5: sentence += `${upperHTMLConnect}
                                <p>     ${datePicked[i]}      </p>
                                <ul class="todoListWeek">\n`;
                        
                    for(let j = 0; j < todoListPicked[i].length; j++) 
                        sentence += `<li>   ${todoListPicked[i][j]}    </li>\n`
                        
                        sentence += `</ul>\n</li>`;
                    
                    domVar.dayContainer5.insertAdjacentHTML("beforeend", sentence);
                    break;

            case 6: sentence += `${upperHTMLConnect}
                                <p>     ${datePicked[i]}      </p>
                                <ul class="todoListWeek">\n`;
                        
                    for(let j = 0; j < todoListPicked[i].length; j++) 
                        sentence += `<li>   ${todoListPicked[i][j]}    </li>\n`
                        
                    sentence += `</ul>\n</li>`;
    
                    domVar.dayContainer6.insertAdjacentHTML("beforeend", sentence);
                    break;
                    
           default: sentence += `${upperHTMLConnect}
                                <p>     ${datePicked[i]}      </p>
                                <ul class="todoListWeek">\n`;
                        
                    for(let j = 0; j < todoListPicked[i].length; j++) 
                        sentence += `<li>   ${todoListPicked[i][j]}    </li>\n`
                        
                    sentence += `</ul>\n</li>`;
    
                    domVar.dayContainer7.insertAdjacentHTML("beforeend", sentence);
        }
    }
}

function showTodayList(datePicked, todoListPicked) {
    let sentence = "";
    let getIndex = -1;

    for(let i = 0; i < datePicked.length; i++)
        if(currentDateFormat === datePicked[i]) {
            getIndex = i;
            break;
        }
    
    if(getIndex != -1) {
        sentence += `<ul id="taskToday">\n\n`;

        for(let i = 0; i < todoListPicked[getIndex].length; i++)
            sentence += `\t<li>\n\t\t<p> &centerdot; ${todoListPicked[getIndex][i]} </p>\n\t</li>\n\n`

        sentence += `<lu>`;

        domVar.todayContainer.insertAdjacentHTML("beforeend", sentence);
    }
}

function reloadStyle() {
    localStorage.setItem("storedToDos", JSON.stringify(storageVar.todoList));

    const containers = document.querySelectorAll('.dateList');

    containers.forEach((container) => {
        const mydate = container.querySelector("p");

        let getIndex = getIndexDate(mydate);
        let counter  = 0;

        if(storageVar.getColor[getIndex] === "greenYellow")
            container.style.color = "greenYellow";

        const listItems = container.querySelectorAll('ul li');

        listItems.forEach((li, index2) => {
            if(storageVar.descriptionState[getIndex][index2] === "greenYellow") 
                li.style.color = "greenYellow"; 
        });

        for(let i = 0; i < storageVar.descriptionState[getIndex].length; i++) 
            if(storageVar.descriptionState[getIndex][i] === "greenYellow")
                counter++;

        if(counter === storageVar.descriptionState[getIndex].length){
            storageVar.getColor[getIndex] = "greenYellow";
            container.style.color = "greenYellow";
        }
    });

    if(domVar.todayContainer.childElementCount != 0 ) {
        const taskToday  = document.getElementById("taskToday"),
        dataInfoToday    = taskToday.querySelectorAll("li");
        dataInfoToday.forEach((li, key) => {
            const text = li.querySelector("p");

            let getIndex = getIndexState(text);
      
            if(storageVar.descriptionState[getIndex[0]][key] === "greenYellow") 
                text.style.color = "greenYellow"; 
        });
    }

    localStorage.setItem("storedToDos", JSON.stringify(storageVar.todoList));
}


//   Chart creation section [ ChartSec ]
let myChart;
function createChart() {
    const todoChart = document.getElementById('myChart').getContext('2d');

    myChart = new Chart(todoChart, {
        type: 'line', 
        data: {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [{
                label: 'ToDo List Progress',
                backgroundColor: [
                    'rgba(181, 216, 158, 0.5)', 
                    'rgba(158, 216, 214, 0.5)',  
                    'rgba(216, 158, 211, 0.5)',  
                    'rgba(216, 188, 158, 0.5)',  
                    'rgba(166, 158, 216, 0.5)', 
                    'rgba(95, 7, 100, 0.5)',  
                    'rgba(196, 105, 118, 0.5)' 
                ],
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 5,
                data: [ storageVar.weekProgress[0], 
                        storageVar.weekProgress[1], 
                        storageVar.weekProgress[2], 
                        storageVar.weekProgress[3], 
                        storageVar.weekProgress[4], 
                        storageVar.weekProgress[5], 
                        storageVar.weekProgress[6]
                    ]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white', 
                        font: {     size: 10    }
                    },
                    grid: {         color: 'rgba(255,255,255, 0.2)'     }
                },
                x: {
                    ticks: {
                        color: 'white',
                        font: {     size: 10    }
                    },
                    grid: {         color: 'rgba(255,255,255, 0.2)' }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'yellow',
                        font: {
                            weight: 'bold',
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

function resizeCanvas() {
    const todoChart = document.getElementById('myChart');
    const container = todoChart.parentElement;
    
    const devPixRatio = window.devicePixelRatio || 1;

    todoChart.width  = window.width;
    todoChart.height = window.height;
    
    const ctx = todoChart.getContext('2d');
    ctx.scale(devPixRatio, devPixRatio);

    if (myChart) {
        myChart.destroy();
    }

    createChart();
}

window.addEventListener('resize', () => resizeCanvas());
resizeCanvas();



//   Progress Update Section[ ProgSec ]
doProgress();

function doProgress() {
    storageVar.weekProgress     = Array(7).fill(100);
    storageVar.dayWeekTaskCount = Array(7).fill(0);
    storageVar.dayWeekTaskDone  = Array(7).fill(-1);

    for(let i = 0; i < storageVar.dayOfWeek.length; i++) {
        let value      = storageVar.dayOfWeek[i],
            getIndex   = indexOfWeek(value) - 1,
            lengthTask = storageVar.todoDescription[i].length;

        setProgress(i, getIndex, lengthTask);

        computeProgress(getIndex)
    }

    localStorage.setItem("storedProgress", JSON.stringify({
        dayWeekTaskCount: storageVar.dayWeekTaskCount,
        dayWeekTaskDone:  storageVar.dayWeekTaskDone,
        weekProgress:     storageVar.weekProgress
    }));
    resizeCanvas()
}

function setProgress(i, index, lengthTask) {
    let key = storageVar.dayWeekTaskDone[index];

    for(let j = 0; j < lengthTask; j++){
        if (key === -1) { 
            key = 0;
            storageVar.dayWeekTaskDone[index] = 0;
        }

        if(storageVar.descriptionState[i][j] === "greenYellow")
            storageVar.dayWeekTaskDone[index] ++;
    }
        
    storageVar.dayWeekTaskCount[index] += lengthTask;
}

function computeProgress(index) {
    let progressRate = storageVar.dayWeekTaskDone[index] / storageVar.dayWeekTaskCount[index];

    if(storageVar.dayWeekTaskDone[index] < 0)  
        storageVar.weekProgress[index] = 100;
    else
        storageVar.weekProgress[index] = progressRate * 100;
}