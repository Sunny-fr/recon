import React from 'react'
import {
    Switch,
    Route,
} from 'react-router-dom'
import Home from '../screens/Home'

const router = (
    <Switch>
        <Route path="/">
            <Home/>
        </Route>
    </Switch>
)

export default router