import axios from "axios"
import { useEffect, useState } from "react"
import React from "react"
import { Link } from "react-router-dom"

function Index() {
    const [getItem, setItem] = useState('')

    useEffect(() => {
        axios.get('http://web1.test/laravel8/public/api/blog')
            .then(response => {
                setItem(response.data.blog.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])



    function fetchData() {
        if (Object.keys(getItem).length > 0) {
            return getItem.map((value, key) => {
                return (
                    <div className="single-blog-post" key={key}>
                        <h3>{value.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user"></i> Mac Doe</li>
                                <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                            </ul>
                            <span>
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-half-o" />
                            </span>
                        </div>
                        <Link to={"/blog/detail/" + value.id}>
                            <img src={`http://web1.test/laravel8/public/upload/Blog/image/${value.image}`} alt="" />
                        </Link>
                        <p>{value.description}</p>
                        <Link to={"/blog/detail/" + value.id} className="btn btn-primary">Read More</Link>
                    </div>
                )
            })
        }
    }
    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {fetchData()}
            </div>
        </div>
    )
}

export default Index