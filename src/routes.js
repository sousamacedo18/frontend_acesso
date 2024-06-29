import {BrowserRouter,Route,Routes} from 'react-router-dom'



import Main from './pages/main';
import Laboratorio from './pages/laboratorio';
import Listausuarios from './pages/listaUsuarios';






    
export default function Rotas(){
    return(
       <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Main />} />
                <Route path="/laboratorio"  element={<Laboratorio />} />
                <Route path="/listarusuarios"  element={<Listausuarios />} />
            </Routes>
       
       </BrowserRouter>

    )
}