import { useEffect, useState } from "react"
import Errors from "./Errors"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Update() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [getAvatar, setAvatar] = useState("")
    const [selectFile, setFile] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: "",
    })
    
    useEffect(() => {
        let userData = localStorage.getItem("userData")
        if (userData) {
            userData = JSON.parse(userData);
            userData = userData.Auth
            
            setUser({
                name: userData.name,
                email: userData.email,
                address: userData.address,
                phone: userData.phone,
            });
        } else {
            alert("Vui lòng đăng nhập")
            navigate("/login")
        }
    }, [])
    const handleInput = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setUser(state => ({ ...state, [nameInput]: value }))
    }
    const validateFile = ["png", "jpg", "jpeg", "PNG", "JPG"]

    function handleFile(e) {
        const file = e.target.files

        let reader = new FileReader()
        reader.onload = (e) => {
            setAvatar(e.target.result)
            setFile(file[0])
        }
        reader.readAsDataURL(file[0])
    }
    function handleSubmit(e) {
        
        e.preventDefault();
        let userData = JSON.parse(localStorage.getItem("userData"))
        let errorSubmit = {};
        let flag = true;
        if (user.name === "") {
            errorSubmit.name = "vui long nhap name";
            flag = false;
        }
        if (user.pass === "") {
            errorSubmit.pass = "vui long nhap pass";
            flag = false;
        }
        if (user.phone === "") {
            errorSubmit.pass = "vui long nhap phone";
            flag = false;
        }
        if (user.address === "") {
            errorSubmit.address = "vui long nhap address";
            flag = false;
        }
        if (selectFile === "") {
            errorSubmit.file = "vui long chon file";
            flag = false;
        } else {
            let getSize = selectFile.size;
            let getName = selectFile.name;
            let fileExtension = getName.split('.').pop().toLowerCase()

            if (getSize > 1024 * 1024) {
                errorSubmit.file = "Ảnh có kích thước lớn"
                flag = false;
            }
            if (!validateFile.includes(fileExtension)) {
                errorSubmit.file = "Dinh dang file khong hop le"
                flag = false;
            }
        }
        let url = "http://web1.test/laravel8/public/api/user/update/" + userData.Auth.id
        let accessToken = userData.token;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }
        if (flag === true) {
            const formData = new FormData()
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('password', user.password);
            formData.append('phone', user.phone);
            formData.append('address', user.address);
            formData.append('avatar', getAvatar);
            formData.append('level', 0);
            axios.post(url, formData, config)
            .then(res => {
                setErrors("")
                alert("Update thanh cong")
                localStorage.setItem("userData", JSON.stringify(res.data))
            })
            .catch(error => console.log(error))
        } else {
            setErrors(errorSubmit)
        }
    }
    return (
        <div className="col-sm-4">
            <div className="signup-form">
                <h1>Update</h1>
                <Errors errors={errors}></Errors>
                <form onSubmit={handleSubmit}>
                    <h5>Name</h5>
                    <input type="text" placeholder="Name" value={user.name} name="name" onChange={handleInput}></input>
                    <h5>Emai</h5>
                    <input readOnly type="text" placeholder="Email" value={user.email} name="email" onChange={handleInput}></input>
                    <h5>Password</h5>
                    <input type="password" placeholder="Password" value={user.password} name="pass" onChange={handleInput}></input>
                    <h5>Phone</h5>
                    <input type="number" placeholder="Phone" value={user.phone} name="phone" onChange={handleInput}></input>
                    <h5>Address</h5>
                    <input type="text" placeholder="Address" value={user.address} name="address" onChange={handleInput}></input>
                    <h5>Avatar</h5>
                    <input type="file" name="file" enctype="multipart/form-data" onChange={handleFile}></input>
                    <button type="submit" className="btn">Update</button>
                </form>
            </div>
        </div>
    )
}
export default Update