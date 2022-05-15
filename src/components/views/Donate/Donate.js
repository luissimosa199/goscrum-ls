import './Donate.style.css';
import { Link } from 'react-router-dom';

const Donate = () => {

    return (
        <main className="donate">
            <section>
                <h1>Colaborá con el proyecto</h1>
                <div className="donate_links">
                    <a href="https://mpago.la/2rrzY8B" target="_blank" rel="noopener noreferrer">
                        Donar
                    </a>
                    <Link to="/">Volver</Link>
                </div>
            </section>
        </main>
    );
}

export default Donate;