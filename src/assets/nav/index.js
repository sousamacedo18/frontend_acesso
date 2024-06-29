import 'bootstrap/dist/css/bootstrap.min.css';
import '../../pages/global.css';
import {Link} from "react-router-dom"


export default function  Nav(){
    return(
        <div className='container-nav'>
                    <nav>


                    <Link className="btn btn-success nav-button" to="/listarusuarios" >Usuário</Link>
                    <Link className="btn btn-primary nav-button"to="/laboratorio" >Responsável</Link>
                    <Link className="btn btn-danger nav-button" to="/" >Laboratório</Link>
                    <Link className="btn btn-warning nav-button" to="/laboratorio" >Acessso</Link>
                    <Link className="btn btn-info nav-button" to="/laboratorio" >Curso</Link>
      
                    </nav>
         </div>
        )

}
