import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useDispatch, useSelector } from "react-redux";
import { downToCart, removeToCart, upToCart } from "../../reducers/hobby";

function Cart() {
    const [getCart, setCart] = useState([]);
    // const { updateQty } = useContext(UserContext);
    const dispatch = useDispatch()
    const items = useSelector(state => state.hobby.items)
    console.log(items);
    
    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('dataCart'));
        axios.post("http://web1.test/laravel8/public/api/product/cart", cart)
            .then(res => {
                console.log(res);
                setCart(res.data.data);
            })
            .catch(error => (error));
    }, []);
    
    function renderProd() {
        if (getCart.length > 0) {
            return getCart.map((value, key) => {
                let Total = value.price * value.qty;
                var myObject = JSON.parse(value.image);
                return (
                    <tr key={key}>
                        <td className="cart_product">
                            <Link to="">
                                <img style={{ width: "120px", height: "70px" }} src={"http://web1.test/laravel8/public/upload/product/" + value.id_user + "/" + myObject[0]} alt="" />
                            </Link>
                        </td>
                        <td className="cart_description">
                            <h4><Link to="">{value.name}</Link></h4>
                            <p>Web ID: {value.id}</p>
                        </td>
                        <td className="cart_price">
                            <p>${value.price}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                {/* <Link to="" onClick={UpQty} id={value.id} className="cart_quantity_up"> + </Link> */}
                                <Link to="" onClick={() => UpQty(value.id)} className="cart_quantity_up"> + </Link>
                                <input className="cart_quantity_input" type="text" name="quantity" value={value.qty} autoComplete="off" size={2} />
                                <Link to="" onClick={() => DownQty(value.id)}className="cart_quantity_down"> - </Link>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">${Total}</p>
                        </td>
                        <td className="cart_delete">
                            <Link to="" onClick={removeItem} id={value.id} className="cart_quantity_delete">
                                <i id={value.id} className="fa fa-times" />
                            </Link>
                        </td>
                    </tr>
                )
            });
        }
    }

    // function updateTotalQty(cart) {
    //     // console.log(cart);
    //     const totalQty = cart.reduce((total, item) => total + item.qty, 0);
    //     updateQty(totalQty);
    //     localStorage.setItem('totalQty', totalQty);
    // }

    function UpQty(id) {
        // let id = e.target.id;
        // let updatedCart = [...getCart];
        // let cart = JSON.parse(localStorage.getItem('dataCart')) || {};
        // if (updatedCart.length > 0) {
        //     updatedCart.map((value, key) => {
        //         if (id === String(value.id)) {
        //             updatedCart[key].qty++;
        //             cart[value.id] = updatedCart[key].qty;
        //         }
        //     });
        // }
        // setCart(updatedCart);
        // localStorage.setItem('dataCart', JSON.stringify(cart));
        // updateTotalQty(updatedCart);
        dispatch(upToCart(id))
    }

    function DownQty(id) {
        // let id = e.target.id;
        // let updatedCart = [...getCart];
        // let cart = JSON.parse(localStorage.getItem('dataCart')) || {};
        // if (updatedCart.length > 0) {
        //     updatedCart.map((value, key) => {
        //         if (id === String(value.id) && value.qty > 1) {
        //             updatedCart[key].qty--;
        //             cart[value.id] = updatedCart[key].qty;
        //         }
        //     });
        // }
        // setCart(updatedCart);
        // localStorage.setItem('dataCart', JSON.stringify(cart));
        // updateTotalQty(updatedCart);
        dispatch(downToCart(id))
    }

    function removeItem(id) {
        // let idDelete = e.target.id;
        // let updatedCart = [...getCart];
        // updatedCart = updatedCart.filter(item => item.id !== parseInt(idDelete));

        // setCart(updatedCart);

        // let localCart = JSON.parse(localStorage.getItem("dataCart")) || {};
        // delete localCart[idDelete];
        // localStorage.setItem("dataCart", JSON.stringify(localCart));

        // updateTotalQty(updatedCart);
        dispatch(removeToCart(id))
    }

    function cartTotal() {
        let tong = 0;
        if (getCart.length > 0) {
            getCart.forEach((value) => {
                let amount = value.qty * value.price;
                tong = tong + amount;
            });
        }
        return (
            <div className="col-sm-6">
                <div className="total_area">
                    <ul>
                        <li>Cart Sub Total <span>${tong}</span></li>
                        <li>Eco Tax <span></span></li>
                        <li>Shipping Cost <span>Free</span></li>
                        <li>Total <span>${tong}</span></li>
                    </ul>
                    <a className="btn btn-default update" href="#">Update</a>
                    <a className="btn btn-default check_out" href="#">Check Out</a>
                </div>
            </div>
        )
    }

    return (
        <>
            <section id="cart_items">
                <div className="breadcrumbs">
                    <ol className="breadcrumb">
                        <li><Link to="/home">Home</Link></li>
                        <li className="active">Shopping Cart</li>
                    </ol>
                </div>
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu">
                                <td className="image">Item</td>
                                <td className="description" />
                                <td className="price">Price</td>
                                <td className="quantity">Quantity</td>
                                <td className="total">Total</td>
                                <td />
                            </tr>
                        </thead>
                        <tbody>
                            {renderProd()}
                        </tbody>
                    </table>
                </div>
            </section>
            <section id="do_action">
                <div className="heading">
                    <h3>What would you like to do next?</h3>
                    <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="chose_area">
                            <ul className="user_option">
                                <li>
                                    <input type="checkbox" />
                                    <label>Use Coupon Code</label>
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <label>Use Gift Voucher</label>
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <label>Estimate Shipping &amp; Taxes</label>
                                </li>
                            </ul>
                            <ul className="user_info">
                                <li className="single_field">
                                    <label>Country:</label>
                                    <select>
                                        <option>United States</option>
                                        <option>Bangladesh</option>
                                        <option>UK</option>
                                        <option>India</option>
                                        <option>Pakistan</option>
                                        <option>Ucrane</option>
                                        <option>Canada</option>
                                        <option>Dubai</option>
                                    </select>
                                </li>
                                <li className="single_field">
                                    <label>Region / State:</label>
                                    <select>
                                        <option>Select</option>
                                        <option>Dhaka</option>
                                        <option>London</option>
                                        <option>Dillih</option>
                                        <option>Islamabad</option>
                                    </select>
                                </li>
                                <li className="single_field zip-field">
                                    <label>Zip Code:</label>
                                    <input type="text" />
                                </li>
                            </ul>
                            <a className="btn btn-default update" href="#">Get Quotes</a>
                        </div>
                    </div>
                    {cartTotal()}
                </div>
            </section>
        </>
    );
}

export default Cart;
