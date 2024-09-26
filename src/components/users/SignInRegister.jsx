import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userAction";

const SignInRegister = () => {
    const {isLoading, error} = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
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

        const resultAction = await dispatch(login(values))

        if (login.fulfilled.match(resultAction)) 
        {
            navigate('/');

        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
    <div className="container d-flex justify-content-between align-items-center py-5">
        <section className="col-md-5 p-4 border rounded">
            <h1 className="title mb-3">Sign In</h1>
            <span className="sub-title d-block mb-4">Sign in to access your account</span>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="email" className="form-control" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Sign in</button>
                <p className="forgot-password mt-3">
                    <a href="/auth/forgot-password">Forgotten your password?</a>
                </p>
            </form>
        </section>
        <section id="register" className="col-md-5 p-4">
            <h1 className="title mb-3">New User?</h1>
            <span className="sub-title d-block mb-4">Creating an account is easy. By registering, you will be able to:</span>
            <ul className="list-unstyled">
                <li className="mb-2">Check out faster with your saved details</li>
                <li className="mb-2">Discover our new collections, receive news from the maison.</li>
                <li className="mb-2">Manage your profile and preferences</li>
            </ul>

            <a href="/auth/create" className="btn btn-outline-dark btn-block">Create an account</a>
        </section>
    </div>
)}

export default SignInRegister