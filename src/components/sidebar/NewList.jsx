import { useState } from "react";
import listIcons from "../utils/listIcons"
import "./NewList.css"
import { useDispatch } from "react-redux";
import { addNewList } from "../../redux/action/todoAction";

const NewList = ({onClose }) => {
    const dispatch = useDispatch()
    
    const [values, setValues] = useState({
        listName: '',
        color: '',
        icon: ''
    })

    // Get the token
    const token = localStorage.getItem('token')

    const colors = ['red-color', 'blue-color', 'green-color', 'yellow-color', 'orange-color', 'black-color']

    const handleChange = ({target: {value, name}}) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handlePick = ({target: {className, attributes}}) => {
        
        setValues({
            ...values,
            [attributes.name.value] : className.trim()     // Set the selected color
        })  
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addNewList({values, token}))
        onClose()   // Close the modal or form
    }

    return (
        <div id="new-list" className="modal fade show" style={{ display: 'block', color: "#000" }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <form className="modal-content" onSubmit={handleSubmit}>
                    <div>
                        <h5 className="modal-title text-center">New List(Under Development)</h5>
                    </div>
                    <div className="modal-body">
                        <div className="form-group d-flex">
                            <label>Name</label>
                            <input type="text" name="listName" className="input-group input-group-sm mx-3" id="todo-name" onChange={handleChange}/>
                        </div>
                        <div className="col">
                            <div className="row new-list-styles">
                                <div className="list-colors">
                                    <label>Colors</label>
                                    <div className="color-picker">
                                        {
                                            colors.map((color, id) => (
                                                <div key={id} name="color" className={`${color} ${values.color === color ? 'color-selected' : ''}`} onClick={handlePick}></div>
                                            ))
                                        }
                                    </div>
                                </div>
                                
                                <div className="icon-picker">
                                    <label>Icon:</label>
                                    <div className="icon-box">
                                        {
                                            listIcons.map((icon, id) => (
                                                <i key={id} name="icon" className={`${icon} ${values.icon === icon ? 'icon-selected' : ''}`} onClick={handlePick}></i>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="d-flex flex-row-reverse p-2 mr-4">
                        <button type="submit" className="btn btn-success btn-sm">
                            Add
                        </button>
                        <button type="button" className="btn btn-danger btn-sm mx-2" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewList