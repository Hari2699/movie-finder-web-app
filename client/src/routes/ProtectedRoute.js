import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('QlmVhATFWF')

    return (
        <Route
            { ...rest }
            render={ (props) => (
                token ? <Component { ...props } /> : <Redirect to='/signin' />
            ) }
        >
        </Route>
    )
}

export default ProtectedRoute


