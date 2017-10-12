

//Constants
const HANDLE_CHANGE = "HANDLE_CHANGE";
const HANDLE_CLICK = "HANDLE_CLICK";
const MOVE_TO_IP = "MOVE_TO_IP";
const MOVE_TO_C = "MOVE_TO_C";
const DELETE = "DELETE"

//Action Builders

export function handleChange(input){
    return {
        type: HANDLE_CHANGE,
        input
    }
}
export function handleClick(input){
    return {
        type: HANDLE_CLICK,
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
        input,
        i
    }
}
export function deleteItem(input,i){
    return {
        type: DELETE,
        input,
        i
    }
}

//InitialState
const initialState={
    todo: [],
    inprogress: [],
    completed: [],
    newItem: '',
    notModified: true,
    mounter:''
}

//Reducer
export default function (state = initialState, action){
    switch(action.type){
        case HANDLE_CHANGE: 
            let itemToAdd = action.input.target.value
            console.log(itemToAdd)
            return Object.assign({},state,{newItem: itemToAdd, notModified: false})
        case HANDLE_CLICK:
            let updatedToDo = state.todo.concat([state.newItem]);
            return Object.assign({},state,{todo:updatedToDo, notModified:true, newItem: ''})
        
        case MOVE_TO_IP:
            let updatedIP = state.inprogress.concat([action.input]);
            let spliceHole1 = state.todo.splice(action.i, 1);
            return Object.assign({},state, {inprogress:updatedIP})
        case MOVE_TO_C:
            let updatedC = state.completed.concat([action.input]);
            let spliceHole2 = state.inprogress.splice(action.i, 1);    
            return Object.assign({},state, {completed:updatedC})
        case DELETE:
            let mountForce = state.mounter + 'a';
            let spliceHole3 = state.completed.splice(action.i, 1);
            return Object.assign({},state, {mounter:mountForce})
        default: return state
        }
}