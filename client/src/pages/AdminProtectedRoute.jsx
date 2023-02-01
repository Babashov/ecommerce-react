import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function AdminProtectedRoute() {
    const {loggedIn,user} = useAuth()
    
    return loggedIn && user?.role === 'admin' ? <Outlet/> : <Navigate to='/' />
}

export default AdminProtectedRoute