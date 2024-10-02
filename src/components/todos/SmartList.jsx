import { useEffect } from "react"
import { useSelector } from "react-redux"
import { getWeek } from "../utils/dateFormater"

// Todo: seperate component for smart List
const SmartList = () => {
    const {notes, isLoading, error} = useSelector(state => state.todos)
    const { smartList } = useSelector(state => state.actions)

    useEffect(() => {

        const getSmartList = {
            all: () => notes,
            today: () => notes.filter(todo => getWeek(todo.date) === getWeek(new Date())),
            completed: () => notes.filter(todo => todo.status === true),
            events: () => notes.filter(todo => todo.location.length > 0),
            default: () => notes,
        };

        const getSmartlistKey = () => {
            if  (smartList.all) return 'all';
            if (smartList.today) return 'today';
            if (smartList.completed) return 'completed';
            if (smartList.events) return 'events';
        }

        const key = getSmartlistKey(smartList)
        const listValue = getSmartList(key)
        console.log(listValue);
        
    },[notes, smartList])


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="smartList">

        </div>
    )
}

export default SmartList