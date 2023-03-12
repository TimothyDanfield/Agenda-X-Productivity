import React, { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {

    const getToken = () => {
        const token = JSON.parse(localStorage.getItem('Token'))
        return token ? token : ''
    }
    //let auth = { 'token': getToken() } 
    let auth = { token: true}

    return (
        auth.token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes