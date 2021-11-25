import   React, {useEffect,useRef, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {login} from "../../features/userSlice";
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import { setToken } from '../../features/userSlice'
const theme = createTheme();
 function Signup() {
    const token = useSelector(setToken);
    console.log(token);
    const valueVerify = useRef('') ;
    const valueEmail = useRef('') ;
    const valueName = useRef('');
    const [res, setRes] = useState({});
    const [getOtpStatus , setGetOtpStatus] = useState(0); 
    const [ref, setRef] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const auth = { 
    firstName: valueName.current.value, 
    email: valueEmail.current.value, 
    referredCodeKey: "MAYANK",
    agreeToPrivacyPolicy: true,
    token: token?.token,
    source: "WEB_APP" };

    axios.post('https://hiring.getbasis.co/candidate/users', auth)
        .then(response => setRes(response.success));
        console.log(res);
        if(ref ){
            if(res && ref ) {
                dispatch(login({
                 name: valueName.current.value ,
                 email: valueEmail.current.value,
                 password: data.get('password'),
                 loggedIn: true
               }))
        }
        else{
            if(res ) {
                dispatch(login({
                 name: valueName.current.value ,
                 email: valueEmail.current.value,
                 password: data.get('password'),
                 loggedIn: true
               }))
        }
       
    navigate('/')

  }
}
  else{
    toast.error("Please check all the fields")
    
  }
 
  };   
 
  const handleVerifyEmail = (event) => {
    event.preventDefault();
    const auth = { 
        email: valueEmail.current.value, 
        token: token?.token,
        verificationCode : valueVerify.current.value};
        console.log(auth);
        axios.put('https://hiring.getbasis.co/candidate/users/email/verify', auth)
        .then(response => setRes(response?.data?.success ));
        console.log(res);
        if(res === true) {
    setGetOtpStatus(1);
     dispatch(login({
      name: valueEmail.current.value,
      email:valueEmail.current.value,
      password: '',
      loggedIn: true,
        
    }))
   
  } 
  
}
  const valueRef = useRef('') ;
  
    const sendValue = (event) => {
        event.preventDefault();
       console.log(valueRef.current.value)
 
        if(valueRef.current.value === 'MAYANK') {
         axios.get('https://hiring.getbasis.co/candidate/users/referral/MAYANK')
        .then(response => setRef(response.data.success));
        console.log(ref);
        toast.success("Refferal Validated")
        }
        else {
            setRef(false);
            toast.error("Refferal code entered in invalid.")
        }

    }




  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline /> 
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              inputRef={valueName} 
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="Email"
              inputRef={valueEmail} 
              autoComplete="email"
              autoFocus
            />
            {ref === false ? (
            <div>
                <TextField
                    margin="normal"
                    fullWidth
                    name="refferal"
                    label="Refferal Code"
                    inputRef={valueRef} 
                    id="refferal"
                />
                <Button
                
                    fullWidth
                    variant="contained"
                    onClick={(e)=>sendValue(e)}
                    sx={{ mt: 3, mb: 2 }}
                >
                Validate Refferal Code
                </Button>
            </div>
            ): ( '')}
           
          
           
            {getOtpStatus === 0 ? (<TextField
              margin="normal"
              fullWidth
              name="verify"
              label="Enter OTP"
              inputRef={valueVerify} 
              id="verify"
              />): ( '')}
        
           {getOtpStatus === 0 ? (<Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleVerifyEmail(e)}
            >
             VALIDATE OTP
            </Button>) : (<Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
             
            >
            Sign UP
            </Button>)}  
           
          </Box>
        </Box>
      
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
    </ThemeProvider>
  );
}

export default Signup;