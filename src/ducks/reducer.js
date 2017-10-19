import axios from 'axios'

//Constants
const GET_TASKS = "GET_TASKS"
const GET_TASKS_PENDING = "GET_TASKS_PENDING"
const GET_TASKS_FULFILLED = "GET_TASKS_FULFILLED"
const GET_TASK_BY_ID = "GET_TASK_BY_ID"
const GET_TASK_BY_ID_PENDING = "GET_TASK_BY_ID_PENDING"
const GET_TASK_BY_ID_FULFILLED = "GET_TASK_BY_ID_FULFILLED"
const ADD_TASK = "ADD_TASK"
const ADD_TASKS_PENDING = "ADD_TASKS_PENDING"
const ADD_TASKS_FULFILLED = "ADD_TASKS_FULFILLED"
const HANDLE_CHANGE = "HANDLE_CHANGE";
const HANDLE_CANCEL = "HANDLE_CANCEL";
const HANDLE_SUBMIT = "HANDLE_SUBMIT";
const HANDLE_SUBMIT_PENDING = "HANDLE_SUBMIT_PENDING";
const HANDLE_SUBMIT_FULFILLED = "HANDLE_SUBMIT_FULFILLED";
const HANDLE_TITLE_CHANGE = "HANDLE_TITLE_CHANGE";
const HANDLE_DESC_CHANGE = "HANDLE_DESC_CHANGE";
const HANDLE_CLICK = "HANDLE_CLICK";
const HANDLE_CLICK_PENDING = "HANDLE_CLICK_PENDING";
const HANDLE_CLICK_FULFILLED = "HANDLE_CLICK_FULFILLED";
const MOVE_TO_IP = "MOVE_TO_IP";
const MOVE_TO_C = "MOVE_TO_C";
const MOVE_TO_C_FULFILLED = "MOVE_TO_C_FULFILLED";
const DELETE = "DELETE"
const DELETE_FULFILLED = "DELETE_FULFILLED"

//Action Builders

export function getTasks(){
    return {
        type:GET_TASKS,
        payload: axios.get('https://practiceapi.devmountain.com/api/tasks/').then(response=>response.data)   
    }
}
export function getTaskById(input){
    return{
        type:GET_TASK_BY_ID,
        input,
        payload: axios.get(`https://practiceapi.devmountain.com/api/tasks/`).then(response=>[response.data,input]),
        
    }
}
export function addTask(taskName,taskDescription){
    return {
        type: ADD_TASK,
        payload: axios.post('https://practiceapi.devmountain.com/api/tasks/').then(response=>response.data)
    }
}
export function handleChange(input){
    return {
        type: HANDLE_CHANGE,
        input
    }
}
export function handleTitleChange(input){
    return {
        type: HANDLE_TITLE_CHANGE,
        input
    }
}
export function handleDescChange(input){
    return {
        type: HANDLE_DESC_CHANGE,
        input
    }
}
export function handleCancel(){
    return{
        type: HANDLE_CANCEL
    }
}
export function handleSubmit(index,title,description){
    return{
        type: HANDLE_SUBMIT,
        payload: axios.patch(`https://practiceapi.devmountain.com/api/tasks/${index}`, {title:title,description:description}).then(response=>response.data),
    }
}
export function handleClick(input){
    return {
        type: HANDLE_CLICK,
        payload: axios.post('https://practiceapi.devmountain.com/api/tasks/', {title:input}).then(response=>response.data),
        input
    }
}
export function moveToIP(input,i){
    return {
        type: MOVE_TO_IP,
        input,
        i
    }
}
export function moveToC(input,i){
    return {
        type: MOVE_TO_C,
        payload: axios.patch(`https://practiceapi.devmountain.com/api/tasks/${i}`, {completed:true}).then(response=>response.data),
        input,
        i
    }
}
export function deleteItem(input){
    return {
        type: DELETE,
        payload: axios.delete(`https://practiceapi.devmountain.com/api/tasks/${input}`).then(response=>response.data),    
        input,
    }
}

//InitialState
const initialState={
    tasks: [],
    todo: [],
    inprogress: [],
    completed: [],
    newItem: '',
    newTitle: '',
    newDesc: '',
    notModified: true,
    mounter:'',
    loading: false,
    selectedTask: {},
}

//Reducer
export default function (state = initialState, action){
    switch(action.type){
        case GET_TASKS_FULFILLED:
            let todoCopy = [];
            let completedCopy = [];
            action.payload.map((e,i,a)=>{e.completed ? completedCopy.push(e) : todoCopy.push(e)})
            return Object.assign({}, state, {tasks:action.payload, todo:todoCopy, completed:completedCopy})
        case GET_TASK_BY_ID_FULFILLED:
            let selected = {}
            action.payload[0].map((e,i,a)=>{e.id == action.payload[1]? selected=e : null})
            return Object.assign({}, state, {selectedTask:selected})
        case GET_TASKS_PENDING:
            return Object.assign({}, state, {loading: true})
        case HANDLE_CHANGE: 
            let itemToAdd = action.input.target.value
            return Object.assign({},state,{newItem: itemToAdd, notModified: false})
        case HANDLE_TITLE_CHANGE: 
            let titleToAdd = action.input.target.value
            return Object.assign({},state,{newTitle: titleToAdd, notModified: false})
        case HANDLE_DESC_CHANGE: 
            let descToAdd = action.input.target.value
            return Object.assign({},state,{newDesc: descToAdd, notModified: false})
        case HANDLE_CANCEL:
            return Object.assign({},state,{newTitle:'',newDesc:''})
        case HANDLE_SUBMIT_FULFILLED:
            let todoCopyFour = [];
            let completedCopyFour = [];
            action.payload.map((e,i,a)=>{e.completed ? completedCopyFour.push(e) : todoCopyFour.push(e)})
            return Object.assign({}, state, {tasks:action.payload, todo:todoCopyFour, completed:completedCopyFour})
        case HANDLE_CLICK_FULFILLED:
            let todoCopyThree = [];
            let completedCopyThree = [];
            action.payload.map((e,i,a)=>{e.completed ? completedCopyThree.push(e) : todoCopyThree.push(e)})
            return Object.assign({}, state, {tasks:action.payload, todo:todoCopyThree, completed:completedCopyThree})
            // let updatedToDo = state.todo.concat([state.newItem]);
            // return Object.assign({},state,{todo:updatedToDo, notModified:true, newItem: ''})
        
        case MOVE_TO_IP:
            let updatedIP = state.inprogress.concat([action.input]);
            let spliceHole1 = state.todo.splice(action.i, 1);
            return Object.assign({},state, {inprogress:updatedIP})
        case MOVE_TO_C_FULFILLED:
            console.log(action.input, 'coming back from patch')
            let todoCopyTwo = [];
            let completedCopyTwo = [];
            action.payload.map((e,i,a)=>{e.completed ? completedCopyTwo.push(e) : todoCopyTwo.push(e)})
            let selectedTaskCopy = Object.assign({},state.selectedTask, {completed:true})
            return Object.assign({}, state, {tasks:action.payload, todo:todoCopyTwo, completed:completedCopyTwo, selectedTask:selectedTaskCopy})
            // return Object.assign({},state, {completed:updatedC})
        case DELETE_FULFILLED:
            let todoCopyFive  = [];
            let completedCopyFive = [];
            action.payload.map((e,i,a)=>{e.completed ? completedCopyFive.push(e) : todoCopyFive.push(e)})
            console.log(completedCopyFive,'completedCopyFive')
            return Object.assign({}, state, {tasks:action.payload, todo:todoCopyFive, completed:completedCopyFive})
        
        }
        return state
}