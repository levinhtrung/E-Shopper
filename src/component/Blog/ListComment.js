import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function ListComment(props){
    const [cmtList, setcmtList] = useState(props.UserComment)
    useEffect(()=>{
        setcmtList(props.UserComment)
    },[props.UserComment])
    function Replay(e){
        let IDuser = e.target.id
        props.getID(IDuser)
    }
    function renderData(){
        if(cmtList && cmtList.length > 0 ){
            return cmtList.map((value,key) => {
                if (value.id_comment == 0) {
                    return (
                        <>
                            <li key={key} className="media" >
                                <Link to="" className="pull-left">
                                    <img style={{ width: "40px", height: "40px" }} src={"http://web1.test/laravel8/public/upload/user/avatar/" + value.image_user} alt='Avatar' />
                                </Link>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user" />{value.name_user}</li>
                                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                    </ul>
                                    <p>{value.comment}</p>
                                    <Link to="" onClick={Replay} id={value.id} className="btn btn-primary"><i className="fa fa-reply" />Replay</Link>
                                </div>
                            </li>
                            {cmtList.map((value2, key2) => {
                                if (value.id == value2.id_comment) {
                                    return (
                                        <li key={key2} index={key2} className="media second-media">
                                            <Link to="" className="pull-left" >
                                                <img style={{ width: "40px", height: "40px" }} src={"http://web1.test/laravel8/public/upload/user/avatar/" + value.image_user} alt='Avatar' />
                                            </Link>
                                            <div className="media-body">
                                                <ul className="sinlge-post-meta">
                                                    <li><i className="fa fa-user" />{value2.name_user}</li>
                                                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                                </ul>
                                                <p>{value2.comment}</p>
                                                <Link to="" onClick={Replay} id={value2.id} className="btn btn-primary" ><i className="fa fa-reply" />Replay</Link>
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                        </>
                    )
                }
            })
        }
    }
    return(
        <div className="response-area">
            <h2>3 RESPONSES</h2>
            <ul className="media-list">
                {renderData()}            
            </ul>					
        </div>
    )
}
export default ListComment