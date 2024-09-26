import Sidebar from "../sidebar/Sidebar"
import Todos from "../todos/Todos"
import WithAuth from "../WithAuth"
import "./Home.css"
import { useSelector } from "react-redux"

const Home = () => {
    const {theme} = useSelector(state => state.todos)
    
    return (
        <div className={`App ${theme ? 'light' : 'dark'}`}>
            <Sidebar />
            <Todos />
        </div>
    )
}

export default WithAuth(Home)