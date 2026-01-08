import { useState } from "react";

import SingUpPage from "./SingUpPage";
import Login from "./Login"

export default function Content() {
 const [Toggle,setToggle] = useState('false');
 const [Toggle2,setToggle2] = useState('false');

const singUp = ()=>{
     setToggle('true');
      let loginId = document.getElementById("login-btn");
      loginId.disabled = true;
};
const singUpCancel = ()=>{
     setToggle('false');
     let loginId = document.getElementById("login-btn");
     loginId.disabled = false;
    
};
const login = ()=>{
     setToggle2('true');
      let singUpId = document.getElementById("singUp-btn");
     singUpId.disabled = true;
  
};
const loginCancel = ()=>{
     setToggle2('false');
      let singUpId = document.getElementById("singUp-btn");
      singUpId.disabled = false;
};





 

  return (
    
    <div className='content'>
        <div className="hero md:mr-15 sm:grid sm:grid-cols-4 mt-15 px-5 sm:mt-25 sm:px-10">
        <div className="text md:ml-2 sm:col-span-3">
            <h1 className="text-4xl font-medium sm:text-7xl pb-5 ">Chat.io</h1>
        <p className="sm:max-w-100 md:max-w-180 md:text-lg">
            Real-time, secure messaging built for fast and seamless conversations.Connect with friends instantly, see whoʼs online, and chat without delays — powered by modern web technologies.
          </p>
       <div className="btn">

    
         
          {Toggle == 'true'?<SingUpPage singUpCancel={singUpCancel}/> : ""}
          {Toggle2 == 'true'?<Login loginCancel={loginCancel}/> : ""}




        <button id="singUp-btn" onClick={singUp}  className="bg-orange-400 p-2 px-7 disabled:cursor-not-allowed mt-5 cursor-pointer rounded-lg text-sm text-red-50">SignUp</button>
        <span className="px-2"> or </span>
        <button id="login-btn" onClick={login} className="bg-orange-500 disabled:cursor-not-allowed p-2 px-7 mt-5 rounded-lg cursor-pointer text-sm text-blue-50">login</button>
       </div>
        </div>
        <div className="logo">
            <img src="../src/assets/logo.png" alt="logo png error" className="h-96 sm:h-70 sm:w-64 md:w-100 md: "/>
        </div>
       </div>
    </div>
  )
}
