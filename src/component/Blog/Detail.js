import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Comment from "./Comment"
import Rate from "./Rate"
import ListComment from "./ListComment"

function Detail(props) {
    let params = useParams()

    const [setData, getData] = useState('')
    const [dataCmt, setDataCmt] = useState({})
    const [getIDuser, setID] = useState("")
    useEffect(() => {
        axios.get('http://web1.test/laravel8/public/api/blog/detail/' + params.id)
        .then(res => {
            getData(res.data.data)
            setDataCmt(res.data.data.comment)
        })
        .catch(error => console.log(error))
    }, [params.id])

    function getCmt(data) {
        let cmt = dataCmt.concat(data.data)
        setDataCmt(cmt)
    }
    function getID(data) {
        setID(data)
        // console.log(data);
    }
    function renderData(){
        return (
            <div className="single-blog-post">
                <h3>{setData.title}</h3>
                <div className="post-meta">
                    <ul>
                        <li><i className="fa fa-user" /> Mac Doe</li>
                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <span>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-half-o"></i>
                    </span>
                </div>
                <Link to="#">
                    <img src={`http://web1.test/laravel8/public/upload/Blog/image/${setData.image}`} alt="" />
                </Link >
                <p>
                    {setData.description}
                </p>
            </div>
        )
    }
    return (
        <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    <div className="single-blog-post">
                        {renderData()}
                        <div className="pager-area">
                            <ul className="pager pull-right">
                                <li><Link  to="#">Pre</Link ></li>
                                <li><Link  to="#">Next</Link ></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Rate></Rate>
                <div className="socials-share">
                    <Link to=""><img src="../../images/blog/socials.png" alt="" /></Link>
                </div>
                <ListComment getID={getID} UserComment={dataCmt}></ListComment>
                <Comment IDuser={getIDuser} getCmt={getCmt}></Comment>
            </div>
    )
}
export default Detail