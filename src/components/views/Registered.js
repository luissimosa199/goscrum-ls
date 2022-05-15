import { useParams } from 'react-router-dom'

const Registered = () => {

    const { teamID } = useParams()

    return ( 
        <div>Registrado con éxito, tu teamID es {teamID}</div>
     );
}
 
export default Registered;