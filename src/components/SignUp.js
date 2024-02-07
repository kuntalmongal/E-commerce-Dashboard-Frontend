import React, { useState , useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate=useNavigate();
    const baseurl="https://e-comm-backend-vvf6.onrender.com";

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }
    )
    const collectData = async () => {
        console.warn(name, email, password);
      let result = await fetch(`${baseurl}/register`, {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        

        result = await result.json()
        console.warn(result);
        localStorage.setItem("user",result,JSON.stringify(result.result));
        localStorage.setItem("token",result,JSON.stringify(result.auth));
    
            navigate('/');

        

    }
    return (
        <div className="register">
            <h1 className="reg">Register</h1>
            <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />

            <input className="inputBox" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Email" />

            <input className="inputBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Passward"></input>
            <button className="appButton" type="button" onClick={collectData}
            >Sign Up</button>


        </div>
    )

}
export default SignUp;