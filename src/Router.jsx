import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Task from './components/Task/Task'
export default (
    <Switch>
        <Route component={Landing} path='/' exact />
        <Route component={Task} path='/Task/:id' exact />
    </Switch>
)