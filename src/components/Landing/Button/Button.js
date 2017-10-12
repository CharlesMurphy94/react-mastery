import React, {Component} from 'react'
import './Button.css'

import { connect } from 'react-redux'
import { notModified, handleClick} from './../../../ducks/reducer'

class Button extends Component{
    render(){ let {notModified, handleClick} = this.props
    return (
        <button className={`add-button ${notModified? "disabled" : "enabled"}`} disabled={notModified?true:false} onClick={()=>handleClick()}>
            Add Task
        </button>
    )}
}
function MapStateToProps(state){
    return state
}
export default connect(MapStateToProps,{handleClick})(Button)



