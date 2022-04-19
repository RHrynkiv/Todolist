import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {useFormik} from "formik";
import {loginTC} from "../state/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import { Navigate } from 'react-router-dom';
import {Header} from "../AppWithReducers";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = () => {


    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 2) {
                errors.password = 'Invalid password';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })
    if(isLoggedIn){
        return <Navigate to={"/"}/>
    }
    return <div>
            <Header/>
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in</p>
                            <p>use common account credentials:</p>
                            <p>Email: rgrinkiv030924@gmail.com</p>
                            <p>Password: 2417131</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} onBlur={formik.handleBlur}/>
                            {formik.touched.email&&formik.errors.email ? <div style={{color:'red'}}>{formik.errors.email}</div>:null}
                            <TextField type="password" label="Password"
                                       margin="normal" {...formik.getFieldProps('password')} onBlur={formik.handleBlur}
                            />
                            {formik.touched.password&&formik.errors.password ? <div style={{color:'red'}}>{formik.errors.password}</div>:null}
                            <FormControlLabel label={'Remember me'} control={<Checkbox onChange={formik.handleChange}
                                                                                       checked={formik.values.rememberMe}
                                                                                       name="rememberMe"/>}/>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                            <div style={{textAlign: "center", opacity: "50%", padding: "5px 0 0 0"}}>Don't forget to turn on VPN</div>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    </div>
}

