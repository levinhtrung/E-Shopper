import axios from "axios";
import Errors from "../Member/Errors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateProduct() {
    let idProduct = useParams();
    let userData = JSON.parse(localStorage.getItem("userData"))
        
    let accessToken = userData.token;
    
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
    const [prod, setProd] = useState([])
    const [getImg, setImg] = useState([])
    const [dataImg, setImgdata] = useState({});
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [errors, setErrors] = useState({})
    const [selectFile, setFile] = useState("");
    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        status: 1,
        image: "",
        sale: 0,
        company: "",
        detail: ""
    })
    const validateFile = ["png","jpg","jpeg","PNG","JPG"]
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    }
    function hanldeFile(e) {
        const file = e.target.files;
        setFile(file);
    }
    useEffect(()=>{
        axios.get("http://web1.test/laravel8/public/api/category-brand")
        .then(res =>{
            // console.log(res)
            setCategory(res.data.category)
            setBrand(res.data.brand)
        })
        .catch(error => console.log(error))
    },[])
    useEffect(()=>{
        axios.get("http://web1.test/laravel8/public/api/user/product/" + idProduct.id, config)
        .then(res =>{
            console.log(res.data.data)
            setProd(res.data.data)
            setInputs({
                name: res.data.data.name,
                price: res.data.data.price,
                category: res.data.data.id_category,
                brand: res.data.data.id_brand,
                status: res.data.data.status,
                image: res.data.data.image,
                sale: res.data.data.sale,
                company: res.data.data.company_profile,
                detail: res.data.data.detail
            })
            setImgdata(res.data.data.image)
        })
        .catch(error => console.log(error))
    },[idProduct.id])
    function categoryData(){
        if(category.length > 0){
            return category.map((key ,index) => {
                return(
                    <option key={index} value={key.id}>{key.category}</option>
                )
            })
        }
    }
    function brandData(){
        if(brand.length > 0){
            return brand.map((key ,index) => {
                return(
                    <option key={index} value={key.id}>{key.brand}</option>
                )
            })
        }
    }
    function imgChecked(e){
        const data = e.target.id
        function check(getImg) {
            return getImg !== data
        }
        if(e.target.checked){
            setImg(state =>[...state,data])
        } else {
            if(getImg.includes(data)) {
                const result = getImg.filter(check)
                setImg(result)
            }
        }
    }
    function renderImgData(){
        if(dataImg.length > 0){
            return dataImg.map((value, key) => {
                return(
                    <li key={key} style={{float: "left", width: "50px", marginRight: "10px"}}>
                        <img style={{width: "120px", height: "70px", marginLeft: "-40px"}} src={"http://web1.test/laravel8/public/upload/product/" + prod.id_user + "/" + value} alt="" />
                        <input onClick={imgChecked} id={value} type="checkbox"></input>
                    </li>
                )
            })
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if(inputs.name === ""){
            errorSubmit.name = "vui long nhap name";
            flag = false;
        }
        if(inputs.price === ""){
            errorSubmit.price = "vui long nhap gia";
            flag = false;
        }
        if(inputs.category === ""){
            errorSubmit.category = "vui long chon loai san pham";
            flag = false;
        }
        if(inputs.brand === ""){
            errorSubmit.brand = "vui long nhap brand san pham";
            flag = false;
        }
        if(inputs.status === "0" && inputs.sale === ""){
            errorSubmit.sale = "vui long chon muc sale (>0) san pham";
            flag = false;
        }
        if(inputs.company === ""){
            errorSubmit.company = " Vui long chon nguon goc san pham"
            flag = false
        }
        if(inputs.detail === ""){
            errorSubmit.detail = " Vui long chon mo ta san pham"
            flag = false
        }
        if(selectFile === ""){
            errorSubmit.file = "vui long upload file";
            flag = false;
        } else {
            let getSize = selectFile[0].size;
            let getName = selectFile[0].name;
            let fileExtension = getName.split('.').pop().toLowerCase()
            
            if(getSize > 1024 * 1024){
                errorSubmit.file = "Ảnh có kích thước lớn"
                flag = false;
            }
            if(!validateFile.includes(fileExtension)){
                errorSubmit.file = "Dinh dang file khong hop le"
                flag = false;
            }
        }
        let userData = JSON.parse(localStorage.getItem("userData"))
        
        let url = "http://web1.test/laravel8/public/api/user/product/update/" + idProduct.id
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
            formData.append('name', inputs.name);
            formData.append('price', inputs.price);
            formData.append('category', inputs.category);
            formData.append('brand', inputs.brand);
            formData.append('company', inputs.company);
            formData.append('detail', inputs.detail);
            formData.append('status', inputs.status);
            formData.append('sale', inputs.sale);
            Object.keys(selectFile).map((key, index)=>{
                formData.append("file[]", selectFile[key])
            })
            Object.keys(getImg).map((key, index)=>{
                formData.append("avatarCheckBox[]", getImg[key])
            })
            axios.post(url, formData, config)
            .then(res => {
                // console.log(res);
                alert("Cap nhat thanh cong")
                setInputs({
                    name: res.data.data.name,
                    price: res.data.data.price,
                    category: res.data.data.id_category,
                    brand: res.data.data.id_brand,
                    status: res.data.data.status,
                    image: res.data.data.image,
                    sale: res.data.data.sale,
                    company: res.data.data.company_profile,
                    detail: res.data.data.detail
                })
                setErrors("")
            })
            .catch(error => console.log(error))
        } else {
            setErrors(errorSubmit)
        }
    }
    function renderSale(){
        if(inputs.status === "0"){
            return(
                <div>
                    <input style={{width: "100px", float: "left"}} type="text" name="sale" onChange={handleInput} value={inputs.sale}></input>
                    <span style={{width:"100px", padding:"9px 2px 0 5px" ,float: "left"}}>%</span>
                </div>
            )
        }
    }
    return(
        <div className="col-sm-4">
            <div className="signup-form">
                <h2>Update Product!</h2>
                <Errors errors={errors}></Errors>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={inputs.name} onChange={handleInput}></input>
                    <input type="text" name="price" placeholder="Price" value={inputs.price} onChange={handleInput}></input>
                    <select name="category" onChange={handleInput}>
                        <option value="">Please choice category</option>
                        {categoryData()}
                    </select>
                    <select name="brand" onChange={handleInput}>
                        <option value="">Please choice brand</option>
                        {brandData()}
                    </select>
                    <select name="status" value={inputs.status} onChange={handleInput}>
                        <option value="0">Sale</option>
                        <option value="1">New</option>
                    </select>
                    {renderSale()}
                    <input type="text" placeholder="Company profile" name='company' value={inputs.company} onChange={handleInput}/>
                    <input multiple type="file" name='file' onChange={hanldeFile} />
                    <ul>
                        {renderImgData()}
                    </ul>
                    <textarea placeholder="Detail" value={inputs.detail} name="detail" onChange={handleInput} />
                    <button type="submit" className="btn btn-default">Create</button>
                </form>
            </div>
        </div>
    )
}
export default UpdateProduct;