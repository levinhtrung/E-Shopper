import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

function ProductDetail() {
    let params = useParams();
    const [prodDetail, setProd] = useState({});
    const [imgDetail, setImg] = useState();
    const [selectedImg, setSelectedImg] = useState("");

    useEffect(() => {
        axios.get("http://web1.test/laravel8/public/api/product/detail/" + params.id)
            .then(res => {
                console.log(res);
                setProd(res.data.data);
                setImg(res.data.data.image);

                const images = JSON.parse(res.data.data.image);
                if (images.length > 0) {
                    setSelectedImg(images[0]);
                }
            })
            .catch(error => console.log(error));
    }, [params.id]);

    function renderSale() {
        if (prodDetail.status === 0) {
            return (
                <p><b>Condition:</b> Sale {prodDetail.sale}%</p>
            );
        } else {
            return (
                <p><b>Condition:</b> New</p>
            );
        }
    }

    function renderSmall() {
        if (imgDetail) {
            const images = JSON.parse(imgDetail);
            return images.map((value, key) => (
                <Link
                    to="#"
                    key={key}
                    onClick={() => setSelectedImg(value)} // Cập nhật state khi bấm
                >
                    <img
                        style={{ width: "84px", height: "84px", cursor: "pointer" }}
                        src={"http://web1.test/laravel8/public/upload/product/" + prodDetail.id_user + "/" + value}
                        alt="Thumbnail"
                    />
                </Link>
            ));
        }
    }

    function renderImg() {
        if (selectedImg) {
            return (
                <div className="view-product">
                    <img
                        src={"http://web1.test/laravel8/public/upload/product/" + prodDetail.id_user + "/" + selectedImg}
                        alt="Selected"
                    />
                    <Link to="#" rel="prettyPhoto"><h3>ZOOM</h3></Link>
                </div>
            );
        }
    }

    function renderData() {
        return (
            <div className="col-sm-7">
                <div className="product-information">
                    <h2>{prodDetail.name}</h2>
                    <p>Web ID: {prodDetail.id}</p>
                    <span>
                        <span>US ${prodDetail.price}</span>
                        <label>Quantity:</label>
                        <input type="text" defaultValue={3} />
                        <button type="button" className="btn btn-fefault cart">
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                        </button>
                    </span>
                    <p><b>Availability:</b> In Stock</p>
                    {renderSale()}
                    <p><b>Brand:</b> E-SHOPPER</p>
                </div>
            </div>
        );
    }

    return (
        <div className="col-sm-9 padding-right">
            <div className="product-details">
                <div className="col-sm-5">
                    {renderImg()}
                    <div id="similar-product" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="item active">
                                {renderSmall()}
                            </div>
                        </div>
                        <Link to="#" className="left item-control" data-slide="prev">
                            <i className="fa fa-angle-left" />
                        </Link>
                        <Link to="#" className="right item-control" data-slide="next">
                            <i className="fa fa-angle-right" />
                        </Link>
                    </div>
                </div>
                {renderData()}
            </div>
        </div>
    );
}

export default ProductDetail;
