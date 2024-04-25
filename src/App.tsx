import { useEffect } from 'react'

import  Atlas  from '../classes/atlas.ts'

const atlas: Atlas = new Atlas

atlas.gerar.quadras(5)
atlas.gerar.membros(5)
atlas.gerar.reservas(1)


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
                    <Route path="/" element=<Home atlas={atlas}/> />           
                    <Route path="/login" element=<Login atlas={atlas}/> />           
                    <Route path="/registro" element=<Registro atlas={atlas}/> />           
                    <Route path="/admin" element=<Admin atlas={atlas}/> />           
                </Routes>

            </Router>

        </>
    )
}

export default App
