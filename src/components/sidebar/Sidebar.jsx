import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeUserListHandler, searchHandler, smartListHandler } from "../../redux/slice/actionSlice";
import { deleteNewList, fetchTodos, getTodosByListId } from "../../redux/action/todoAction";
import NewList from "./NewList";
import "./Sidebar.css";


const Sidebar = () => {
    const dispatch = useDispatch();

    const { smartList, activeUserList,} = useSelector(state => state.actions);
    const { newlist } = useSelector(state => state.todos);

    const [isAdd, setIsAdd] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isReminderActive, setIsReminderActive] = useState(false);

    // Get the token
    const token = localStorage.getItem('token');

    // Search handler
    const handleSearch = useCallback(({target:{value}}) => {
        setSearchTerm(value)
        dispatch(searchHandler(value))
        setIsReminderActive(false)
        dispatch(activeUserListHandler(null));
    },[dispatch])

    
    const handleSmartList = useCallback((listName) => {
        dispatch(smartListHandler(listName.toLowerCase()))
        dispatch(activeUserListHandler(null)); // Deactivate category lists when a smart list is selected
    },[dispatch])

    
    // Delete handler
    const handleDelete = useCallback(async (id) => {
        await dispatch(deleteNewList({id, token}))
        await dispatch(fetchTodos(token))
        handleSmartList('All')
    },[dispatch, token, handleSmartList])


    const handleCategoryListSelection = useCallback((id) => {
        setIsReminderActive(false)
        dispatch(activeUserListHandler(id)) // Set the active item by id
        dispatch(smartListHandler(null)); // Deactivate smart lists when a category list is selected
        dispatch(getTodosByListId({id, token}))
    },[dispatch, token])

    
    const toggleReminders = useCallback(() =>{
        handleCategoryListSelection('default')
        setIsReminderActive(true)
    },[handleCategoryListSelection])
    
    return (
        <>
            <div className="sidebar-container" style={{color: "black"}}>
                <div className="search-bar"> 
                    <input type="text" value={searchTerm} placeholder="Search" onChange={handleSearch}/>
                </div>
                <div className="smart-list">
                    <ul>
                        <li onClick={() => handleSmartList('All')} className={ !activeUserList && smartList.all ? 'lists': ''}>
                            <i className="bi bi-grid-fill"></i>
                            <p>All</p>
                        </li>
                        <li onClick={() => handleSmartList('Today')} className={ !activeUserList && smartList.today ? 'lists': ''}>
                            <i className="bi bi-calendar-check-fill"></i>
                            <p>Today</p>
                        </li>
                        <li onClick={() => handleSmartList('Completed')} className={ !activeUserList && smartList.completed ? 'lists': ''}>
                            <i className="bi bi-check-circle-fill"></i>
                            <p>Completed</p>
                        </li>
                        <li onClick={() => handleSmartList('Events')} className={ !activeUserList && smartList.events ? 'lists': ''}>
                            <i className="bi bi-suitcase-lg-fill"></i>
                            <p>Events</p>
                        </li>
                    </ul>
                </div>
                <div className="my-lists">
                    <p>My Lists</p>
                    <ul>
                        <li className={isReminderActive? 'list-active' : ''} onClick={toggleReminders}>
                            <i className="bi bi-pin-angle-fill"></i>
                            Remainders
                        </li>
                        {
                            newlist.map((list) => (
                                <li key={list._id} id="user-list" onClick={() => handleCategoryListSelection(list._id)} className={activeUserList === list._id ? 'list-active' : ''}>
                                    <div>
                                        <i className={list.icon}></i>
                                        {list.listName}
                                    </div>
                                    <i className="bi bi-trash3-fill trash" onClick={() => handleDelete(list._id)}></i>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="list-add-button">
                    <button onClick={() => setIsAdd(true)}>Add List</button>
                </div>
            </div>
            <div className="container">
                {
                    isAdd &&
                    <NewList onClose={() => setIsAdd(null)}/>
                }
            </div>
        </>
    )
}

export default Sidebar