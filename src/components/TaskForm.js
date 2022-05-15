import '../index.css';

// DEPENDENCIES
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ postTasks }) => {

    // YUP
    const required = '* Campo requerido'

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(6, 'Debe tener al menos 6 caracteres')
            .required(required),
        status: Yup.string().required(required),
        importance: Yup.string().required(required),
        description: Yup.string().required(required)
    })

    // FORMIK
    const initialValues = {
        title: '',
        status: '',
        importance: '',
        description: ''
    }

    const onSubmit = (values) => {
        postTasks(values)
        resetForm()
        toast("tu tarea se creó")
    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit })

    const { handleSubmit, handleChange, errors, touched, handleBlur, values, resetForm } = formik;

    return (
        <section className="task-form">
            <span className="fs-24 m-2">Crear Tarea</span>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li className="task-form-li">
                        <input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            name="title"
                            placeholder="Título"
                            value={values.title}
                            className={(errors.title && touched.title) ? 'input_error' : ''}
                        />
                        {errors.title && touched.title && <span className="text-danger small">{errors.title}</span>}
                    </li>

                    <li className="task-form-li">
                        <select
                            className={(errors.status && touched.status) ? 'input_error' : ''}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="status"
                            id="status"
                            value={values.status}
                        >
                            <option value="">Seleccionar un estado</option>                           
                            <option value="NEW">Nueva</option>
                            <option value="IN PROGRESS">En Proceso</option>
                            <option value="FINISHED">Finalizada</option>
                        </select>
                        {errors.status && touched.status && <span className="text-danger small">{errors.status}</span>}
                    </li>
                    <li className="task-form-li">
                        <select
                            className={(errors.importance && touched.importance) ? 'input_error' : ''}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="importance" id="importance"
                            value={values.importance}
                        >
                            <option value="">Seleccionar una prioridad</option>
                            <option value="LOW">Baja</option>
                            <option value="MEDIUM">Media</option>
                            <option value="HIGH">Alta</option>
                        </select>
                        {errors.importance && touched.importance && <span className="text-danger small">{errors.importance}</span>}
                    </li>
                    </ul>

                    <div className="description-textarea">
                        <textarea
                            onChange={handleChange}
                            name="description"
                            id="description"
                            placeholder="Descripción"
                            onBlur={handleBlur}
                            className={(errors.description && touched.description) ? 'input_error' : ''}
                            value={values.description}
                        >

                        </textarea>
                        {errors.description && touched.description && <span className="text-danger small">{errors.description}</span>}
                    </div>
                
                <button type="submit" className="btn create_task_btn">Crear</button>
            </form>

            <ToastContainer />

        </section>
    );
}

export default TaskForm;