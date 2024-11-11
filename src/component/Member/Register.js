import { useState } from "react"
import Errors from './Errors'
import axios from "axios"
function Register(){
    const [Inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: "",
    })
    const [errors, setErrors] = useState({})
    const [getAvatar, setAvatar] = useState("")
    const [selectFile, setFile] = useState("");

    const handleInput = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setInputs(state => ({...state, [nameInput]:value}))
    }

    const validateFile = ["png","jpg","jpeg","PNG","JPG"]

    function IsEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            return false;
        }
        else {
            return true;
        }
    }

    function handleFile(e){
        const file = e.target.files

        let reader = new FileReader()
        reader.onload = (e) => {
            setAvatar(e.target.result)
            setFile(file[0])
        }
        reader.readAsDataURL(file[0])
    }
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if(Inputs.name === ""){
            errorSubmit.name = "vui long nhap name";
            flag = false;
        }
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
        if(Inputs.phone === ""){
            errorSubmit.pass = "vui long nhap phone";
            flag = false;
        }
        if(Inputs.address === ""){
            errorSubmit.address = "vui long nhap address";
            flag = false;
        }
        if(selectFile === ""){
            errorSubmit.file = "vui long chon file";
            flag = false;
        } else {
            let getSize = selectFile.size;
            let getName = selectFile.name;
            let fileExtension = getName.split('.').pop().toLowerCase()
            console.log(getSize)

            if(getSize > 1024 * 1024){
                errorSubmit.file = "Ảnh có kích thước lớn"
                flag = false;
            }
            if(!validateFile.includes(fileExtension)){
                errorSubmit.file = "Dinh dang file khong hop le"
                flag = false;
            }
        }
        if(!flag){
            setErrors(errorSubmit)
        } else {
            const data ={
                name: Inputs.name,
                email: Inputs.email,
                password: Inputs.pass,
                phone: Inputs.phone,
                address: Inputs.address,
                avatar: getAvatar,
                level: 0
            }
            console.log(data)
            axios.post('http://web1.test/laravel8/public/api/register', data)
            .then(res => {
                if(res.data.errors){
                    setErrors(res.data.errors)
                } else {
                    console.log(data);
                    alert("Thanh cong")
                }
            })
        }
    }

    return(
        <div className="col-sm-4">
            <div className="signup-form">
                <h1>Register</h1>
                <Errors errors = {errors}></Errors>
                <form onSubmit={handleSubmit}>
                    <h5>Name</h5>
                    <input type="text" placeholder="Name" name="name" onChange={handleInput}></input>
                    <h5>Emai</h5>
                    <input type="text" placeholder="Email" name="email" onChange={handleInput}></input>
                    <h5>Password</h5>
                    <input type="password" placeholder="Password" name="pass" onChange={handleInput}></input>
                    <h5>Phone</h5>
                    <input type="number" placeholder="Phone" name="phone" onChange={handleInput}></input>
                    <h5>Address</h5>
                    <input type="text" placeholder="Address" name="address" onChange={handleInput}></input>
                    <h5>Avatar</h5>
                    <input type="file" name="file" enctype="multipart/form-data" onChange={handleFile}></input>
                    <button type="submit" className="btn">Register</button>
                </form>
            </div>
        </div>
        
    )
}
export default Register