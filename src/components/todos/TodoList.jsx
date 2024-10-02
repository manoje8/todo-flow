import { useEffect, useRef, useState } from "react"
import "./TodoList.css"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, deleteTodo, editTodo, fetchTodos, getTodosByListId } from "../../redux/action/todoAction"
import { getWeek } from "../utils/dateFormater"

const TodoList = () => {
    const {notes, isLoading, newlistValue, error} = useSelector(state => state.todos)
    const { searchValue, smartList, activeUserList } = useSelector(state => state.actions)
    const [filteredValue, setFilteredValue] = useState([])
    const [status, setStatus] = useState(true)
    const [editingId, setEditingId] = useState(null)
    const [inputType, setInputType] = useState(false)
    const inputRef = useRef(null)

    const dispatch = useDispatch()

    const [note, setNote] = useState({
        title: '',
        note: '',
        date: '',
        location: '',
        status: false,
        categoryId: activeUserList // Initialize with current
    })
    const [updateNote, setUpdateNote] = useState({
        title: '',
        note: '',
        date: '',
        location: '',
        status: false
    });

    // Get the token
    const token = localStorage.getItem('token')
    

    // Fetch todos based on activeUserList
    useEffect(() => {
        if(activeUserList)
        {
            dispatch(getTodosByListId({id:activeUserList, token}))
        }
        else
        {
            dispatch(fetchTodos(token))
        }
    },[dispatch, token, activeUserList])


    // Update categoryId in note when activeUserList changes
    useEffect(() => {
        setNote(prevNote => ({
        ...prevNote,
        categoryId: activeUserList
        }));
    }, [activeUserList]);

    
    // Filter todos based on conditions
    useEffect(() => {
        const filterStrategies = {
            search: () => notes.filter(todo => 
                todo.title.toLowerCase().includes(searchValue.toLowerCase())
            ),
            today: () => notes.filter(todo => 
                getWeek(todo.date) === getWeek(new Date())
            ),
            completed: () => notes.filter(todo => todo.status === true),
            events: () => notes.filter(todo => todo.location.length > 0),
            userList: () => newlistValue,
            default: () => notes,
        };
    
        const getFilterKey = () => {
            if (searchValue) return 'search';
            if (smartList.today) return 'today';
            if (smartList.completed) return 'completed';
            if (smartList.events) return 'events';
            if (activeUserList) return 'userList'
            return 'default';
        };

        
        const filterKey = getFilterKey();
        const filteredNotes = filterStrategies[filterKey](notes);

        // Update the filtered notes in the state
        setFilteredValue(filteredNotes);

    }, [searchValue, notes, smartList, setFilteredValue,activeUserList, newlistValue]);


     // useEffect to focus the input field after rendering when inputType becomes true
     useEffect(() => {
        if (inputType && inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputType]);


    // handle for add todo
    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(addTodo({note, token}))
        setInputType(false)
        if(activeUserList)
        {
            dispatch(getTodosByListId({id:activeUserList, token}))
        }else
        { 
            dispatch(fetchTodos)
        }
        resetNote()
    }

    // Reset note after submission
    const resetNote = () => {
        setNote({
            title: '',
            note: '',
            date: '',
            location: '',
            status: false,
            categoryId: null
        });
    };

    // Enable Edit mode
    const enableEdit = (todo) => {
        if (editingId !== todo._id) {
            setEditingId(todo._id); // Set the task to be edited
            setUpdateNote({
                title: todo.title || '',
                note: todo.note || '',
                date: todo.date || '',
                location: todo.location || '',
                status: todo.status
            });
        }
    };
    
    
    // To save the edited value
    const handleSave = async (todoId) => {
        await dispatch(editTodo({todoId, updateNote}))
        if(activeUserList)
        {
            dispatch(getTodosByListId({id:activeUserList, token}))
        }else
        { 
            dispatch(fetchTodos)
        }
        setEditingId(null); // Exit edit mode
    };


    // Delete handler
    const handleDelete = async (todoId) => {
        await dispatch(deleteTodo(todoId))
        if (activeUserList) {
            dispatch(getTodosByListId({ id: activeUserList, token }));
        } else {
            dispatch(fetchTodos(token));
        }
    }

    // handle for todo status change
    const handleStatus = async (todoId) => {
        await dispatch(editTodo({todoId, 'updateNote' : {status: !status}}))
        setStatus(!status)
        if (activeUserList) {
            dispatch(getTodosByListId({ id: activeUserList, token }));
        } else {
            dispatch(fetchTodos(token));
        }
    }

    // Set the input value
    const changeHandler = ({target: {value, name}}) => {
        setNote({
            ...note,
            [name]: value
        })
    }

    // Set the edited input value
    const editChangeHandler = ({target: {value, name}}) => {
        setUpdateNote(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    // Handler for Edit activation
    const insertHandler = (e) => {
        e.target.checked = false
        setInputType(!inputType)
    }
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    

    return (
        <div className="todo-list animated fadeInLeft">
            <div className="head-bar">
                <h1>TodoList</h1>
                <h1>{filteredValue.length}</h1>
            </div>
                <ul className="task-order">
                    {
                        filteredValue.map((todo) => (
                            <div key={todo._id}>
                                <li className="task-list">
                                    <span className="list-action-icon">
                                        <i className="bi bi-circle-fill" onClick={() => handleDelete(todo._id)}></i>
                                        <i className={`bi bi-circle${todo.status ? '-fill actived': ''}`} onClick={() => handleStatus(todo._id)}></i>
                                    </span>
                                    <div className={`task ${todo.status ? 'completed': ''}`} onClick={() => enableEdit(todo)}>
                                    {editingId === todo._id ? (
                                        <div className="animated fadeIn">
                                            <p><input name="title" type="text" value={updateNote.title} onChange={editChangeHandler}/></p>
                                            <p><input name="note" type="text" value={updateNote.note} onChange={editChangeHandler}/></p>
                                            <div className="d-flex">
                                                <p><input name="location" type="text" value={updateNote.location} onChange={editChangeHandler}/></p>
                                                <p className="mx-5"><input name="date" type="datetime-local" value={updateNote.date}onChange={editChangeHandler} /></p>
                                            </div>
                                            <div>
                                                <i className="bi bi-x-lg text-danger" onClick={() => setEditingId(null)}></i>
                                                <i className="bi bi-check2-circle mx-3 text-success"  onClick={() => handleSave(todo._id)}></i>
                                            </div>
                                        </div>
                                    ) :
                                        <div className=" animated fadeIn">
                                        <p>{todo.title}</p>
                                        <p>{todo.note}</p>
                                        <span className="d-flex" style={{gap: '1.5rem'}}>
                                            <p>{todo.location}</p>
                                            <p>{getWeek(todo.date)}</p>
                                        </span>
                                        </div>
                                    }
                                    </div>
                                </li>
                            <hr />
                            </div>
                        ))
                    }
                    <li className="list-add">
                        <i className="bi bi-circle" onClick={insertHandler}></i>
                        {
                            inputType ?
                            <>
                                <form onSubmit={handleSubmit} className="note-form">
                                    <input type="text" className="form-control form-control-sm col-md-6" name="title" placeholder="name" onChange={changeHandler} ref={inputRef} required/>
                                    <input type="text" className="form-control form-control-sm col-md-6" name="note" placeholder="note" onChange={changeHandler}/>
                                    <div className="d-flex form-group">
                                        <input type="datetime-local" className="form-control form-control-sm col-md-3" name="date"placeholder="Add Date" onChange={changeHandler}/>
                                        <input type="text" className="form-control form-control-sm col-md-3 mx-1" name="location" placeholder="Add Location" onChange={changeHandler}/>
                                    </div>
                                    <button style={{display: "none"}}>+</button>
                                </form> 
                            </>
                            : ""
                        }
                    </li>
                </ul>
        </div>
    )
}

export default TodoList