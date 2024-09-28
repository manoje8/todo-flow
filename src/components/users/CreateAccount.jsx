import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from "../utils/Spinner"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../redux/userAction"


const CreateAccount = () => {
    const {isLoading, error} = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        firstName:"",
        lastName: "",
        email: "",
        password: ""
    })

    const handleChange = ({target: {name, value}}) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const resultAction = await dispatch(register(values))

        if (register.fulfilled.match(resultAction)) {
            // If registration is successful, navigate to the login page
            navigate('/auth/login');
        }
}

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-fluid">
            <section className="col-md-5 p-4 border rounded">
                <h1 className="title mb-3">Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" className="form-control" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input name="email" type="email" className="form-control" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" className="form-control" onChange={handleChange} required/>
                    </div>
                    {!isLoading ? 
                    <button type="submit" className="btn btn-primary btn-block mt-3" >Create an account</button> 
                    :
                    <Spinner buttonName={"Create an account"}/>
                    }
                    <a className="btn btn-link mt-3" href="/auth/login">Back to Login</a>
                </form>
            </section>
        </div>
)}

export default CreateAccount