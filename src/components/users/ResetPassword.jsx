import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { resetPassword } from "../../redux/action/userAction"

const ResetPassword = () => {
    const {isLoading, error} = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        otp: "",
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handleChange = ({target: {name, value}}) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(values.newPassword !== values.confirmPassword)
        {
            console.log("Paddword doesn't match");
            return;
        }
        
        
        const resultAction = await dispatch(resetPassword(values))

        if (resetPassword.fulfilled.match(resultAction)) 
        {
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
                <h1 className="title">Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>OTP</label>
                        <input name="otp" className="form-control" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input name="email" type="email" className="form-control" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input name="newPassword" type="password" className="form-control" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input name="confirmPassword" type="password" className="form-control" onChange={handleChange} required/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" >Rest Password</button>
                </form>
            </section>
        </div>
    )
}

export default ResetPassword