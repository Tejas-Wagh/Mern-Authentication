import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet , Navigate} from 'react-router-dom';

function PrivateRoute() {
    const user= useSelector((state)=>state.user.user);

  return (
    user?.email ? <Outlet/> : <Navigate to={"/login"}/>
  )
}

export default PrivateRoute