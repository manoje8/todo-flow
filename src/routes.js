import { Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./components/home/Home";
import Error404 from "./components/Error404";
import CreateAccount from "./components/users/CreateAccount";
import ForgotPassword from "./components/users/ForgotPassword";
import SignInRegister from "./components/users/SignInRegister";
import ResetPassword from "./components/users/ResetPassword";

const AppRoutes = () => (
    <App>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/auth/login" element= {<SignInRegister />} />
            <Route path="/auth/create" element= {<CreateAccount />}/>
            <Route path="/auth/forgot-password" element= {<ForgotPassword />}/>
            <Route path="/auth/reset-password" element= {<ResetPassword />}/>
            <Route path="*" element={<Error404 />}/>
        </Routes>
    </App>
)

export default AppRoutes