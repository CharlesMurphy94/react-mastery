import React, {Component} from 'react'
import './Header.css'
import {Link} from 'react-router-dom'

class Header extends Component {
render(){
    // var headerBackground = {
    //     backgroundColor: 
    // }
    return(
        <div className="App-header" style={{backgroundColor: 'black'}} >    
            <Link to='/' className='home-link'><h1 >Tasker</h1></Link>
        </div>
    )
}   
}
export default Header