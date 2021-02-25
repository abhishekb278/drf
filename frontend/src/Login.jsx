import {React,useState} from 'react';
import './App.css';
import { NavLink } from 'react-router-dom'
import axios from 'axios';

function Login_form() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [res, setRes] = useState({});

    function loginForm(e){
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/login/', {
            email:email,
            password:password,
          })
          .then((response) => {
            setRes(response.data)
            console.log(response.data.user_info)
            if(response.data.login=='Done'){
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('user_info',response.data.user_info.id)
                localStorage.setItem('user_name',response.data.user_info.username)
                window.location.href="/Feed_Feed"
            }
          });
    }
    return (
      <>
        <div className="container login-page">
            <div className="row">
                <div className="col-sm-4">

                </div>
                <div className="col-sm-4">
                    <h1 className="text-center login-title">
                        <img src="https://assets.website-files.com/5c75b94c8dd1ae50d3b9294b/5d48831280adb734a5db5620_hukglfkfklk%3B.png" width="300" alt=""/>
                    </h1>
                    <div className="account-wall">
                        <img className="profile-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png" alt=""/>
                        <form className="form-signin" onSubmit={loginForm}>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" required />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required/>
                        {<p style={{color:'red'}}>{res.non_field_errors}</p>}
                        
                        <button className="mybtn" type="submit">
                            Login</button>
                        <label className="checkbox pull-left">
                            <input type="checkbox" className="text-dark" value="remember-me"/>
                            Remember me
                        </label>
                        <br/>
                        <a href="#" className="pull-right need-help">Frogot Password </a><span className="clearfix"></span>
                        </form>
                    </div>
                    <NavLink to="/signup" className="text-center new-account">Create an account </NavLink>
                </div>
                <div className="col-sm-4">
                    
                </div>
            </div>
        </div>
      </>
    );
  }

export default Login_form;