/*
        File Type :    Vanilla JavaScript (JS)
        Used in   :    Main.js
        Code by   :    Jeo D. Latorre
*/

//  Variable Declarations and Initializations

// Shorthand Variables
const query      = className => document.querySelector(className);
const queryID    = className => document.getElementById(className);

// Export the variables related to DOM Query
export const domVar = {
    closeCreateGeneral : query(".closeCreateGeneral"),
    createInputGeneral : query(".createInputGeneral"),
    createDateGeneral  : query(".createDateGeneral"),
    currentDateAndDay  : query(".currentDateAndDay"),
    todayContainer     : query(".todayContainer"),
    createToDoList     : query(".createToDoList"),
    createGenList      : query(".createGenList"),
    dayContainer1      : query(".dayContainer1"),
    dayContainer2      : query(".dayContainer2"),
    dayContainer3      : query(".dayContainer3"),
    dayContainer4      : query(".dayContainer4"),
    dayContainer5      : query(".dayContainer5"),
    dayContainer6      : query(".dayContainer6"),
    dayContainer7      : query(".dayContainer7"),
    formGeneral        : queryID("formGeneral"),
    todayList          : query(".todayList"),
    guide2             : query(".guide2"),
    blur               : query(".blur")
};

//   Storage Accessing Section [ SecAccSec ]
//   [ SecAccSec ] ---------------- Progress Storage
let todoListProgress = JSON.parse(localStorage.getItem("storedProgress")) || { 
                            dayWeekTaskCount: [], 
                             dayWeekTaskDone: [], 
                                weekProgress: [] 
                        },
    dayWeekTaskCount = todoListProgress.dayWeekTaskCount,
    dayWeekTaskDone  = todoListProgress.dayWeekTaskDone,
    weekProgress     = todoListProgress.weekProgress;

//   [ SecAccSec ] ---------------- ToDo List Storage
let todoList         = JSON.parse(localStorage.getItem("storedToDos")) || { 
                                   dayOfWeek: [], 
                                        date: [], 
                             todoDescription: [], 
                            descriptionState: [], 
                                    getColor: [] 
                        },
    dayOfWeek        = todoList.dayOfWeek,
    date             = todoList.date,
    todoDescription  = todoList.todoDescription,
    descriptionState = todoList.descriptionState,
    getColor         = todoList.getColor;

//   [ SAS ] ---------------- History Storage
let history = JSON.parse(localStorage.getItem('changeHistory')) || { isVisit: false },
    isVisit = history.isVisit;


// Export the variables related to storage
export const storageVar = {
    dayWeekTaskCount,
    descriptionState,
    todoListProgress,
    dayWeekTaskDone,
    todoDescription,
    weekProgress,
    dayOfWeek,
    todoList,
    getColor,
    isVisit,
    date
};