import { useEffect, useState } from "react"
import "./TodoList.css"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, deleteTodo, editTodo, fetchTodos } from "../../redux/todoAction"
import { getWeek } from "../utils/dateFormater"

const TodoList = () => {
    const {notes, isLoading, error} = useSelector(state => state.todos)
    const { searchValue, smartList } = useSelector(state => state.actions)
    const dispatch = useDispatch()
    const [filteredValue, setFilteredValue] = useState([])
    const [status, setStatus] = useState(true)
    const [editingId, setEditingId] = useState(null)
    const [inputType, setInputType] = useState(false)
    const [note, setNote] = useState({
        title: '',
        note: '',
        date: '',
        location: '',
        status: false
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
    
    useEffect(() => {
        // Fetch todos when the component is mounted
        dispatch(fetchTodos(token))
    },[dispatch, token])


    useEffect(() => {
        if (searchValue) {
            // set todos value when the user search
            setFilteredValue(notes.filter(todo => todo.title.toLowerCase().includes(searchValue.toLowerCase())));
        }
        else if(smartList.today)
        {
            setFilteredValue(notes.filter( todo => getWeek(todo.date) === getWeek(new Date())))
        } 
        else if(smartList.completed)
        {
            setFilteredValue(notes.filter( todo => todo.status === true))
        }
        else if(smartList.events)
        {
            setFilteredValue(notes.filter( todo => todo.location.length > 0))
        } 
        else 
        {
            setFilteredValue(notes);
        }
    }, [searchValue, notes, smartList]);


    // handle for add todo
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addTodo({note, token}))
        setInputType(false)
        dispatch(fetchTodos(token))
        setNote({
            title: '',
            note: '',
            date: '',
            location: '',
            status: false
        })
    }

    // set the value in the input when the editHandler activated
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
    const handleSave = (todoId) => {
        dispatch(editTodo({todoId, updateNote}))
        dispatch(fetchTodos(token))
        setEditingId(null); // Exit edit mode
    };

    // Delete handler
    const handleDelete = (todoId) => {
        dispatch(deleteTodo(todoId))
    }

    // To set the value
    const changeHandler = ({target: {value, name}}) => {
        setNote({
            ...note,
            [name]: value
        })
    }

    // Set the edited value
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

    // handle for todo status change
    const handleStatus = (todoId) => {
        setStatus(!status)
        dispatch(editTodo({todoId, 'updateNote' : {status}}))
    }
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    

    return (
        <div className="todo-list">
            <div className="head-bar">
                <h1>TodoList</h1>
                <h1>{filteredValue.length}</h1>
            </div>
                <ul className="task-order">
                    {
                        filteredValue.map((todo) => (
                            <>
                            <li key={todo._id} className="task-list">
                                <span className="list-action-icon">
                                    <i className="bi bi-circle-fill" onClick={() => handleDelete(todo._id)}></i>
                                    <i className={`bi bi-circle${todo.status ? '-fill actived': ''}`} onClick={() => handleStatus(todo._id)}></i>
                                </span>
                                <div className={`task ${todo.status ? 'completed': ''}`} onClick={() => enableEdit(todo)}>
                                {editingId === todo._id ? (
                                    <>
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
                                    </>
                                ) :
                                    <>
                                    <p>{todo.title}</p>
                                    <p>{todo.note}</p>
                                    <span className="d-flex" style={{gap: '1.5rem'}}>
                                        <p>{todo.location}</p>
                                        <p>{getWeek(todo.date)}</p>
                                    </span>
                                    </>
                                }
                                </div>
                            </li>
                            <hr />
                            </>
                        ))
                    }
                    <li className="list-add">
                        <i className="bi bi-circle" onClick={insertHandler}></i>
                        {
                            inputType ?
                            <>
                                <form onSubmit={handleSubmit} className="note-form">
                                    <input type="text" className="form-control form-control-sm col-md-6" name="title" placeholder="name" onChange={changeHandler} required/>
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