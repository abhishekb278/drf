import {React,useRef,useState} from 'react';
import './App1.css';
import { NavLink ,browserHistory } from 'react-router-dom'


function Signup_form() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [res, setRes] = useState({});

    
    function SignupForm(e){
        e.preventDefault();
        
        const main_body={
            username:username,
            email:email,
            password:password,
            password2:password2
        }
        const send_data = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(main_body)
        };
        fetch('http://127.0.0.1:8000/signup/', send_data)
        .then(response => response.json())
        .then(data => {
            setRes(data)
            setTimeout(function(){ 
                if(data.Sign_Up=='registration done successfully'){
                    console.log('yo');
                    window.location.href="/"
                }
             }, 3000);
        });
    }

    return (
      <>
        <div className="signup-form">
            <form onSubmit={SignupForm}>
                <h2>
                <img src="https://assets.website-files.com/5c75b94c8dd1ae50d3b9294b/5d48831280adb734a5db5620_hukglfkfklk%3B.png" width="300" alt=""/>
                </h2>
                <p>Please fill in this form to create an account!</p>
                <hr/>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <span className="fa fa-user"></span>
                            </span>                    
                        </div>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" name="username" placeholder="Username" required="required"/>
                    </div>
                    {<p style={{color:'red'}}>{res.username}</p>}
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-paper-plane"></i>
                            </span>                    
                        </div>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" name="email" placeholder="Email Address" required="required"/>
                    </div>
                    {<p style={{color:'red'}}>{res.email}</p>}
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-lock"></i>
                            </span>                    
                        </div>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" name="password" placeholder="Password" required="required"/>
                    </div>
                    {<p style={{color:'red'}}>{res.password}</p>}
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-lock"></i>
                                <i className="fa fa-check"></i>
                            </span>                    
                        </div>
                        <input type="password" onChange={(e) => setPassword2(e.target.value)} className="form-control" name="password2" placeholder="Confirm Password" required="required"/>
                    </div>
                    {<p style={{color:'red'}}>{res.password2}</p>}
                    {<p style={{color:'red'}}>{res.non_field_errors}</p>}
                    {<p style={{color:'green'}}>{res.Sign_Up}</p>}
                </div>
                <div className="form-group">
                    <label className="form-check-label"><input type="checkbox" required="required"/> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                </div>
                <div className="form-group">
                    <button type="submit"  className="btn btn-primary btn-lg">Sign Up</button>
                </div>
            </form>
            <div className="text-center">Already have an account? 
            <NavLink to="/" className="text-primary">Login here</NavLink></div>
        </div>
      </>
    );
  }

export default Signup_form;