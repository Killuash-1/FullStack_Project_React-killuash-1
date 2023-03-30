import { useContext } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { Authorization } from "../../context/Authorization"


const SecureRoutes = () => {
    const {users, direction} = useContext(Authorization)

    const location = useLocation()

    if(direction){
        return null
    }

    return users ? (
        <Outlet/>
    ):(
        <Navigate to={'/LandingPage'} replace state={{from: location}}/>
    )

}

export default SecureRoutes