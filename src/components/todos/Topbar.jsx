import { Link, useNavigate } from "react-router-dom"
import "./Topbar.css"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/todoSlice"
import { themeHandler } from "../../redux/actionSlice"
import WithAuth from "../WithAuth"

const Topbar = () => {
    const {theme} = useSelector(state => state.actions)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleMode = () => {
        dispatch(themeHandler(!theme))
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
                <li><i className={`bi ${theme ? "bi bi-moon-fill" : "bi-brightness-high"} h5`} onClick={handleMode}></i></li>
            </ul>
        </div>
    )
}

export default WithAuth(Topbar)