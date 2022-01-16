import React, { useEffect, useState } from 'react'
import { Grid, Typography, IconButton, InputAdornment, makeStyles, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import * as actionAuth from '../Redux/auth/action'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { useLocation, Redirect, Link } from 'react-router-dom'
import { ReactComponent as BlueBorder } from '../Assets/blueBorder.svg'
import { validateLogin } from '../Components/Reusables/validationFunctions'
import TextInputUnit from '../Components/Reusables/TextInputUnit'
import { FilledButton } from '../Styles/mainStyles'
import { SET_LOADING_INDICATOR_AUTH, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../Redux/auth/constants'
import axios from 'axios'
const Login = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
  //const location = useLocation()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [validationResult, setValidationResult] = useState(false)

  const twoFactAuth = useSelector((state) => state.auth.twoFactAuth)
  const loadingIndicator = useSelector((state) => state.auth.loadingIndicator)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const sm = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token !== null) {
      alert('hey')
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      dispatch({ type: LOGIN_SUCCESS, payload: { token: localStorage.getItem('token') } })

      return <Redirect to='/research' />
    } else {
      return
    }
  }, [])

  const handleChangeInputs = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    validateLogin({ [e.target.name]: e.target.value }, errors, setErrors, validationResult, setValidationResult)
  }

  const handleLogin = () => {
    dispatch(actionAuth.login(form.username, form.password))
  }

  const handlePressEnter = (e) => {
    if (e.key === 'Enter' && form.username !== '' && form.password !== '') {
      handleLogin()
    }
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  if (twoFactAuth.token !== null || twoFactAuth.deviceId !== null) {
    return <Redirect to={'verification'} />
  }

  if (isAuthenticated) {
    return <Redirect to='/research' />
  }

  return (
    <Grid container justifyContent='center' className={classes.modalContainer}>
      <Grid item xs={11} className={sm ? classes.desktopLoginContainer : classes.mobileLoginContainer}>
        <Grid container justifyContent='center'>
          <Grid
            item
            xs={12}
            // sm={5}
            // lg={4}
            className={classes.paddingOfGrid}
            //  className={classes.loginGridPadding}
          >
            <Grid container justifyContent='center'>
              <BlueBorder />
              <Grid item xs={12}>
                <Grid container justifyContent='center'>
                  <Grid item className={classes.paddingTitle}>
                    <Typography variant='h6' className={classes.portalTitle}>
                      Research
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} className={classes.marginTop5px}>
                <Grid container justifyContent='center'>
                  <Grid item>
                    <Typography
                      //   variant="subtitle3"
                      className={classes.logTitle}
                    >
                      Please log into your account
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.paddingBottom16px}>
                <TextInputUnit
                  id='data-cy-login-username'
                  className={classes.textFieldStyle}
                  label='Username'
                  name='username'
                  value={form.username || ''}
                  onChange={handleChangeInputs}
                  error={errors.username}
                  inputProps={{
                    style: {
                      fontSize: 14,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12} className={classes.paddingBottom8px}>
                    <TextInputUnit
                      id='data-cy-login-password'
                      className={classes.textFieldStyle}
                      label='Password'
                      name='password'
                      value={form.password || ''}
                      onChange={handleChangeInputs}
                      error={errors.password}
                      type={showPassword ? 'text' : 'password'}
                      inputProps={{
                        style: {
                          fontSize: 14,
                        },
                      }}
                      onKeyDown={(e) => {
                        handlePressEnter(e)
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton className={classes.endAdornmentButton} aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} className={classes.forgotStyle}>
                      <Link to='/companies/contract' className={classes.linkStyle}>
                        Forgot Password
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent='center'>
                  <Grid item xs={12} className={classes.center}>
                    <FilledButton
                      id='loginBtn'
                      varint='outlined'
                      onClick={handleLogin}
                      disabled={!validationResult}
                      className={classes.logIn}
                      //   disabled={form.username === "" || form.password === ""}
                    >
                      {loadingIndicator ? <CircularProgress size={30} className={classes.circularProgress} /> : <Typography>Log in</Typography>}
                    </FilledButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login
const useStyles = makeStyles((theme) => ({
  modalContainer: {
    backgroundColor: '#fff',
    width: '30vw',
    position: 'absolute',
    top: '15vh',
    left: '35vw',
    height: "'535px",
    flexDirection: 'column',
    alignItems: 'center',
    // paddingLeft: "60px",
    padding: '57px 67px 5px 49px',
    borderRadius: '8px',
    boxShadow: '0px 8px 24px #0018581F',
  },
  textFieldStyle: {
    borderColor: '#A5AFC233',
    width: '100%',
    '& .MuiOutlinedInput-input': {
      padding: '10.6px',
    },
    '& .MuiInputBase-input': {
      fontFamily: 'inter',
      fontSize: '14px',
      borderRadius: '8px',
      '&::placeholder': {
        color: '#868DA2',
        opacity: 1,
      },
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#A5AFC233',
    },
    '& .makeStyles-textFieldStyle-3 .MuiInputBase-input': {
      paddingRight: '24px',
    },
    '& .MuiOutlinedInput-adornedEnd': {
      padding: 0,
    },
  },
  logIn: {
    textTransform: 'capitalize',
    fontSize: '15px',
    height: '40px',
    width: '130px',
    position: 'sticky',
    top: 0,
    textAlignLast: 'center',
    '& .MuiButton-root': {
      padding: 0,
    },
    '& .MuiButton-text': {
      padding: 0,
    },
  },
  passwordText: {
    '& .MuiIconButton-root': {
      padding: 0,
    },
  },
  paddingOfGrid: {
    padding: '48px 125px 32px 125px',
  },
  paddingTitle: {
    padding: '16px 0 8px 0',
  },
  portalTitle: {
    color: '#0F0F0F',
    fontSize: '24px',
    fontWeight: 400,
    fontFamily: 'Inter',
  },
  logTitle: {
    paddingBottom: '77px',
    color: '#868DA2',
    fontSize: '14px',
    fontFamily: 'inter',
  },
  paddingBottom16px: {
    paddingBottom: '16px',
  },
  paddingBottom8px: {
    paddingBottom: '8px',
  },
  forgotStyle: {
    textAlign: 'end',
    paddingBottom: '135px',
    color: '#0F0F0F',
  },
  linkStyle: {
    color: '#0F0F0F',
    fontFamily: 'inter',
    fontSize: '14px',
  },
  center: {
    textAlignLast: 'center',
  },
  loginBtn: {},
}))
