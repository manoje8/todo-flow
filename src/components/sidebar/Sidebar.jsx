import { useState } from "react"
import "./Sidebar.css"
import AddTodoList from "../todos/AddTodoList"
import { useDispatch, useSelector } from "react-redux"
import { searchHandler, smartListHandler } from "../../redux/actionSlice"

const Sidebar = () => {
    const { smartList } = useSelector(state => state.actions)
    const dispatch = useDispatch()
    const [isAdd, setIsAdd] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = ({target:{value}}) => {
        setSearchTerm(value)
        dispatch(searchHandler(value))
    }

    const handleSmartList = (event) => {
        dispatch(smartListHandler(event.target.textContent.toLowerCase()))
    }

    return (
        <>
        <div className="sidebar-container" style={{color: "black"}}>
            <div className="search-bar"> 
                <input type="text" value={searchTerm} placeholder="Search" onChange={handleSearch}/>
            </div>
            <div className="smart-list">
                <ul>
                    <li onClick={handleSmartList} className={ smartList.all ? 'lists': ''}>
                        <i className="bi bi-grid-fill"></i>
                        <p>All</p>
                    </li>
                    <li onClick={handleSmartList} className={ smartList.today ? 'lists': ''}>
                        <i className="bi bi-calendar-check-fill"></i>
                        <p>Today</p>
                    </li>
                    <li onClick={handleSmartList} className={ smartList.completed ? 'lists': ''}>
                        <i className="bi bi-check-circle-fill"></i>
                        <p>Completed</p>
                    </li>
                    <li onClick={handleSmartList} className={ smartList.events ? 'lists': ''}>
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