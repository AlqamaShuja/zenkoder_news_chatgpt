import React, { useState } from 'react'
// import { Form, Input, Button, Radio } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Slices/auth.slice';
import { ClipLoader } from "react-spinners";
import { useEffect } from 'react';
import { TextField, Box, FormControl, InputLabel, OutlinedInput, FilledInput, InputAdornment, IconButton, Button, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomizedSnackbars from '../utils/Notification';
import ErrorHandler from '../utils/ErrorHandler';





const SignUp = () => {
  // const [form] = Form.useForm();
  // const [requiredMark, setRequiredMarkType] = useState('optional');
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState({ msg: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
  });
  
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPass: '' });
  
  const validate = (name, value) => {
    let temp = { ...errors }
    if(name === 'name'){
      temp["name"] = value.length < 5 ? "Name must be atleast of five digits": "";
    }
    else if(name === 'email'){
      if(value.length === 0){
        temp["email"] = "Email is required";
      }
      else if(!(/$^|.+@.+..+/).test(value)){
        temp["email"] = "Must be a valid Email";
      }
      else {
        temp["email"] = "";
      }
    }
    else if(name === 'password'){
      temp["password"]  = value.length < 5 ? "Password must be atleast of 5 character" : "";
    }
    else if(name === 'confirmPass'){
      temp["confirmPass"] = value !== inputValue?.password ? "Password must be same" : "";
    }
    setErrors({ ...temp });
  }
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = async (e) => {
      setInputValue({ ...inputValue, [e.target.name]: e.target.value });
      validate(e.target.name, e.target.value);
    };

    const onSubmit = (e) => {
      e.preventDefault();
      setLoader(true);
      console.log(inputValue);
      dispatch(registerUser(inputValue)).unwrap().then(x => {
        setLoader(false);
        setMessage({ msg: "Successfully Registered", type: "success"});
        setTimeout(()=>{
          setMessage(false);
          navigate("/");
        }, 2000);
      }).catch(err => {
        const e = ErrorHandler(err, "signup");
        setMessage({ msg: e, type: 'error' });
        console.log(err);
        setLoader(false);
      });
    };


  return (
    <div className='flex justify-center min-h-screen items-center'>
      <div className='w-[90%] flex flex-col p-4 md:flex-row h-full overflow-y-hidden'>
          <div className="md:px-8 flex flex-col justify-center items-center w-full md:ml-12 md:w-[50%] p-4 bg-white shadow-lg shadow-gray-400 rounded-xl">
              <div className='text-blue-600 font-bold text-3xl mb-3'>LOGO</div>
              <p className='font-bold text-lg mb-1'>Sign up</p>
              <p className='max-w-[300px] text-gray-500 text-sm text-center mb-1'>Please enter your information to Create account.</p>
              <div className="w-full md:w-[90%] flex flex-col items-center">
              <form onSubmit={onSubmit} className="flex flex-col items-center w-[80%]">
                  <FormControl fullWidth sx={{ mt: 2 }} style={{ maxWidth: '340px' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                    <OutlinedInput
                      required
                      id="outlined-adornment-name"
                      name="name"
                      onChange={handleChange}
                      value={inputValue.name}
                      // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Name"
                    />
                  </FormControl>
                  <span className='text-red-600 text-xs'>{errors?.name ? errors?.name : ""}</span>
                  <FormControl fullWidth sx={{ mt: 2 }} style={{ maxWidth: '340px' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                      required
                      id="outlined-adornment-email"
                      name="email"
                      type='email'
                      onChange={handleChange}
                      value={inputValue.email}
                      // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Amount"
                    />
                  </FormControl>
                  <span className='text-red-600 text-xs'>{errors?.email ? errors?.email : ""}</span>
                  <FormControl fullWidth sx={{ mt: 2 }} style={{ maxWidth: '340px'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      required
                      name="password"
                      onChange={handleChange}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>{setShowPassword(!showPassword)}}
                            value={inputValue.password}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <span className='text-red-600 text-xs'>{errors?.password ? errors?.password : ""}</span>
                  <FormControl fullWidth sx={{ mt: 2 }} style={{ maxWidth: '340px'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-cpassword">Confirm Password</InputLabel>
                    <OutlinedInput
                      required
                      id="outlined-adornment-cpassword"
                      name="confirmPass"
                      onChange={handleChange}
                      type={'password'}
                      value={inputValue.confirmPass}
                      label="Confirm Password"
                    />
                  </FormControl>
                  <span className='text-red-600 text-xs'>{errors?.confirmPass ? errors?.confirmPass : ""}</span>
                  <FormControl fullWidth sx={{ mt: 2 }} style={{ maxWidth: '340px'}} variant="outlined">
                    <Button type='submit' sx={{ height: '50px', mt: '0px' }} disableElevation color='primary'
                      disabled={errors?.email || errors?.password || errors?.name || errors?.confirmPass || inputValue.name.length===0 || inputValue.email.length===0 || inputValue.password.length===0 || inputValue.confirmPass.length===0 } 
                      variant="contained" onClick={onSubmit}>
                        Submit
                        {loader && <span className='ml-4 mt-2'><CircularProgress size="24" color="inherit" /></span>}
                    </Button>
                  </FormControl>
              </form>
                <div className='flex items-center mt-3 mb-4 justify-center text-center'>
                    Already have an account? 
                    <Link to="/"
                        className="ml-2 block text-sm text-decoration-none text-bkue-700 cursor-pointer font-bold text-blue-600 hover:text-blue-800"
                      >Signin</Link>
                </div>
              </div>
          </div>
          <div className="relative w-full md:w-[50%] md:order-first h-auto bg-blue-600 rounded-xl mt-7 md:mt-0 flex flex-col justify-center items-center p-4">
              <div className='flex justify-center w-full'>
                  <img src={'./assets/signup.png'} alt="Login" className='h-[200px] w-[230px] md:w-[490px] md:h-[360px]' />
              </div>
              <h2 className='text-white text-center mt-10 mb-2'>lOREIPSUM</h2>
              <p className='text-white text-center'>Please enter your login information to sign in to your account.</p>
              <div className='absolute -bottom-8 -left-10'>
                  <svg className='w-[250px] h-[200px] md:w-[376px] md:h-[350px]' viewBox="0 0 376 410" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.2791 120.251C80.26 197.217 67.7562 307.483 53.6316 352.995C155.112 199.958 86.0876 66.5573 38.8905 18.9869L17.2791 120.251Z" fill="white" fillOpacity="0.08"/>
                      <path d="M116.647 114.781C148.383 209.033 97.7374 307.774 68.4478 345.364C217.442 238.035 199.985 88.8528 172.633 27.6779L116.647 114.781Z" fill="white" fillOpacity="0.08"/>
                      <path d="M196.772 215.121C180.758 292.196 106.673 339.391 71.6326 353.355C216.333 339.625 264.07 230.738 269.851 178.011L196.772 215.121Z" fill="white" fillOpacity="0.08"/>
                      <path d="M231.885 290.34C189.78 350.117 109.213 362.989 74.1931 361.953C202.589 403.675 283.476 328.496 307.87 285.692L231.885 290.34Z" fill="white" fillOpacity="0.08"/>
                  </svg>
              </div>
          </div>
      </div>
      { message.msg && <CustomizedSnackbars msg={message.msg} severity={message.type} openX={true} />}
    </div>
  )
}

export default SignUp;