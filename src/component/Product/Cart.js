import axios from "axios"
import { useEffect, useState } from "react"

function Cart() {
    const [getCart, setCart] = useState([])
    useEffect(()=>{
        axios.post("http://web1.test/laravel8/public/api/product/cart")
        .then(res => {
            console.log(res);
        })
        .catch(error => (error))
    })
}
export default Cart