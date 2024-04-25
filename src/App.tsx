import  Atlas  from '../classes/atlas.ts'

const atlas: Atlas = new Atlas

if (Object.keys(atlas.db.membros).length == 0){
    atlas.db.criarMembro("admin", "admin", true)

    atlas.db.criarMembro("edelson", "123", true)
    atlas.db.criarMembro("brunilda", "123", true)
    atlas.db.criarMembro("angelino", "123", true)
    atlas.db.criarMembro("gladmilson", "123", true)

    //Só pro Gabriel não me chamar de puxa saco kekw
    atlas.db.criarMembro("Kurt Cobain Tabajara", "123", true)
}

if (Object.keys(atlas.db.quadras).length == 0){
    atlas.db.criarQuadra("Vôlei", ["09:00","20:00"], "Quadra Avenida")
    atlas.db.criarQuadra("Basquete", ["11:00","22:30"], "SenaQuadra")
    atlas.db.criarQuadra("Futebol", ["01:00","23:00"], "Angelus Quadra")
}

import  Home  from './paginas/Home.tsx'
import  Login from './paginas/Login.tsx'
import  Registro  from './paginas/Registro.tsx'
import  Admin  from './paginas/Admin.tsx'

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

function App() {

    return (
        <>

            <Router basename='/Quadras-Esportivas'>
                <Routes>
                    <Route path="/" element={<Home atlas={atlas}/>} />           
                    <Route path="/login" element={<Login atlas={atlas}/>} />           
                    <Route path="/registro" element={<Registro atlas={atlas}/>} />           
                    <Route path="/admin" element={<Admin atlas={atlas}/>} />           
                </Routes>

            </Router>

        </>
    )
}

export default App
