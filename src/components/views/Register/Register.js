// HOOKS
import { useState, useEffect } from 'react';

// DEPENDENCIES
import { useFormik } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// VARIABLE DE ENTORNO
const { REACT_APP_API_ENDPOINT } = process.env


const Register = () => {

    const [data, setData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${REACT_APP_API_ENDPOINT}auth/data`)
            .then((res) => {
                setData(res.data.result)
            })
    }, []);

    // FORMIK
    const initialValues = {
        userName: '',
        email: '',
        password: '',
        switch: false,
        teamID: '',
        role: '',
        continent: '',
        region: '',
    }

    const required = '* Campo requerido'

    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .min(4, 'Debe tener al menos 4 caracteres')
            .required(required),
        email: Yup.string().email('Debe ser un email válido').required(required),
        password: Yup.string().required(required),
        // teamID: Yup.string().required(required),
        role: Yup.string().required(required),
        continent: Yup.string().required(required),
        region: Yup.string().required(required),
    })

    const handleChangeContinent = value => {
        setFieldValue('continent', value)
        if (value !== 'America') setFieldValue('region', 'Otro')
    }

    const onSubmit = () => {
        const teamID = !values.teamID ? uuidv4() : values.teamID

        axios.post(`${REACT_APP_API_ENDPOINT}auth/register`, {
            user: {
                userName: values.userName,
                password: values.password,
                email: values.email,
                teamID,
                role: values.role,
                continent: values.continent,
                region: values.region
            }
        }, {
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(data => 
            {
                navigate('/registered/' + data?.data?.result?.user?.teamID, {
                replace: true,
            })}
        )
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit })

    const { handleSubmit, handleChange, errors, values, touched, handleBlur, setFieldValue } = formik;

    return (
        <div className="container auth">
            <h1 className="fs-24">Registro</h1>
            <form onSubmit={handleSubmit}>
                <label className="fs-15" htmlFor="userName">Nombre de usuario</label>
                <input
                    name="userName"
                    type="text"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={(errors.userName && touched.userName) ? 'input_error' : ''}
                />
                {errors.userName && touched.userName && <div className="text-danger small">{errors.userName}</div>}

                <label className="fs-15" htmlFor="email">Email</label>
                <input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={(errors.email && touched.email) ? 'input_error' : ''}
                />
                {errors.email && touched.email && <div className="text-danger small">{errors.email}</div>}

                <label className="fs-15" htmlFor="password">Contraseña</label>
                <input
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={(errors.password && touched.password) ? 'input_error' : ''}
                />
                {errors.password && touched.password && <div className="text-danger small">{errors.password}</div>}

                <div className="form-check form-switch mt-2">
                    <label htmlFor="teamIDswitch" className="form-check-label fs-12">Perteneces a un equipo ya creado</label>
                    <input
                        type="checkbox"
                        name="teamIDswitch"
                        id="teamIDswitch"
                        className="form-check-input"
                        value={values.switch}
                        onChange={() => {
                            formik.setFieldValue('switch', !formik.values.switch)
                        }}
                    />
                </div>

                {values.switch && <>
                    <label className="fs-15" htmlFor="teamID">Por favor, introduce el identificador de equipo</label>
                    <input id="teamID" type="text" name="teamID" value={values.teamID} onChange={handleChange} />
                </>}

                <label className="fs-15" htmlFor="role">Rol</label>
                <select
                    name="role"
                    id="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={(errors.role && touched.role) ? 'fs-12 input_error' : 'fs-12'}
                >
                    <option value="">Seleccionar rol</option>
                    {data?.Rol?.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
                {errors.role && touched.role && <div className="text-danger small">{errors.role}</div>}

                <label className="fs-15" htmlFor="role">Continent</label>
                <select
                    name="continent"
                    id="continent"
                    value={values.continent}
                    onChange={event => handleChangeContinent(event.currentTarget.value)}
                    onBlur={handleBlur}
                    className={(errors.continent && touched.continent) ? 'fs-12 input_error' : 'fs-12'}
                >
                    <option value="">Seleccionar continente</option>
                    {data?.continente?.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
                {errors.continent && touched.continent && <div className="text-danger small">{errors.continent}</div>}

                {

                    (values.continent === 'America' &&
                        <>
                            <label className="fs-15" htmlFor="region">Rol</label>
                            <select
                                name="region"
                                id="region"
                                value={values.region}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={(errors.region && touched.region) ? 'input_error' : ''}
                            >
                                <option value="">Seleccionar región</option>
                                {data?.region?.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                            {errors.region && touched.region && <div className="text-danger small">{errors.region}</div>}
                        </>)}

                <button className="btn btn-primary register_submit" type="submit">Enter</button>
                <Link to="/login" className="fs-15 login_anchor">Ir a iniciar sesión</Link>
            </form>
        </div>
    );
}

export default Register;