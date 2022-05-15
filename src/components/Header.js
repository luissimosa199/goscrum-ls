import './Header.styles.css'

// HOOKS
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    // FUNCTIONS AND VARIABLES

    const navigate = useNavigate();

    // 

    const handleLogout = () => {
        localStorage.removeItem('logged')
        localStorage.removeItem('userName')
        navigate('/login', { replace: true })
    }

    // 

    const { tasks } = useSelector(state => {
        return state.tasksReducer
    })

    // 


    return (
        <header>
            <div>
                <img className="logo_img" src="/logo192.png" alt="react logo" />
            </div>
            <input type="checkbox" name="toggle_menu" id="toggle_menu" className="toggle_menu"/>
            <label className="toggle_menu_label" htmlFor="toggle_menu" ><img src="https://img.icons8.com/material-outlined/48/000000/menu--v1.png" /></label>
            <div className="logout d-flex">
                <button
                    className="btn btn-primary btn-sm btn_donar"
                    onClick={() => navigate("/donate", { replace: true })}
                >
                    Donar
                </button>
                <div className="fs-15">Tareas creadas: {tasks?.length}</div>
                <div className="user-name mx-2 fs-15">{localStorage.getItem('userName')}</div>
                <button className="logout_button fs-15" onClick={handleLogout} type="button">X</button>
            </div>
        </header>
    );
}

export default Header;