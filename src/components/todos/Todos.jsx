import Topbar from "./Topbar"
import "./Todos.css"
import TodoList from "./TodoList"
const Todos = () => {
    return (
        <div className="todos">
            <Topbar />
            <TodoList />
        </div>
    )
}

export default Todos