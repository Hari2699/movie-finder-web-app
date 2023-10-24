import React from 'react'
import './SignIn.module.css'
import backround from './imdb-image.png';



function SignIn() {
  return (
    <div className="main">

      <div className='logo'>
          <img src={backround}/>
      </div>
      
      <div className="login">
        <h1>SIGN IN</h1>
    
       
    <div className='username'>


      <div className='input'>

            <input type="username" placeholder="username"/>
  
      </div>
    </div>

    <div className='password'> 
        <div className='input'>
          <input type = "password" placeholder="password"/>
        </div>
    </div>

     
        <div> 


          <div>
            <button className='btn-link-container'>
              <a className="btn-link" href="/">SIGN IN</a>  
            </button>
           </div>
          
         
           <div>
            <button className='btn-link-container'>
              <a className="btn-link" href="/Signup">SIGNUP</a>  
            </button>
           </div>
          
          

        </div>
      </div>
{
   
  }
</div>


  )
}

export default SignIn
