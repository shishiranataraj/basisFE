import   React, {useEffect, useState} from 'react';
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
import {login, token} from "../../features/userSlice";
import {useNavigate} from 'react-router-dom';
import { setRef } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingOverlay from 'react-loading-overlay';
const theme = createTheme();
 function Login() {
 
  const [res, setRes] = useState({});
  const [isLoading, setLoading] = useState(false);
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
    
    const auth = { email: data.get('email') };
    authenticator(auth);
   console.log(res);
    if(res?.isLogin === true ) {
     dispatch(login({
      name: data.get('email'),
      email: data.get('email'),
      password: data.get('password'),
      loggedIn: true,
      
    }))
  }
    else {
      if(res?.isLogin === false ) {
      toast.error("Enter valid credentials")
      dispatch(token({
       token: res.token
        
      }))
      navigate('/signup')
    }
  }
 
  };

  const authenticator = async (auth) => {
    try {
     
        const resp = await axios.post('https://hiring.getbasis.co/candidate/users/email', auth) || null;
        console.log(resp);
        if(resp !== null){  
        const { data } = resp;
         setRes(data.results);
         setLoading(false);
        }
       
         return;

    } catch (err) {
        // Handle Error Here
        console.error(err);
    }

};

  return (
    <ThemeProvider theme={theme}>
     <LoadingOverlay
        active={isLoading}
        spinner
        text='Loading your content...'
        >
      </LoadingOverlay>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          
          </Box>
        </Box>
      
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default Login;