import {React,useState,useEffect} from 'react';
import { Button,Modal } from 'react-bootstrap';
import './App3.css';

const url_="http://127.0.0.1:8000";
const token=localStorage.getItem('token')
const u_id=localStorage.getItem('user_info')
const user_id=localStorage.getItem('user_info')

function I_nav(){
    function logout(){
        const token=localStorage.getItem('token')
        fetch("http://127.0.0.1:8000/logout/", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization:"Token "+token,
            }
          }
        )
          .then(res => res.json())
          .then(
            (result) => {
                if(result.logout=='Done'){
                    localStorage.setItem('token',null)
                    window.location.href="/"
                }
            }
          )
    }
    const [avatar,SetAvatar]=useState()
    function load_(){
        fetch(url_+"/user/"+u_id+"/", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization:"Token "+token,
            }
        })
        .then(res=>res.json())
        .then((data) => {
            console.log(data.avatar)
            SetAvatar(data.avatar) 
        })
    }
    useEffect(() => {
        load_()
    })

    function upload(e){
        
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        const main_data={
            method:"PATCH",
            headers :{
                Authorization:"Token "+token,
            },
            body:formData
        }
        fetch(url_+"/user/"+u_id+"/",main_data)
        .then(response => response.json())
        .then(status => {
            console.log(status)
            window.location.reload(false)
        })
    }
    return(
        <>
        <div className="container mb-5">
            <nav className="navbar navbar-expand-lg p-1 navbar-light bg-light">
                <a className="navbar-brand" href="#">
                <i class="fa fa-instagram" aria-hidden="true" style={{fontSize:'55px'}}></i>
                </a>
                
                <a className="navbar-brand" href="#">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="" width="150" />
                </a>
                
                
                    <ul className="navbar-nav">
                    <li className="nav-item mx-2">
                        <div className="nav-link">
                        Welcome {localStorage.getItem('user_name')}
                        </div>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link" style={{cursor:'pointer'}}>
                        <div className="circle">
                            <img src={avatar} className="circle_img"/>
                            <input type="file" onChange={(e) => upload(e)} class="custom-file-input"/>
                        </div>
                        </a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link" href="#">
                            <i className="fa fa-heart-o" style={{fontSize:'35px'}}></i>
                        </a>
                    </li>
                    <li className="nav-item mx-2">
                        <a className="nav-link" onClick={logout}>
                            <i className="fa fa-sign-out" style={{fontSize:'35px'}}></i>
                        </a>
                    </li>

                    </ul>
                
            </nav>
        </div>
        </>
    );
}

function I_feed2(){
    const [File, setFile] = useState({'name':'No File Selected'});
    const [Message, setMessage] = useState(" ");

    function post_it(e){
        const token = localStorage.getItem('token')
        if(token!=null){
            const user_id = localStorage.getItem('user_info')
            const formData = new FormData();
            formData.append('postby',parseInt(user_id));
            formData.append('File', File);
            formData.append('pdata', Message);
            console.log(formData)
            const main_data={
                method:"POST",
                headers :{
                    Authorization:"Token "+token,
                },
                body:formData
            }
            fetch("http://127.0.0.1:8000/post/",main_data)
            .then(response => response.json())
            .then(status => {
                console.log(status)
            })
        }
    }
    return(
        <>
        <div className="col-4">
        <div class="formBox">
				<form onSubmit={post_it}>
						<div class="row">
							<div class="col-sm-12">
								<h1>Post Here</h1>
							</div>
						</div>

						<div class="row">
							<div class="col-sm-12">
								<div class="inputBox ">
                                    <textarea className="textarea" onChange={(e) => setMessage(e.target.value)} cols="30" rows="35" required></textarea>
								</div>
							</div>
                            <div className="col-sm-12">
                            <div class="file is-danger has-name is-boxed">
                            <label class="file-label">
                                <input class="file-input" type="file" onChange={(e) => setFile(e.target.files[0])} name="resume" required/>
                                <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fa fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Choose Your Upload ...
                                </span>
                                </span>
                                <span class="file-name">
                                    {File.name}
                                </span>
                            </label>
                            </div>
                            </div>
						</div>

						<div class="row">
							<div class="col-sm-12">
								<input type="submit" name="" class="button" value="Share Post"/>
							</div>
						</div>
				</form>
			</div>
        </div>
        </>
    )
}

