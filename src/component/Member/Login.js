import { useState } from "react"
import Errors from "./Errors"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login(props){
    const navigate = useNavigate()
    const [Inputs, setInputs] = useState({
        email: "",
        pass: "",
    })
    const [errors, setErrors] = useState({})

    const handleInput = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setInputs(state => ({...state, [nameInput]:value}))
    }

    function IsEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            return false;
        }
        else {
            return true;
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if(Inputs.email === ""){
            errorSubmit.email = "vui long nhap email";
            flag = false;
        }else if(IsEmail(Inputs.email) === false){
            errorSubmit.email = "Email khong hop le";
            flag = false;
        }
        if(Inputs.pass === ""){
            errorSubmit.pass = "vui long nhap pass";
            flag = false;
        }
        if(!flag){
            setErrors(errorSubmit)
        } else {
            const data = {
                email: Inputs.email,
                password: Inputs.pass,
                level: 0
            }
            axios.post('http://web1.test/laravel8/public/api/login', data)
            .then(res => {
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else {
                    console.log(res);
                    const auth = true
                    localStorage.setItem("userData",JSON.stringify(res.data))
                    localStorage.setItem("authData",JSON.stringify(auth))
                    navigate('/')
                }
            })
            .catch(function(errors){
                console.log(errors);
            })
        }
    }
    return(
        <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">
                <h1>Login</h1>
                <Errors errors = {errors}></Errors>
                <form onSubmit={handleSubmit}>
                    <h5>Emai</h5>
                    <input type="text" placeholder="Email" name="email" onChange={handleInput}></input>
                    <h5>Password</h5>
                    <input type="password" placeholder="Password" name="pass" onChange={handleInput}></input>
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login