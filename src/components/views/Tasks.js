// HOOKS
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

// COMPONENTS
import Card from "../Card";
import Header from "../Header";
import TaskForm from "../TaskForm";
import '../../index.css';
import './Tasks.styles.css';

// DEPENDENCIES
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import debounce from 'lodash.debounce';

import { getTasks, deleteTask, editTaskStatus, postNewTask } from '../../../src/store/actions/tasksActions';

const Tasks = () => {

    const [list, setList] = useState([])
    const [renderList, setRenderList] = useState([])
    const [cardsAuthor, setCardsAuthor] = useState('ALL')
    const [search, setSearch] = useState('')

    const dispatch = useDispatch();

    const renderCards = (status) => {
        return renderList
            .filter(e => e.status === status)
            .map(data =>
                <Card
                    key={data._id}
                    data={data}
                    deleteCard={handleDelete}
                    editCardStatus={handleEditCardStatus}
                />)
    }

    useEffect(() => {

        dispatch(getTasks(cardsAuthor === 'ME' ? 'me' : ''))

    }, [cardsAuthor]);

    const { loading, error, tasks } = useSelector(state => {
        return state.tasksReducer
    })

    useEffect(() => {
        if (tasks?.length) {
            setList(tasks)
            setRenderList(tasks)
        }
    }, [tasks]);

    useEffect(() => {
        if (search) {
            setRenderList(list.filter(data => data.title.toLowerCase().startsWith(search.toLowerCase())))
        } else {
            setRenderList(list)
        }
    }, [search]);

    const handleDelete = _id => dispatch(deleteTask(_id))

    const handleEditCardStatus = data => dispatch(editTaskStatus(data));

    const handlePostTasks = values => dispatch(postNewTask(values));

    if (error) return <div>Hay un error</div>

    const handleChangeImportance = (e) => {
        if (e.currentTarget.value === 'ALL') {
            setRenderList(list);
        } else {
            setRenderList(list.filter(data => data.importance === e.currentTarget.value))
        }
    }

    const handleSearch = debounce(e => {
        setSearch(e?.target?.value)
    }, 1000)

    return (
        <>
            <Header />
            <main id="tasks">
                <TaskForm postTasks={handlePostTasks} />
                <section className="wraper-list">

                    <div className="wraper-list-inner">
                        <h2 className="list_title m-2 fs-18s">Mis tareas</h2>

                        <div className="filter_form">


                            <fieldset>
                                <label className="radio_label mx-2 fs-12" onClick={() => { setCardsAuthor('ALL') }}>
                                    <input type="radio" name="group_filter" value="ALL" defaultChecked /> Todas
                                </label>

                                <label className="radio_label mx-2 fs-12" onClick={() => { setCardsAuthor('ME') }}>
                                    <input type="radio" name="group_filter" value="ME" /> Mis tareas 
                                </label>
                            </fieldset>

                            <fieldset>
                                <input
                                    type="text"
                                    placeholder="Seleccionar por título..."
                                    onChange={handleSearch}
                                />

                            </fieldset>

                            <fieldset>
                                <select
                                    name="filter"
                                    id="filter"
                                    className=""
                                    onChange={handleChangeImportance}
                                >
                                    <option value="ALL">Todas</option>
                                    <option value="LOW">Baja</option>
                                    <option value="MEDIUM">Media</option>
                                    <option value="HIGH">Alta</option>
                                </select>
                            </fieldset>
                        </div>


                        <div className="list_container w-100">

                            {!renderList?.length ? <div className="list_empty">No hay tareas para mostrar</div> :
                                loading ?
                                    <>
                                        <Skeleton height={90} />
                                        <Skeleton height={90} />
                                        <Skeleton height={90} />
                                    </> :
                                    <>
                                        {renderCards('NEW').length > 0 && <ul className="list w-100">
                                            <h3 className="m-1 fs-15">Nuevas</h3>
                                            {renderCards('NEW')}
                                        </ul>}

                                        {renderCards('IN PROGRESS').length > 0 && <ul className="list w-100">
                                            <h3 className="m-1 fs-15">En Proceso</h3>
                                            {renderCards('IN PROGRESS')}
                                        </ul>}

                                        {renderCards('FINISHED').length > 0 && <ul className="list w-100">
                                            <h3 className="m-1 fs-15">Finalizadas</h3>
                                            {renderCards('FINISHED')}
                                        </ul>}
                                    </>
                            }

                        </div>
                    </div>
                </section>
            </main>

        </>
    );
}

export default Tasks;