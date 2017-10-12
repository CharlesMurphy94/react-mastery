import React, {Component} from 'react'
import './Landing.css'

import Button from './Button/Button'
import {Link} from 'react-router-dom'

import { connect } from 'react-redux'
import {todo, inprogress, completed, newItem, notModified, mounter, handleChange, handleClick, moveToIP, moveToC, deleteItem} from './../../ducks/reducer'

class Landing extends Component {
    // handleClick(item){
    //     if (this.state.notModified){ alert('Please enter a task')}
    //     else {
    //         this.setState({
    //         todo: this.state.todo.concat([item]),
    //         newItem: '',
    //         notModified: true
    //         })
    //     }
    // }


    render(){
        let {todo, inprogress, completed, newItem, notModified, mounter, handleChange, handleClick, moveToIP, moveToC, deleteItem} = this.props;

        var todoList = todo.map((item, i) => (
            <li  key={i} className="list-item">
                <Link to={`/card/:${newItem}`}>
                    <span className="item-name">{item}</span>
                </Link>
                <span className="push-item" onClick={()=>moveToIP(item,i)}>Begin Task</span>
            </li>
        ))
        var inprogressList = inprogress.map((item, i) => (
            <li onClick={()=>moveToC(item,i)} key={i} className="listItem">{item}</li>
        ))
        var completedList = completed.map((item, i) => (
            <li onClick={()=>deleteItem(item,i)} key={i} className="listItem">{item}</li>
        ))

        
        return(
            <div>
                <p className='instructions'>Click on a task to change its status - completed tasks will be deleted on click.</p>
                <p className='instructions'>Add a task to begin!</p>
                <div className='Landing'>
                    <div className='to-do'>
                        <h1> To-do </h1>
                        <ul>
                            {todoList}
                        </ul>
                    </div>
                    <div className='in-progress'>
                        <h1> In Progress </h1>
                        <ul>
                            {inprogressList}
                        </ul>
                    </div>
                    <div className='complete'>
                        <h1> Completed </h1>
                        <ul>
                            {completedList}
                        </ul>
                    </div>
                    
                </div>
                <div className="form">
                    <h1>Add New Task</h1>
                    <input onChange={(event) => handleChange(event) } placeholder='Task Name' value={newItem}/>
                    <Button action={()=>handleClick()}
                            isDisabled={(e)=>notModified()}
                    />
                    
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
    handleClick,
    moveToIP,
    moveToC,
    deleteItem
}
export default connect(mapStateToProps, outputActions)(Landing)