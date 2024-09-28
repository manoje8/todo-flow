const AddTodoList = ({onClose}) => {
    return (
        <div className="modal fade show" style={{ display: 'block', color: "#000" }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">New List(Under Development)</h5>    
                        <button type="button" className="close" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <input type="text" name="" className="form-control" id="todo-name" />
                        </div>
                        <div className="form-group">
                            <label>Color :</label>
                            <input type="color" name="" className="form-control" id="" />
                        </div>
                        <div className="form-group">
                            <label form="formControlSelect">Icon</label>
                            <input type="text" placeholder="😊"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                        <button type="button" className="btn btn-success" onClick={onClose}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTodoList