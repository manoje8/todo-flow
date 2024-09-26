import { useState } from "react"
import "./Sidebar.css"
import AddTodoList from "../todos/AddTodoList"
import { useDispatch } from "react-redux"
import { search } from "../../redux/todoSlice"

const Sidebar = () => {
    const dispatch = useDispatch()
    const [isAdd, setIsAdd] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    
    const mode = localStorage.getItem('mode')

    const handleSearch = ({target:{value}}) => {
        setSearchTerm(value)
        dispatch(search(value))
    }

    return (
        <>
        <div className="sidebar-container" style={mode ? {backgroundColor: "#45d"}: {}}>
            <div className="search-bar"> 
                <input type="text" value={searchTerm} placeholder="Search" onChange={handleSearch}/>
            </div>
            <div className="smart-list">
                <ul>
                    <li>
                        <i className="bi bi-grid-fill"></i>
                        <p>All</p>
                    </li>
                    <li>
                        <i className="bi bi-calendar-check-fill"></i>
                        <p>Today</p>
                    </li>
                    <li>
                        <i className="bi bi-check-circle-fill"></i>
                        <p>Complete</p>
                    </li>
                    <li>
                        <i className="bi bi-suitcase-lg-fill"></i>
                        <p>Events</p>
                    </li>
                </ul>
            </div>
            <div className="my-lists">
                <p>My Lists</p>
                <ul>
                    <li><i className="bi bi-pin-angle-fill"></i>Remainders</li>
                    <li><i className="bi bi-house-door-fill"></i>Family</li>
                </ul>
            </div>
            <div className="list-add-button">
                <button onClick={() => setIsAdd(true)}>Add List</button>
            </div>
        </div>
        <div className="container">
            {
                isAdd &&
                <AddTodoList onClose={() => setIsAdd(null)}/>
            }
        </div>
        </>
    )
}

export default Sidebar