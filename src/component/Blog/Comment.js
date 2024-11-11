import axios from "axios"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"

function Comment(props){
    let idBlog = useParams()
    let idReply = props.IDuser
    
    const [getComment, setComment] = useState("")
    const [errors, setErrors] = useState("")
    let checkUser = JSON.parse(localStorage.getItem('authData'));

    function handleInput(e) {
        setComment(e.target.value)
    }

    function checkLogin(e){
        let userData = JSON.parse(localStorage.getItem("userData"))
        if(checkUser){
            let accessToken = userData.token
            let url =  "http://web1.test/laravel8/public/api/blog/comment/" + idBlog.id
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };
            if(getComment === ""){
                setErrors("vui long comment")
            }else{
                const formData = new FormData()
                formData.append('id_blog', idBlog.id);
                formData.append('id_user', userData.Auth.id);
                formData.append('id_comment', idReply ? idReply : 0);
                formData.append('comment', getComment);
                formData.append('image_user', userData.Auth.avatar);
                formData.append('name_user', userData.Auth.name);
                axios.post(url,formData, config)
                .then(res => {
                    console.log(res);
                    props.getCmt(res.data)
                    setErrors("")
                })
                .catch(error => console.log(error))
            }
        } else{
            alert("Vui long dang nhap")
        }
    }
    return (
        <div className="replay-box">
            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a replay</h2>
                    <div className="text-area">
                    <div className="blank-arrow">
                        <label>Your Name</label>
                    </div>
                    <span>*{errors}</span>
                    <textarea name="message" value={getComment} onChange={handleInput} rows={11} defaultValue={""} />
                    <Link to="" onClick={checkLogin} className="btn btn-primary" >post comment</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Comment