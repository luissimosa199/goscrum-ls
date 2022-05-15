import React from 'react';

// CSS
import './Login.style.css';

// DEPENDENCIES
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios'
import { swal } from '../../utils/swal';

// VARIABLES DE ENTORNO
const { REACT_APP_API_ENDPOINT } = process.env

const Login = () => {

  const navigate = useNavigate();

  // FORMIK
  const initialValues = {
    userName: '',
    password: '',
  }

  const required = '* Campo requerido'

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, 'Debe tener al menos 4 caracteres')
      .required(required),
    password: Yup.string().required(required),
  })

  const onSubmit = () => {

    axios.post(`${REACT_APP_API_ENDPOINT}auth/login`, {
      userName: values.userName,
      password: values.password,
    }, {
      headers: {
        'content-type': 'application/json'
      }
    }).then(data => {

      if (data.status === 200) {
        localStorage.setItem('token', data?.data?.result?.token)
        localStorage.setItem('userName', data?.data?.result?.user.userName)
        navigate('/', { replace: true })
      } else {
        alert('malas credenciales')
      }

    }).catch((err) => {

      swal()
    
    })
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit })

  const { handleSubmit, handleChange, errors, values, touched, handleBlur, } = formik;

  return (
    <div className="auth d-flex flex-column">
      <h1 className="fs-24">Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>

        <label className="fs-15" htmlFor="email">Nombre de usuario</label>
        <input name="userName" type="text" value={values.userName} onChange={handleChange} onBlur={handleBlur} />
        {errors.userName && touched.userName && <div className="text-danger small fs-14">{errors.userName}</div>}

        <label className="fs-15" htmlFor="password">Contraseña</label>
        <input name="password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
        {errors.password && touched.password && <div className="text-danger small fs-14">{errors.password}</div>}

        <button className="btn btn-primary fs-15" type="submit">Entrar</button>
      </form>
      <Link to="/register" className="fs-15 register_anchor">Registrarme</Link>
    </div>
  );
}

export default Login;