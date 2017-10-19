import React, {Component} from 'react'
import './Task.css'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {selectedTask, todo, inprogress, completed, newItem, newTitle, newDesc, notModified, mounter, getTaskById, handleChange, handleTitleChange, handleDescChange, handleCancel,handleSubmit, handleClick, moveToIP, moveToC, deleteItem} from './../../ducks/reducer'

class Task extends Component {
   componentDidMount(){
    console.log(this.props.match.params.id,"prps match params id")
    this.props.getTaskById(this.props.match.params.id)
   }
    render (){
        // console.log(this.props.newTitle, 'this is the newTitle')
        let {selectedTask, todo, inprogress, completed, newItem, newTitle, newDesc, notModified, mounter, handleChange, handleTitleChange, handleDescChange, handleCancel, handleSubmit, handleClick, moveToIP, moveToC, deleteItem} = this.props;
        return(
            <div className="task-page">
                <h1> Edit Task </h1>
                <h3> { ` Title: ${newTitle?newTitle:selectedTask.title}`} </h3>
                <input onChange={(event)=>handleTitleChange(event) } placeholder='Edit title' value={newTitle}/>
                <p> { `Description: ${newDesc?newDesc:selectedTask.description?selectedTask.description:'none'}`} </p>
                <input onChange={(event)=>handleDescChange(event) } placeholder={selectedTask.description ? 'Edit description' : 'Add a description'} value={newDesc}/> 
                <Link to="/" onClick={()=>handleSubmit(selectedTask.id,newTitle?newTitle:selectedTask.title,newDesc?newDesc:selectedTask.description)}><button className="submit-button" >SUBMIT</button></Link>
                <p> {`Status: ${selectedTask.completed?'Completed':'To-do'}`}</p>
                    <Link to='/'><button className={`change-status-${selectedTask.completed?'complete':'todo'}`} onClick={()=>selectedTask.complete?null:moveToC(selectedTask.title,selectedTask.id)}>{selectedTask.completed? null :'Mark Complete'}</button></Link>
                <div className="task-buttons">
                    <button className="cancel-button" onClick={()=>handleCancel()}>CANCEL CHANGES</button>
                    <Link to='/'><button className="back-button" >BACK TO LIST</button></Link>
                    <Link to="/" onClick={()=>deleteItem(selectedTask.id)}><button className="delete-button" >DELETE ITEM</button></Link>
                </div>
                
            </div>
        )
    }
}
function mapStateToProps(state){
    return state;
}
let outputActions = {
    handleChange,
    handleTitleChange,
    handleDescChange,
    handleCancel,
    handleSubmit,
    deleteItem,
    handleClick,
    moveToIP,
    moveToC,
    getTaskById
}
export default connect(mapStateToProps, outputActions)(Task)
