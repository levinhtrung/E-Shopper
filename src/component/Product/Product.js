import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function Product() {
    const [products, setProduct] = useState('')
    let userData = JSON.parse(localStorage.getItem("userData"))
    
    let accessToken = userData.token;
    
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
    useEffect(()=>{
        axios.get("http://web1.test/laravel8/public/api/user/my-product",config)
        .then(res => {
            console.log((res));
            setProduct(res.data.data)
        })
        .catch(error => (error))
    },[])
    function renderProduct(){
        if (Object.keys(products).length > 0) {
            return Object.keys(products).map((key, index) => {
                const img = JSON.parse(products[key]['image'])    
              return (
                <tbody key={key}>
                  <tr>
                    <td className="cart_id">
                      {products[key]['id']}
                    </td>
                    <td className="cart_description">
                      {products[key]['name']}
                    </td>
                    <td style={{borderTop: "none"}} className="cart_product">
                      <Link to="">
                        <img style={{width: "120px", height: "70px"}} src={"http://web1.test/laravel8/public/upload/product/" +products[key]['id_user']+"/"+img[0]}  alt=""/>
                      </Link>
                    </td>
                    <td className="cart_price">
                      ${products[key]['price']}
                    </td>
                    <td className='cart_update'>
                      <Link to={"/account/my-product/update/" + products[key]['id']} id={products[key]['id']} className="btn btn-primary" style={{float: "left"}} >Update Product</Link>
                    </td>
                    <td style={{borderTop: "none"}} className="cart_delete">
                      <Link to="" id={products[key]['id']} className="cart_quantity_delete" style={{background: "#FE980F"}} ><i id={products[key]['id']} className="fa fa-times" /></Link>
                    </td>
                  </tr>
                </tbody>
              )
            })
          }
    }
    return(
        <section id="cart_items">
            <div className="container">
                <div className="table-responsive cart_info">
                <table style={{ width: "75%" }} className="table table-condensed">
                    <thead>
                    <tr className="cart_menu">
                        <td className="ID">ID</td>
                        <td className="Name">Name</td>
                        <td className="image">Image</td>
                        <td className="price">Price</td>
                        <td className="quantity">Update</td>
                        <td className="Action">Delete</td>
                        <td />
                    </tr>
                    </thead>
                    {renderProduct()}
                </table>
                <Link to="/account/create-product" className="btn btn-primary" style={{float: "right"}} >Add News Product</Link>
                </div>
            </div>
        </section>
    )
}

export default Product