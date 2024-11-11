import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

function Rate(props){
    let checkUser = JSON.parse(localStorage.getItem('authData'));
    let userData = JSON.parse(localStorage.getItem("userData"))
    let IDblog = useParams()
    const [rating, setRating] = useState(0)

    useEffect(() => {
        axios.get('http://web1.test/laravel8/public/api/blog/rate/' + IDblog.id)
        .then(res => {
            let sum = 0
            let ratings = res.data.data
            if(Object.keys(ratings).length > 0){
                Object.keys(ratings).map((index, key)=>{
                    sum+= ratings[key]["rate"]
                })
                sum = sum/Object.keys(ratings).length
                setRating(sum)
                // console.log(rating)
            }
        })
        .catch(error => console.log(error))
    }, [IDblog.id])
    function changeRating(newRating, name){
        if(!checkUser){
            alert("Vui long dang nhap")
        }else if(checkUser){
            
            
            let accessToken = userData.token
            let url =  "http://web1.test/laravel8/public/api/blog/rate/" + IDblog.id
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };
            const formData = new FormData()
            formData.append('blog_id', IDblog.id);
            formData.append('user_id', userData.Auth.id);
            formData.append('rate', newRating);
            axios.post(url,formData, config)
            
            .then(res => {
                setRating(newRating)
                console.log(res,'<<<<<');
            })
            .catch(error => console.log(error))
        }
    }
    
    return(
        <StarRatings
        rating={rating}
        starRatedColor="blue"
        changeRating={changeRating}
        numberOfStars={6}
        name='rating'></StarRatings>
    )
}
export default Rate