function Feed_Feed(){
    const [data, setdata] = useState({});
    const [load, setLoad] = useState(false);

    const token=localStorage.getItem('token')
    const user_id=localStorage.getItem('user_info')
    const u_id=localStorage.getItem('user_info')
    const [cmt, setcmt] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/post/"+user_id+"/", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization:"Token "+token,
            }
          }
        )
          .then(res => res.json())
          .then(
            (result) => {
              setdata(result);
              setLoad(true);
            }
          )
      }, []
    )
    function All(){
        fetch("http://127.0.0.1:8000/post/"+user_id+"/", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization:"Token "+token,
            }
          }
        )
          .then(res => res.json())
          .then(
            (result) => {
              setdata(result);
              setLoad(true);
            }
          )
    }
    function likeit(post_id){
        fetch("http://127.0.0.1:8000/like/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization:"Token "+token,
            },
            body:JSON.stringify({
                u_id:u_id,
                p_id:post_id,
                like:true,
            })
          }
        )
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
                All()
            }
          )
    }
    function del_like(post_id){
        fetch("http://127.0.0.1:8000/like/"+u_id+"/"+post_id, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Authorization:"Token "+token,
            }
          }
        )
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
                All()
            }
          )
    }
    function post_comment(post_id){
        fetch("http://127.0.0.1:8000/com/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization:"Token "+token,
            },
            body:JSON.stringify({
                Comments:cmt,
                c_p_id:post_id,
                c_u_id:u_id
            })
          }
        )
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
                All()
            }
          )
    }

    if(load==true){
        return(
            <>
            
            <I_nav/>
            <div className="container bg-light p-2">
                <div className="row">
                    <div className="col-8">
                        <div className="fbox">
                            <ul>
                            {
                            data.map(props => (
                                <div key={props.pid}>
                                <div className="box">
                                    <div className="head">
                                        <div className="circle">
                                            <img src={url_+props.your_user[0].avatar} className="circle_img"/>
                                        </div>
                                        <div className="title">
                                            {props.your_user[0].username}
                                        </div>
                                    </div>
                                    <div className="main">
                                        {props.File.split(".")[props.File.split(".").length-1]=="mp4"?
                                            <video className="video_" src={url_+props.File} controls></video>:
                                            <img className="img_" src={url_+props.File} alt=""/>
                                        }
                                        
                                    </div>
                                    <div className="social">
                                        <ul className="social-in">
                                            <li>
                                                <a className="nav-link">
                                                {
                                                    !props.like[0]? 
                                                    <i className="fa fa-heart-o" onClick={() => likeit(props.pid)} style={{fontSize:'25px'}}></i>
    
                                                    : 
                                                    <i className="fa fa-heart" onClick={() => del_like(props.pid)} style={{fontSize:'25px',color:'red'}}></i>
                                                }
                                                <i>{props.counts}</i>
                                                </a>
                                            </li>
                                            <li>
                                                <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-comments-o" style={{fontSize:'25px'}}></i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control" placeholder="Comment" onChange={(e)=>setcmt(e.target.value)}/>
                                                <button class="input-group-text btn btn-primary" id="basic-addon1" onClick={()=>post_comment(props.pid)}>
                                                    <i className="fa fa-paper-plane" style={{fontSize:'25px'}}></i>
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="data">
                                    {props.your_user[0].username}:<span>
                                        {props.pdata}
                                        </span>
                                    <hr/>
                                    {!props.comment[0]?
                                    <i></i>
                                    :
                                    <i>{
                                        props.comment.map(i=>(
                                            <>
                                            <i>{i.c_u_id} : {i.Comments}</i><br/>
                                            </>
                                        ))
                                        }</i>
                                    }   
                                    </div>
                                </div>
                                </div>
                                
                            ))}
                            
                            </ul>
                        </div>
                    </div>
                    <I_feed2/>
                </div>
            </div>
            </>
        )
    }
    else{
        return(
            <>
            <h4>
            Unauthorized Access
            </h4>
            </>
        )
    }
}

export default Feed_Feed;