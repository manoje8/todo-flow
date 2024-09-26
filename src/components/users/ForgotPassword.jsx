import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner"
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/userAction";

const ForgotPassword = () => {
    const {isLoading, error} = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');

    const handleChange = ({target: {value}}) => {
        setEmail(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const resultAction = await dispatch(forgotPassword(email))

        if (forgotPassword.fulfilled.match(resultAction)) {
            // If registration is successful, navigate to the login page
            navigate('/auth/login');
        }
    }

    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5">Error: {error}</div>;
    }

    return (
        <div className="container-fluid">
            <section className="col-md-5 p-4 border rounded">
                <form onSubmit={handleSubmit}>
                    <h3 className="title mb-3">Reset Password</h3>
                    <span className="sub-title mb-">Enter your email and we will send details on how to reset your password.</span>
                    <div className="form-group">
                        <input type="email" className="form-control mt-3" placeholder="Registered email address" onChange={handleChange} required/>
                    </div>
                    
                    {!isLoading ? 
                    <button type="submit" id="reset-button mt-3" className="btn btn-info btn-block">Send password reset link</button> 
                    :
                    <Spinner buttonName={"Send password reset link"}/>
                    }
                    
                    <a className="btn btn-link mt-3" href="/auth/login">Back to Login</a>
                </form>
            </section>
        </div>
)}

export default ForgotPassword