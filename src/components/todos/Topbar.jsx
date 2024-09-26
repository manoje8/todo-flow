import { Link, useNavigate } from "react-router-dom"
import "./Topbar.css"
import { useDispatch } from "react-redux"
import { logout, theme } from "../../redux/todoSlice"
import WithAuth from "../WithAuth"
import { useState } from "react"

const Topbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isDark, setIsDark] = useState(false)

    const handleMode = () => {
        setIsDark(!isDark)
        dispatch(theme(!isDark))
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate("/auth/login");  // Redirect to login after logout
      };
    return (
        <div className="topbar mt-2">
            <ul>
                <li><Link to="/auth/login"><i className="bi bi-person-fill-check h5"></i></Link></li>
                <li><i className="bi bi-text-left h5"></i></li>
                <li><i className="bi bi-box-arrow-up h5" onClick={handleLogout}></i></li>
                <li><i className={`bi ${isDark ? "bi bi-moon-fill" : "bi-brightness-high"} h5`} onClick={handleMode}></i></li>
            </ul>
        </div>
    )
}

export default WithAuth(Topbar)