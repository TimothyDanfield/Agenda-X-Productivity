import React, { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {

    const getToken = () => {
        const user = JSON.parse(localStorage.getItem('User'))
        return user ? user.data.token : ''
    }
    //let auth = { 'token': getToken() } 
    let auth = { 'token': true}

    return (
        auth.token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes