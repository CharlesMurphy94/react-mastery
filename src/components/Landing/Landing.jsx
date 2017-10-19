import React, {Component} from 'react'
import './Landing.css'
import axios from 'axios'
import Button from './Button/Button.jsx'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { tasks, todo, inprogress, completed, newItem, notModified, mounter, handleChange, getTasks, handleClick, moveToIP, moveToC, deleteItem} from './../../ducks/reducer'

class Landing extends Component {
    // constructor(){
    //     super()
    //     this.state = {
    //         tasks:[],
    //         todo:[],
    //         completed:[]
    //     }
    // }
    componentDidMount(){
        this.props.getTasks()
        // this.props.tasks.map(e,i,a){
        //     e.completed ? 
        //  }
        
        // axios.get('https://practiceapi.devmountain.com/api/tasks/').then(response=>{
        //     this.setState({tasks: response.data});
        //     let todoCopy = this.state.todo.slice();
        //     this.state.tasks.map((e,i,a) => (
        //         e.completed ? null : todo.push(e)
        //     ))  
        //     let completedCopy = this.state.completed.slice();
        //     this.state.tasks.map((e,i,a) => (
        //         e.completed ? completed.push(e) : null
        //     ))    
        //     this.setState({todo: todoCopy, completed: completedCopy})
        // })
    }
    render(){
        console.log(this.props.newItem, 'this is this.props.newItem' )
        console.log(this.props.completed, 'this is the completed')
        let {todo, tasks, inprogress, completed, newItem, notModified, mounter, handleChange, getTasks, handleClick, moveToIP, moveToC, deleteItem} = this.props;

        //var todoList = this.state.todo.map((item, i) => (
        var todoList = this.props.todo.map((item, i) => (
            <li  key={i} className="list-item">
                <Link to={`/Task/${item.id}`} className="item-name">
                    <span>{item.title}</span>
                </Link>
                <span className="push-item" onClick={()=>moveToC(item.title,item.id)}>Complete Task</span>
            </li>
        ))
        // var inprogressList = inprogress.map((item, i) => (
        //     <li onClick={()=>moveToC(item,i)} key={i} className="listItem">{item}</li>
        // ))
        //var completedList = this.state.completed.map((item, i) => (
        var completedList = this.props.completed.map((item, i) => (
            <li key={i} className="list-item">
            <Link to={`/Task/${item.id}`} className="item-name">
                    <span>{item.title}</span>
            </Link>
            <span className="delete-item" onClick={()=>deleteItem(item.id)} >Delete Task</span>
            </li>
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
                    {/* <div className='in-progress'>
                        <h1> In Progress </h1>
                        <ul>
                            {inprogressList}
                        </ul>
                    </div> */}
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
                    <Button action={()=>console.log(this.props.newItem, "this is in the button")}//handleClick(this.props.newItem)}
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
    deleteItem,
    getTasks,
}
export default connect(mapStateToProps, outputActions)(Landing)