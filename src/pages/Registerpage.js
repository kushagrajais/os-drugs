import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from '../components/Loader';
import { toast } from 'react-toastify';


function Registerpage() {
  const [email,setEmail ]= useState('');
  const [password,setPassword ]= useState('')
  const [cpassword,setcPassword ]= useState('')
  const [loading, setLoading]=useState(false)
  const auth = getAuth();
  const register =async()=>{
    try {
      setLoading(true)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      setLoading(false)
      toast.success ('Registration successfull')
      setEmail('')
      setPassword('')
      setcPassword('')
      
    } catch (error) {
      console.log(error)
      toast.error('Registration failed')
      setLoading(false)
    }
  }

  return (
    <div className='register-parent'>
      {loading && (<Loader/>)}
      <div className='register-top'>

      </div>
        <div className="row justify-content-center">
          <div className="col-md-5">
          <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_chdxojyo.json"  background="transparent"  speed="1"    loop autoplay></lottie-player>

          </div>
          <div className="col-md-4 z1">
            <div className="register-form">
              <h2>Register</h2>
              <hr />
              <input type="text" className='form-control' placeholder='Email' value={email} onChange={(e)=> { setEmail(e.target.value)}}/>
              <input type="password" className='form-control' placeholder='Password' value={password} onChange={(e)=> { setPassword(e.target.value)}}/>
              <input type="text" className='form-control' placeholder='Confirm Password' value={cpassword} onChange={(e)=> { setcPassword(e.target.value)}}/>

              <button className='my-3' onClick={register}>REGISTER</button>
              <hr />
            <a href="/login">Click Here To Login</a>
            </div>

          </div>
        </div>
        </div>
  )
}

export default Registerpage